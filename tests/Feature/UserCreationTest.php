<?php

use App\Models\User;
use Illuminate\Http\Client\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;

function newUserPayload(array $overrides = []): array
{
    return array_merge([
        'first_name' => 'Maria',
        'last_name' => 'Santos',
        'username' => 'maria.santos',
        'email' => 'maria.santos@example.com',
        'password' => 'DBFOS1234',
        'role' => 'Barangay Treasurer',
        'office' => 'Barangay Poblacion',
        'status' => 'Active',
        'expiration' => 'No expiration',
    ], $overrides);
}

it('creates a user with the fixed temporary password', function () {
    $administrator = User::factory()->create();

    $this->actingAs($administrator)
        ->post(route('users.store'), newUserPayload())
        ->assertRedirect();

    $user = User::query()->where('name', 'maria.santos')->firstOrFail();

    expect(Hash::check('DBFOS1234', $user->password))->toBeTrue();
});

it('sends login credentials through resend when requested', function () {
    config()->set('services.resend.key', 're_test_key');
    config()->set('services.resend.from', 'DBFOS <noreply@example.com>');
    config()->set('services.resend.user_account_template', 'UserAccount');
    Http::preventStrayRequests();
    Http::fake(['api.resend.com/*' => Http::response(['id' => 'email-id'])]);

    $this->actingAs(User::factory()->create())
        ->post(route('users.store'), newUserPayload(['send_credentials' => '1']))
        ->assertRedirect();

    Http::assertSent(fn (Request $request) => $request->url() === 'https://api.resend.com/emails'
        && $request['to'] === ['maria.santos@example.com']
        && $request['template'] === [
            'id' => 'UserAccount',
            'variables' => ['useraccount' => 'maria.santos'],
        ]
        && ! isset($request['html']));
});

it('does not create the user when credential delivery fails', function () {
    config()->set('services.resend.key', null);

    $this->actingAs(User::factory()->create())
        ->post(route('users.store'), newUserPayload(['send_credentials' => true]))
        ->assertSessionHasErrors('send_credentials');

    $this->assertDatabaseMissing('users', ['name' => 'maria.santos']);
});
