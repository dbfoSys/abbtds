<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use RuntimeException;

class ResendEmailService
{
    public function sendLoginCredentials(string $recipient, string $username): void
    {
        $apiKey = config('services.resend.key');
        $from = config('services.resend.from');
        $template = config('services.resend.user_account_template');

        if (! is_string($apiKey) || $apiKey === '' || ! is_string($from) || $from === '' || ! is_string($template) || $template === '') {
            throw new RuntimeException('Credential email delivery is not configured.');
        }

        Http::baseUrl('https://api.resend.com')
            ->withToken($apiKey)
            ->withUserAgent('DBFOS/1.0')
            ->acceptJson()
            ->timeout(5)
            ->connectTimeout(2)
            ->post('/emails', [
                'from' => $from,
                'to' => [$recipient],
                'template' => [
                    'id' => $template,
                    'variables' => [
                        'useraccount' => $username,
                    ],
                ],
            ])
            ->throw();
    }
}
