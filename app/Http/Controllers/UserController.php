<?php

namespace App\Http\Controllers;

use App\Http\Requests\ChangeUserStatusRequest;
use App\Http\Requests\ResetUserPasswordRequest;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use App\Models\UserManagement;
use App\Services\ResendEmailService;
use Carbon\CarbonImmutable;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

class UserController extends Controller
{
    public function index(Request $request): Response
    {
        abort_unless($request->user()?->effectiveRole() === 'System Administrator', 403);

        $users = User::query()
            ->with('userManagement')
            ->orderByDesc('id')
            ->get()
            ->map(function (User $user): array {
                $profile = $user->userManagement;
                $fullName = trim(implode(' ', array_filter([
                    $profile->first_name ?? $user->first_name,
                    $profile->middle_name ?? $user->middle_name,
                    $profile->last_name ?? $user->last_name,
                ])));
                $expiresAt = $profile === null ? $user->access_expires_at : $profile->access_expires_at;

                return [
                    'id' => $user->id,
                    'name' => $fullName !== '' ? $fullName : $user->name,
                    'firstName' => $profile->first_name ?? $user->first_name ?? '',
                    'middleName' => $profile->middle_name ?? $user->middle_name ?? '',
                    'lastName' => $profile->last_name ?? $user->last_name ?? '',
                    'contactNumber' => $profile->contact_number ?? $user->contact_number ?? '',
                    'username' => $user->username ?? $user->name,
                    'email' => $user->email,
                    'role' => $profile->role ?? $user->role,
                    'office' => $profile->office ?? $user->office,
                    'status' => $profile->status ?? $user->status,
                    'accessExpiresAt' => $expiresAt?->format('M d, Y h:i A'),
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
        $user = DB::transaction(function () use ($data): User {
            $user = User::query()->create([
                'name' => $data['username'],
                'username' => $data['username'],
                'email' => $data['email'],
                'must_change_password' => true,
                'password' => $data['password'],
            ]);

            $user->userManagement()->create([
                'first_name' => $data['first_name'],
                'middle_name' => $data['middle_name'] ?? null,
                'last_name' => $data['last_name'],
                'contact_number' => $data['contact_number'] ?? null,
                'role' => $data['role'],
                'office' => $data['office'],
                'status' => $data['status'],
                'access_expires_at' => $this->accessExpiration($data['expiration']),
            ]);

            return $user;
        });

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

    public function update(UpdateUserRequest $request, User $user): RedirectResponse
    {
        $data = $request->validated();

        if ($user->is($request->user()) && $data['status'] !== 'Active') {
            throw ValidationException::withMessages([
                'status' => 'You cannot deactivate your own account.',
            ]);
        }

        DB::transaction(function () use ($user, $data): void {
            $management = $this->managementFor($user);

            $user->update([
                'name' => $data['username'],
                'username' => $data['username'],
                'email' => $data['email'],
            ]);

            $attributes = [
                'first_name' => $data['first_name'],
                'middle_name' => $data['middle_name'] ?? null,
                'last_name' => $data['last_name'],
                'contact_number' => $data['contact_number'] ?? null,
                'office' => $data['office'],
                'status' => $data['status'],
            ];

            if ($data['expiration'] !== 'Keep current') {
                $attributes['access_expires_at'] = $this->accessExpiration($data['expiration']);
            }

            $management->update($attributes);
        });

        return back()->with('success', 'User details updated successfully.');
    }

    public function resetPassword(ResetUserPasswordRequest $request, User $user): RedirectResponse
    {
        $user->update([
            'password' => $request->validated('password'),
            'must_change_password' => true,
        ]);

        return back()->with('success', 'User password updated successfully.');
    }

    public function changeStatus(ChangeUserStatusRequest $request, User $user): RedirectResponse
    {
        $status = $request->validated('status');

        if ($user->is($request->user()) && $status !== 'Active') {
            throw ValidationException::withMessages([
                'status' => 'You cannot deactivate your own account.',
            ]);
        }

        $this->managementFor($user)->update(['status' => $status]);

        return back()->with('success', 'User account status updated successfully.');
    }

    private function managementFor(User $user): UserManagement
    {
        return $user->userManagement()->firstOrCreate([], [
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
