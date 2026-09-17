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
            ->where('email', 'admin@dbfos.local')
            ->update(['role' => 'System Administrator']);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::table('users')
            ->where('email', 'admin@dbfos.local')
            ->where('role', 'System Administrator')
            ->update(['role' => 'Viewer']);
    }
};
