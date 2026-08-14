<?php

use App\Http\Controllers\AuthenticatedSessionController;
use App\Http\Controllers\PsgcController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function (): void {
    Route::inertia('/', 'login')->name('login');
    Route::inertia('/home', 'login')->name('home');
    Route::post('/login', [AuthenticatedSessionController::class, 'store'])
        ->middleware('throttle:5,1')
        ->name('login.store');
});

Route::middleware('auth')->group(function (): void {
    Route::inertia('/dashboard', 'dashboard')->name('dashboard');
    Route::inertia('/municipal-information', 'municipal-information/index')->name('municipal-information.index');
    Route::inertia('/positions', 'positions/index')->name('positions.index');
    Route::inertia('/payees', 'payees/index')->name('payees.index');
    Route::inertia('/form-types', 'form-types/index')->name('form-types.index');
    Route::inertia('/banks', 'banks/index')->name('banks.index');
    Route::inertia('/payors', 'payors/index')->name('payors.index');
    Route::inertia('/nature-of-collections', 'nature-of-collections/index')->name('nature-of-collections.index');
    Route::inertia('/jev-types', 'jev-types/index')->name('jev-types.index');
    Route::inertia('/fiscal-years', 'fiscal-years/index')->name('fiscal-years.index');
    Route::inertia('/program-categories', 'program-categories/index')->name('program-categories.index');
    Route::inertia('/expense-categories', 'expense-categories/index')->name('expense-categories.index');
    Route::inertia('/funding-sources', 'funding-sources/index')->name('funding-sources.index');
    Route::inertia('/budget-classifications', 'budget-classifications/index')->name('budget-classifications.index');
    Route::inertia('/responsibility-centers', 'responsibility-centers/index')->name('responsibility-centers.index');
    Route::inertia('/approval-routes', 'approval-routes/index')->name('approval-routes.index');
    Route::inertia('/chart-of-accounts', 'chart-of-accounts/index')->name('chart-of-accounts.index');
    Route::inertia('/barangays', 'barangays/index')->name('barangays.index');
    Route::inertia('/barangays/create', 'barangays/create')->name('barangays.create');
    Route::prefix('psgc')->name('psgc.')->middleware('throttle:60,1')->group(function (): void {
        Route::get('/regions', [PsgcController::class, 'regions'])->name('regions');
        Route::get('/regions/{region}/provinces', [PsgcController::class, 'provinces'])
            ->whereNumber('region')
            ->name('provinces');
        Route::get('/regions/{region}/cities-municipalities', [PsgcController::class, 'regionCitiesMunicipalities'])
            ->whereNumber('region')
            ->name('region-cities-municipalities');
        Route::get('/provinces/{province}/cities-municipalities', [PsgcController::class, 'citiesMunicipalities'])
            ->whereNumber('province')
            ->name('cities-municipalities');
        Route::get('/cities-municipalities/{cityMunicipality}/barangays', [PsgcController::class, 'barangays'])
            ->whereNumber('cityMunicipality')
            ->name('barangays');
        Route::get('/postal-code', [PsgcController::class, 'postalCode'])->name('postal-code');
    });
    Route::inertia('/budgets', 'budgets/index')->name('budgets.index');
    Route::inertia('/budgets/create', 'budgets/create')->name('budgets.create');
    Route::inertia('/settings', 'settings/index')->name('settings.index');
    Route::inertia('/users', 'users/index')->name('users.index');
    Route::post('/users', [UserController::class, 'store'])->name('users.store');
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
});
