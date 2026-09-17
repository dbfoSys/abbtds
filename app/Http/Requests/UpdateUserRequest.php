<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->effectiveRole() === 'System Administrator';
    }

    /** @return array<string, array<int, mixed>> */
    public function rules(): array
    {
        $user = $this->route('user');

        abort_unless($user instanceof User, 404);

        return [
            'first_name' => ['required', 'string', 'max:100'],
            'last_name' => ['required', 'string', 'max:100'],
            'middle_name' => ['nullable', 'string', 'max:100'],
            'contact_number' => ['nullable', 'string', 'max:30'],
            'username' => [
                'required',
                'string',
                'max:100',
                Rule::unique(User::class, 'username')->ignore($user),
                Rule::unique(User::class, 'name')->ignore($user),
            ],
            'email' => ['required', 'email', 'max:255', Rule::unique(User::class, 'email')->ignore($user)],
            'office' => ['required', Rule::in(['Municipal Office', 'Barangay Poblacion', 'Barangay Tagoloan', 'Barangay Luneta'])],
            'status' => ['required', Rule::in(['Active', 'Pending', 'Inactive', 'Locked'])],
            'expiration' => ['required', Rule::in(['Keep current', 'No expiration', '30 days', '90 days', '1 year'])],
        ];
    }
}
