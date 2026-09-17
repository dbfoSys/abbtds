<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $email = config('auth.bootstrap_admin.email');
        $password = config('auth.bootstrap_admin.password');

        if (! is_string($email) || ! filter_var($email, FILTER_VALIDATE_EMAIL)
            || ! is_string($password) || strlen($password) < 12) {
            $this->command->warn('Administrator not seeded. Set DBFOS_ADMIN_EMAIL and a DBFOS_ADMIN_PASSWORD of at least 12 characters.');

            return;
        }

        $user = User::query()->firstOrCreate(['email' => $email], [
            'name' => 'admin',
            'username' => 'admin',
            'first_name' => 'System',
            'last_name' => 'Administrator',
            'role' => 'System Administrator',
            'office' => 'Municipal Office',
            'status' => 'Active',
            'must_change_password' => false,
            'password' => Hash::make($password),
        ]);

        $user->userManagement()->firstOrCreate([], [
            'first_name' => $user->first_name,
            'middle_name' => $user->middle_name,
            'last_name' => $user->last_name,
            'contact_number' => $user->contact_number,
            'role' => $user->role,
            'office' => $user->office,
            'status' => $user->status,
            'access_expires_at' => $user->access_expires_at,
        ]);
    }
}
