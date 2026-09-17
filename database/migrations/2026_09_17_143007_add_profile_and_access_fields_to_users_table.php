<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('first_name', 100)->nullable();
            $table->string('middle_name', 100)->nullable();
            $table->string('last_name', 100)->nullable();
            $table->string('contact_number', 30)->nullable();
            $table->string('username', 100)->nullable()->unique();
            $table->string('role', 50)->default('Viewer');
            $table->string('office', 150)->default('Municipal Office');
            $table->string('status', 20)->default('Active');
            $table->timestamp('access_expires_at')->nullable();
            $table->boolean('must_change_password')->default(false);
            $table->timestamp('last_login_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropUnique(['username']);
            $table->dropColumn([
                'first_name',
                'middle_name',
                'last_name',
                'contact_number',
                'username',
                'role',
                'office',
                'status',
                'access_expires_at',
                'must_change_password',
                'last_login_at',
            ]);
        });
    }
};
