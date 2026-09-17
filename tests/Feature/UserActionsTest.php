<?php

use App\Models\User;
use Illuminate\Support\Facades\Hash;

function editedUserPayload(array $overrides = []): array
{
    return array_merge([
        'first_name' => 'Updated',
        'middle_name' => 'Middle',
        'last_name' => 'Person',
        'contact_number' => '0917 555 1234',
        'username' => 'updated.person',
        'email' => 'updated.person@example.com',
        'office' => 'Municipal Office',
        'status' => 'Active',
        'expiration' => 'Keep current',
    ], $overrides);
}

it('includes the fields required by the view and edit actions', function () {
    $administrator = User::factory()->create();
    $target = User::factory()->create();
    $target->userManagement()->create([
        'first_name' => 'Maria',
        'middle_name' => 'Dela Cruz',
        'last_name' => 'Santos',
        'contact_number' => '0917 123 4567',
        'role' => 'System Administrator',
        'office' => 'Municipal Office',
        'status' => 'Active',
    ]);

    $this->actingAs($administrator)
        ->get(route('users.index'))
        ->assertSuccessful()
        ->assertInertia(fn ($page) => $page
            ->component('users/index')
            ->where('users.0.id', $target->id)
            ->where('users.0.firstName', 'Maria')
            ->where('users.0.middleName', 'Dela Cruz')
            ->where('users.0.contactNumber', '0917 123 4567'));
});

it('edits the account and linked usermanagement profile', function () {
    $administrator = User::factory()->create();
    $target = User::factory()->create(['role' => 'Viewer']);
    $target->userManagement()->create([
        'first_name' => 'Old',
        'last_name' => 'Name',
        'role' => 'Viewer',
        'office' => 'Municipal Office',
        'status' => 'Active',
        'access_expires_at' => now()->addDays(10),
    ]);
    $previousExpiration = $target->userManagement?->access_expires_at?->toDateTimeString();

    $this->actingAs($administrator)
        ->patch(route('users.update', $target), editedUserPayload())
        ->assertRedirect();

    $target->refresh();

    expect($target->name)->toBe('updated.person')
        ->and($target->username)->toBe('updated.person')
        ->and($target->email)->toBe('updated.person@example.com')
        ->and($target->userManagement?->first_name)->toBe('Updated')
        ->and($target->userManagement?->contact_number)->toBe('0917 555 1234')
        ->and($target->userManagement?->role)->toBe('Viewer')
        ->and($target->userManagement?->access_expires_at?->toDateTimeString())->toBe($previousExpiration);
});

it('can change or clear a user access expiration', function () {
    $administrator = User::factory()->create();
    $target = User::factory()->create();

    $this->actingAs($administrator)
        ->patch(route('users.update', $target), editedUserPayload(['expiration' => '30 days']))
        ->assertRedirect();

    expect($target->fresh()->userManagement?->access_expires_at?->toDateString())
        ->toBe(now()->addDays(30)->toDateString());

    $this->actingAs($administrator)
        ->patch(route('users.update', $target), editedUserPayload(['expiration' => 'No expiration']))
        ->assertRedirect();

    expect($target->fresh()->userManagement?->access_expires_at)->toBeNull();
});

it('rejects an account edit that duplicates another username or email', function () {
    $administrator = User::factory()->create();
    $target = User::factory()->create();
    $other = User::factory()->create();

    $this->actingAs($administrator)
        ->patch(route('users.update', $target), editedUserPayload([
            'username' => $other->name,
            'email' => $other->email,
        ]))
        ->assertSessionHasErrors(['username', 'email']);

    expect($target->fresh()->name)->not->toBe($other->name);
});

it('sets a confirmed new password without storing it in plain text', function () {
    $administrator = User::factory()->create();
    $target = User::factory()->create(['must_change_password' => false]);

    $this->actingAs($administrator)
        ->patch(route('users.password.update', $target), [
            'password' => 'A-new-secret-password-2026!',
            'password_confirmation' => 'A-new-secret-password-2026!',
        ])
        ->assertRedirect();

    $target->refresh();

    expect(Hash::check('A-new-secret-password-2026!', $target->password))->toBeTrue()
        ->and($target->password)->not->toBe('A-new-secret-password-2026!')
        ->and($target->must_change_password)->toBeTrue();
});

it('rejects an unconfirmed password', function () {
    $administrator = User::factory()->create();
    $target = User::factory()->create();
    $originalPassword = $target->password;

    $this->actingAs($administrator)
        ->patch(route('users.password.update', $target), [
            'password' => 'A-new-secret-password-2026!',
            'password_confirmation' => 'Different-secret-password!',
        ])
        ->assertSessionHasErrors('password');

    expect($target->fresh()->password)->toBe($originalPassword);
});

it('deactivates and reactivates a managed account', function () {
    $administrator = User::factory()->create();
    $target = User::factory()->create();

    $this->actingAs($administrator)
        ->patch(route('users.status.update', $target), ['status' => 'Inactive'])
        ->assertRedirect();

    expect($target->fresh()->userManagement?->status)->toBe('Inactive')
        ->and($target->fresh()->hasActiveAccess())->toBeFalse();

    $this->actingAs($administrator)
        ->patch(route('users.status.update', $target), ['status' => 'Active'])
        ->assertRedirect();

    expect($target->fresh()->userManagement?->status)->toBe('Active')
        ->and($target->fresh()->hasActiveAccess())->toBeTrue();
});

it('does not let an administrator deactivate their own account', function () {
    $administrator = User::factory()->create();

    $this->actingAs($administrator)
        ->patch(route('users.status.update', $administrator), ['status' => 'Inactive'])
        ->assertSessionHasErrors('status');

    $this->actingAs($administrator)
        ->patch(route('users.update', $administrator), editedUserPayload(['status' => 'Inactive']))
        ->assertSessionHasErrors('status');

    expect($administrator->fresh()->hasActiveAccess())->toBeTrue();
});

it('forbids non-administrators from account actions', function () {
    $viewer = User::factory()->create(['role' => 'Viewer']);
    $target = User::factory()->create();

    $this->actingAs($viewer)
        ->patch(route('users.update', $target), editedUserPayload())
        ->assertForbidden();

    $this->actingAs($viewer)
        ->patch(route('users.password.update', $target), [
            'password' => 'A-new-secret-password-2026!',
            'password_confirmation' => 'A-new-secret-password-2026!',
        ])
        ->assertForbidden();

    $this->actingAs($viewer)
        ->patch(route('users.status.update', $target), ['status' => 'Inactive'])
        ->assertForbidden();
});
