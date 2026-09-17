<?php

use App\Models\User;
use App\Models\UserManagement;

it('backfills existing users into usermanagement without creating duplicates', function () {
    $user = User::factory()->create([
        'first_name' => 'Legacy',
        'last_name' => 'Administrator',
        'contact_number' => '0917 123 4567',
        'role' => 'System Administrator',
        'office' => 'Municipal Office',
        'status' => 'Active',
        'access_expires_at' => now()->addDays(30),
    ]);

    $migration = require database_path('migrations/2026_09_17_150053_backfill_usermanagement_from_users.php');
    $migration->up();

    $profile = $user->fresh()->userManagement;

    expect($profile)->toBeInstanceOf(UserManagement::class)
        ->and($profile?->first_name)->toBe('Legacy')
        ->and($profile?->role)->toBe('System Administrator')
        ->and($profile?->access_expires_at?->toDateString())
        ->toBe(now()->addDays(30)->toDateString());

    $migration->up();

    $this->assertDatabaseCount('usermanagement', 1);
});
