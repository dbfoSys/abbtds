<?php

use App\Models\User;
use Illuminate\Support\Facades\Hash;

it('does not create an administrator without explicit bootstrap credentials', function () {
    config()->set('auth.bootstrap_admin.email', null);
    config()->set('auth.bootstrap_admin.password', null);

    $this->seed();

    $this->assertDatabaseCount('users', 0);
});

it('creates the administrator with supplied credentials without resetting its password', function () {
    config()->set('auth.bootstrap_admin.email', 'admin@example.com');
    config()->set('auth.bootstrap_admin.password', 'A-secure-password-2026!');

    $this->seed();

    $admin = User::query()->where('email', 'admin@example.com')->firstOrFail();

    expect($admin->role)->toBe('System Administrator')
        ->and($admin->username)->toBe('admin')
        ->and($admin->userManagement?->role)->toBe('System Administrator')
        ->and(Hash::check('A-secure-password-2026!', $admin->password))->toBeTrue();

    config()->set('auth.bootstrap_admin.password', 'A-different-password-2026!');
    $this->seed();

    $this->assertDatabaseCount('users', 1);
    expect(Hash::check('A-secure-password-2026!', $admin->fresh()->password))->toBeTrue();
});
