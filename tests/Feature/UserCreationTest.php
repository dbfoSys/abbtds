<?php

use App\Models\User;
use App\Models\UserManagement;
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

it('stores the account in users and its details in usermanagement', function () {
    $administrator = User::factory()->create();

    $this->actingAs($administrator)
        ->post(route('users.store'), newUserPayload())
        ->assertRedirect();

    $user = User::query()->where('name', 'maria.santos')->firstOrFail();
    $profile = $user->userManagement;

    expect($profile)->toBeInstanceOf(UserManagement::class)
        ->and($profile?->user_id)->toBe($user->id)
        ->and($profile?->first_name)->toBe('Maria')
        ->and($profile?->middle_name)->toBe('Dela Cruz')
        ->and($profile?->last_name)->toBe('Santos')
        ->and($profile?->contact_number)->toBe('0917 123 4567')
        ->and($profile?->role)->toBe('System Administrator')
        ->and($profile?->office)->toBe('Municipal Office')
        ->and($profile?->status)->toBe('Active')
        ->and($profile?->access_expires_at)->toBeNull()
        ->and($user->username)->toBe('maria.santos')
        ->and($user->email)->toBe('maria.santos@example.com')
        ->and($user->must_change_password)->toBeTrue()
        ->and(Hash::check('DBFOS1234', $user->password))->toBeTrue();

    $this->actingAs($user)->get(route('users.index'))->assertSuccessful();
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
    $this->assertDatabaseCount('usermanagement', 0);
    $this->actingAs($viewer)->get(route('users.index'))->assertForbidden();
});

it('only permits the System Administrator role in this form', function () {
    $administrator = User::factory()->create();

    $this->actingAs($administrator)
        ->post(route('users.store'), newUserPayload(['role' => 'Viewer']))
        ->assertSessionHasErrors('role');

    $this->assertDatabaseMissing('users', ['username' => 'maria.santos']);
});

it('stores the selected access expiration', function () {
    $administrator = User::factory()->create();

    $this->actingAs($administrator)
        ->post(route('users.store'), newUserPayload(['expiration' => '30 days']))
        ->assertRedirect();

    $user = User::query()->where('username', 'maria.santos')->firstOrFail();

    expect($user->userManagement?->access_expires_at?->toDateString())
        ->toBe(now()->addDays(30)->toDateString());
});

it('removes the linked usermanagement record when the user is deleted', function () {
    $administrator = User::factory()->create();

    $this->actingAs($administrator)
        ->post(route('users.store'), newUserPayload())
        ->assertRedirect();

    $user = User::query()->where('username', 'maria.santos')->firstOrFail();
    $profile = $user->userManagement;

    $user->delete();

    $this->assertDatabaseMissing('usermanagement', ['id' => $profile?->id]);
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
    $this->assertDatabaseCount('usermanagement', 0);
});
