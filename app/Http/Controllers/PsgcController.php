<?php

namespace App\Http\Controllers;

use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\Client\RequestException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use ZipArchive;

class PsgcController extends Controller
{
    public function regions(): JsonResponse
    {
        return $this->get('regions');
    }

    public function provinces(string $region): JsonResponse
    {
        return $this->get("regions/{$region}/provinces");
    }

    public function regionCitiesMunicipalities(string $region): JsonResponse
    {
        return $this->get("regions/{$region}/cities-municipalities");
    }

    public function citiesMunicipalities(string $province): JsonResponse
    {
        return $this->get("provinces/{$province}/cities-municipalities");
    }

    public function barangays(string $cityMunicipality): JsonResponse
    {
        return $this->get("cities-municipalities/{$cityMunicipality}/barangays");
    }

    public function postalCode(Request $request): JsonResponse
    {
        $location = $request->validate([
            'city' => ['required', 'string', 'max:120'],
            'province' => ['nullable', 'string', 'max:120'],
            'psgc_code' => ['nullable', 'digits_between:9,10'],
        ]);

        $location['city'] = $this->normalizeCityName($location['city']);

        try {
            $postalCode = $this->geonamesPostalCode(
                $location['city'],
                $location['province'] ?? null,
                $location['psgc_code'] ?? null,
            );

            if (is_string($postalCode) && $postalCode !== '') {
                return response()->json(['zip_code' => $postalCode]);
            }

            $result = Cache::remember(
                'postal-code:v3:'.hash('sha256', serialize($location)),
                now()->addMonth(),
                fn (): array => Http::baseUrl('https://nominatim.openstreetmap.org')
                    ->acceptJson()
                    ->withUserAgent(config('app.name').' ('.config('app.url').')')
                    ->connectTimeout(3)
                    ->timeout(8)
                    ->retry([250, 500], throw: false)
                    ->get('/search', [
                        'city' => $location['city'],
                        'country' => 'Philippines',
                        'format' => 'jsonv2',
                        'addressdetails' => 1,
                        'limit' => 10,
                    ])
                    ->throw()
                    ->json(),
            );

            $province = mb_strtolower($location['province'] ?? '');
            $placesWithPostalCodes = collect($result)->filter(
                fn (array $place): bool => is_string(data_get($place, 'address.postcode'))
                    && data_get($place, 'address.postcode') !== '',
            );
            $provinceMatch = $province === '' ? null : $placesWithPostalCodes->first(
                fn (array $place): bool => str_contains(
                    mb_strtolower((string) ($place['display_name'] ?? '')),
                    $province,
                ),
            );
            $postalCode = data_get($provinceMatch ?? $placesWithPostalCodes->first(), 'address.postcode');

            if ((! is_string($postalCode) || $postalCode === '') && isset($result[0]['lat'], $result[0]['lon'])) {
                $coordinates = [$result[0]['lat'], $result[0]['lon']];
                $reverseResult = Cache::remember(
                    'postal-code:reverse:v1:'.hash('sha256', serialize($coordinates)),
                    now()->addMonth(),
                    function () use ($coordinates): array {
                        usleep(1_000_000);

                        return Http::baseUrl('https://nominatim.openstreetmap.org')
                            ->acceptJson()
                            ->withUserAgent(config('app.name').' ('.config('app.url').')')
                            ->connectTimeout(3)
                            ->timeout(8)
                            ->retry([250, 500], throw: false)
                            ->get('/reverse', [
                                'lat' => $coordinates[0],
                                'lon' => $coordinates[1],
                                'format' => 'jsonv2',
                                'addressdetails' => 1,
                                'zoom' => 14,
                            ])
                            ->throw()
                            ->json();
                    },
                );
                $postalCode = data_get($reverseResult, 'address.postcode');
            }

            if (! is_string($postalCode) || $postalCode === '') {
                return response()->json([
                    'message' => 'No ZIP code was found for the selected city or municipality.',
                ], 404);
            }

            return response()->json(['zip_code' => $postalCode]);
        } catch (ConnectionException|RequestException $exception) {
            report($exception);

            return response()->json([
                'message' => 'The postal-code service is temporarily unavailable.',
            ], 503);
        }
    }

