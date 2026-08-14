<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Models\User;
use App\Services\ResendEmailService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Validation\ValidationException;
use Throwable;

class UserController extends Controller
{
    public function store(StoreUserRequest $request, ResendEmailService $emailService): RedirectResponse
    {
        $data = $request->validated();
        $temporaryPassword = 'DBFOS1234';
        $user = User::query()->create([
            'name' => $data['username'],
            'email' => $data['email'],
            'password' => $temporaryPassword,
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
}
