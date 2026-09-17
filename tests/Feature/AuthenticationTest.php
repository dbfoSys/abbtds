<?php

use App\Models\User;

it('renders the login page', function () {
    $this->get(route('login'))
        ->assertSuccessful()
        ->assertInertia(fn ($page) => $page->component('login'));
});

it('authenticates a user with their username', function () {
    $user = User::factory()->create([
        'name' => 'admin',
        'password' => 'DBFOS2026!',
    ]);

    $this->post(route('login.store'), [
        'username' => 'admin',
        'password' => 'DBFOS2026!',
    ])->assertRedirect(route('dashboard'));

    $this->assertAuthenticatedAs($user);
    expect($user->fresh()->last_login_at)->not->toBeNull();
});

it('rejects login for an inactive account', function () {
    User::factory()->create([
        'name' => 'inactive-user',
        'password' => 'DBFOS2026!',
        'status' => 'Inactive',
    ]);

    $this->post(route('login.store'), [
        'username' => 'inactive-user',
        'password' => 'DBFOS2026!',
    ])->assertSessionHasErrors('username');

    $this->assertGuest();
});

it('rejects login for an expired account', function () {
    User::factory()->create([
        'name' => 'expired-user',
        'password' => 'DBFOS2026!',
        'access_expires_at' => now()->subDay(),
    ]);

    $this->post(route('login.store'), [
        'username' => 'expired-user',
        'password' => 'DBFOS2026!',
    ])->assertSessionHasErrors('username');

    $this->assertGuest();
});

it('ends an expired authenticated session', function () {
    $user = User::factory()->create(['access_expires_at' => now()->subDay()]);

    $this->actingAs($user)->get(route('dashboard'))
        ->assertRedirect(route('login'));

    $this->assertGuest();
});

it('rejects invalid credentials', function () {
    User::factory()->create(['name' => 'admin']);

    $this->from(route('login'))->post(route('login.store'), [
        'username' => 'admin',
        'password' => 'wrong-password',
    ])->assertRedirect(route('login'))->assertSessionHasErrors('username');

    $this->assertGuest();
});

it('requires authentication for the dashboard', function () {
    $this->get(route('dashboard'))->assertRedirect(route('login'));
});

it('logs an authenticated user out', function () {
    $user = User::factory()->create();

    $this->actingAs($user)->post(route('logout'))->assertRedirect(route('login'));

    $this->assertGuest();
});
