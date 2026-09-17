<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Models\User;
use App\Services\ResendEmailService;
use Carbon\CarbonImmutable;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

class UserController extends Controller
{
    public function index(Request $request): Response
    {
        abort_unless($request->user()?->role === 'System Administrator', 403);

        $users = User::query()
            ->orderByDesc('id')
            ->get()
            ->map(function (User $user): array {
                $fullName = trim(implode(' ', array_filter([
                    $user->first_name,
                    $user->middle_name,
                    $user->last_name,
                ])));

                return [
                    'name' => $fullName !== '' ? $fullName : $user->name,
                    'username' => $user->username ?? $user->name,
                    'email' => $user->email,
                    'role' => $user->role,
                    'office' => $user->office,
                    'status' => $user->status,
                    'login' => $user->last_login_at?->format("M d, Y\nh:i A") ?? 'Never logged in',
                    'avatar' => '👤',
                    'createdAt' => $user->created_at?->format("M d, Y\nh:i A") ?? '',
                ];
            });

        return Inertia::render('users/index', ['users' => $users]);
    }

    public function store(StoreUserRequest $request, ResendEmailService $emailService): RedirectResponse
    {
        $data = $request->validated();
        $user = User::query()->create([
            'name' => $data['username'],
            'first_name' => $data['first_name'],
            'middle_name' => $data['middle_name'] ?? null,
            'last_name' => $data['last_name'],
            'contact_number' => $data['contact_number'] ?? null,
            'username' => $data['username'],
            'email' => $data['email'],
            'role' => $data['role'],
            'office' => $data['office'],
            'status' => $data['status'],
            'access_expires_at' => $this->accessExpiration($data['expiration']),
            'must_change_password' => true,
            'password' => $data['password'],
        ]);

        if ($request->boolean('send_credentials')) {
            try {
                $emailService->sendLoginCredentials(
                    $data['email'],
                    $data['username'],
                );
            } catch (Throwable $exception) {
                $user->delete();
                report($exception);

                throw ValidationException::withMessages([
                    'send_credentials' => 'The account was not created because the credentials email could not be sent. Check the Resend configuration and try again.',
                ]);
            }
        }

        return back()->with('success', 'User account created successfully.');
    }

    private function accessExpiration(string $expiration): ?CarbonImmutable
    {
        return match ($expiration) {
            '30 days' => now()->addDays(30),
            '90 days' => now()->addDays(90),
            '1 year' => now()->addYear(),
            default => null,
        };
    }
}