    private function geonamesPostalCode(string $city, ?string $province, ?string $psgcCode): ?string
    {
        $places = Cache::remember('postal-codes:geonames:ph:v2', now()->addMonth(), function (): array {
            $response = Http::connectTimeout(3)
                ->timeout(10)
                ->retry([250, 500], throw: false)
                ->get('https://download.geonames.org/export/zip/PH.zip')
                ->throw();
            $temporaryFile = tempnam(sys_get_temp_dir(), 'ph-postal-');

            if ($temporaryFile === false) {
                return [];
            }

            try {
                file_put_contents($temporaryFile, $response->body());
                $archive = new ZipArchive;

                if ($archive->open($temporaryFile) !== true) {
                    return [];
                }

                $contents = $archive->getFromName('PH.txt');
                $archive->close();

                if (! is_string($contents)) {
                    return [];
                }

                $lines = preg_split('/\R/', trim($contents));

                if ($lines === false) {
                    return [];
                }

                return collect($lines)
                    ->map(function (string $line): ?array {
                        $columns = explode("\t", $line);

                        if (count($columns) < 6) {
                            return null;
                        }

                        return [
                            'zip_code' => $columns[1],
                            'city' => $this->normalizeCityName($columns[2]),
                            'province' => preg_replace('/^Province of\s+/i', '', $columns[5]),
                            'psgc_codes' => array_values(array_filter([
                                $columns[6] ?? null,
                                $columns[8] ?? null,
                            ])),
                        ];
                    })
                    ->filter()
                    ->values()
                    ->all();
            } finally {
                @unlink($temporaryFile);
            }
        });

        $normalizedCity = mb_strtolower($this->normalizeCityName($city));
        $normalizedProvince = mb_strtolower((string) $province);
        $provincePlaces = collect($places)->filter(
            fn (array $place): bool => $normalizedProvince === ''
                || str_contains(mb_strtolower((string) $place['province']), $normalizedProvince)
                || str_contains($normalizedProvince, mb_strtolower((string) $place['province'])),
        );
        $codeMatch = $psgcCode === null ? null : $provincePlaces->first(
            fn (array $place): bool => in_array($psgcCode, $place['psgc_codes'], true),
        );

        if ($codeMatch) {
            return data_get($codeMatch, 'zip_code');
        }

        $cityMatches = $provincePlaces->filter(
            fn (array $place): bool => mb_strtolower($place['city']) === $normalizedCity,
        );

        if ($cityMatches->isEmpty()) {
            $cityMatches = $provincePlaces->filter(
                fn (array $place): bool => levenshtein(
                    mb_strtolower($place['city']),
                    $normalizedCity,
                ) <= 2,
            );
        }

        $provinceMatch = $normalizedProvince === '' ? null : $cityMatches->first(
            fn (array $place): bool => str_contains(
                mb_strtolower((string) $place['province']),
                $normalizedProvince,
            ) || str_contains(
                $normalizedProvince,
                mb_strtolower((string) $place['province']),
            ),
        );

        return data_get($provinceMatch ?? $cityMatches->first(), 'zip_code');
    }

    private function normalizeCityName(string $city): string
    {
        $city = preg_replace('/\s*\([^)]*\)\s*/', ' ', $city) ?? $city;
        $city = preg_replace('/\bGen\.\s+/i', 'General ', $city) ?? $city;
        $normalizedCity = preg_replace('/^(?:.+\s)?City of\s+/i', '', $city);
        $normalizedCity = preg_replace('/^Santa\s+/i', 'Sta. ', $normalizedCity ?? $city);
        $normalizedCity = preg_replace('/^Santo\s+/i', 'Sto. ', $normalizedCity ?? $city);
        $normalizedCity = preg_replace('/\s+City$/i', '', $normalizedCity ?? $city);

        return trim($normalizedCity ?: $city);
    }

    private function get(string $path): JsonResponse
    {
        try {
            $items = Cache::remember("psgc:{$path}", now()->addDay(), function () use ($path): array {
                return Http::baseUrl('https://psgc.gitlab.io/api')
                    ->acceptJson()
                    ->connectTimeout(3)
                    ->timeout(8)
                    ->retry([100, 300], throw: false)
                    ->get("/{$path}/")
                    ->throw()
                    ->json();
            });

            return response()->json($items);
        } catch (ConnectionException|RequestException $exception) {
            report($exception);

            return response()->json([
                'message' => 'The PSGC service is temporarily unavailable.',
            ], 503);
        }
    }
}
