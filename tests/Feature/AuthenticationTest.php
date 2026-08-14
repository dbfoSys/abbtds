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
