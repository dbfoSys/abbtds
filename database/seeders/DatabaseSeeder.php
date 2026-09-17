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

        User::query()->firstOrCreate(['email' => $email], [
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
    }
}
