<?php

use App\Models\User;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

it('returns the Parañaque ZIP code using its PSGC code without geocoding', function () {
    Http::preventStrayRequests();
    Cache::put('postal-codes:geonames:ph:v2', [
        [
            'zip_code' => '1700',
            'city' => 'Parañaque',
            'province' => 'Metropolitan Manila',
            'psgc_codes' => ['137604000'],
        ],
    ], now()->addMonth());

    $response = $this
        ->actingAs(User::factory()->create())
        ->getJson('/psgc/postal-code?city=City%20of%20Para%C3%B1aque&psgc_code=137604000');

    $response
        ->assertSuccessful()
        ->assertExactJson(['zip_code' => '1700']);

    Http::assertNothingSent();
});
