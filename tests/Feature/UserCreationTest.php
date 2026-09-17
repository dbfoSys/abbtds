<?php

use App\Models\User;
use Illuminate\Http\Client\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;

function newUserPayload(array $overrides = []): array
{
    return array_merge([
        'first_name' => 'Maria',
        'middle_name' => 'Dela Cruz',
        'last_name' => 'Santos',
        'contact_number' => '0917 123 4567',
        'username' => 'maria.santos',
        'email' => 'maria.santos@example.com',
        'password' => 'DBFOS1234',
        'role' => 'System Administrator',
        'office' => 'Municipal Office',
        'status' => 'Active',
        'expiration' => 'No expiration',
    ], $overrides);
}

it('stores the new user details on the users table', function () {
    $administrator = User::factory()->create();

    $this->actingAs($administrator)
        ->post(route('users.store'), newUserPayload())
        ->assertRedirect();

    $user = User::query()->where('name', 'maria.santos')->firstOrFail();

    expect($user->first_name)->toBe('Maria')
        ->and($user->middle_name)->toBe('Dela Cruz')
        ->and($user->last_name)->toBe('Santos')
        ->and($user->contact_number)->toBe('0917 123 4567')
        ->and($user->username)->toBe('maria.santos')
        ->and($user->role)->toBe('System Administrator')
        ->and($user->office)->toBe('Municipal Office')
        ->and($user->status)->toBe('Active')
        ->and($user->access_expires_at)->toBeNull()
        ->and($user->must_change_password)->toBeTrue()
        ->and(Hash::check('DBFOS1234', $user->password))->toBeTrue();
});

it('shows saved accounts on the user management page', function () {
    $administrator = User::factory()->create();

    $this->actingAs($administrator)
        ->post(route('users.store'), newUserPayload())
        ->assertRedirect();

    $this->actingAs($administrator)
        ->get(route('users.index'))
        ->assertSuccessful()
        ->assertInertia(fn ($page) => $page
            ->component('users/index')
            ->has('users', 2)
            ->where('users.0.username', 'maria.santos')
            ->where('users.0.role', 'System Administrator'));
});

it('prevents non-administrators from creating accounts', function () {
    $viewer = User::factory()->create(['role' => 'Viewer']);

    $this->actingAs($viewer)
        ->post(route('users.store'), newUserPayload())
        ->assertForbidden();

    $this->assertDatabaseMissing('users', ['username' => 'maria.santos']);
    $this->actingAs($viewer)->get(route('users.index'))->assertForbidden();
});

it('stores the selected access expiration', function () {
    $administrator = User::factory()->create();

    $this->actingAs($administrator)
        ->post(route('users.store'), newUserPayload(['expiration' => '30 days']))
        ->assertRedirect();

    $user = User::query()->where('username', 'maria.santos')->firstOrFail();

    expect($user->access_expires_at?->toDateString())
        ->toBe(now()->addDays(30)->toDateString());
});

it('rejects a username that is already used by a legacy account', function () {
    $administrator = User::factory()->create();
    User::factory()->create(['name' => 'maria.santos']);

    $this->actingAs($administrator)
        ->post(route('users.store'), newUserPayload())
        ->assertSessionHasErrors('username');
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
