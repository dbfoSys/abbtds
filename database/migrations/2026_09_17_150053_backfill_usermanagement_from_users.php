<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::table('users')
            ->select(['id', 'first_name', 'middle_name', 'last_name', 'contact_number', 'role', 'office', 'status', 'access_expires_at', 'created_at', 'updated_at'])
            ->orderBy('id')
            ->chunkById(100, function ($users): void {
                $rows = [];

                foreach ($users as $user) {
                    $rows[] = [
                        'user_id' => $user->id,
                        'first_name' => $user->first_name,
                        'middle_name' => $user->middle_name,
                        'last_name' => $user->last_name,
                        'contact_number' => $user->contact_number,
                        'role' => $user->role,
                        'office' => $user->office,
                        'status' => $user->status,
                        'access_expires_at' => $user->access_expires_at,
                        'created_at' => $user->created_at,
                        'updated_at' => $user->updated_at,
                    ];
                }

                DB::table('usermanagement')->insertOrIgnore($rows);
            });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // The schema migration removes the backfilled rows on rollback.
    }
};
