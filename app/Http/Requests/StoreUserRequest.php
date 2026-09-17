<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->role === 'System Administrator';
    }

    /** @return array<string, array<int, mixed>> */
    public function rules(): array
    {
        return [
            'first_name' => ['required', 'string', 'max:100'],
            'last_name' => ['required', 'string', 'max:100'],
            'middle_name' => ['nullable', 'string', 'max:100'],
            'contact_number' => ['nullable', 'string', 'max:30'],
            'username' => [
                'required',
                'string',
                'max:100',
                Rule::unique(User::class, 'username'),
                Rule::unique(User::class, 'name'),
            ],
            'email' => ['required', 'email', 'max:255', Rule::unique(User::class, 'email')],
            'password' => ['required', 'string', 'min:8', 'max:255'],
            'role' => ['required', Rule::in(['System Administrator', 'Punong Barangay', 'Barangay Treasurer', 'Barangay Secretary', 'Sangguniang Barangay', 'Staff', 'Viewer'])],
            'office' => ['required', Rule::in(['Municipal Office', 'Barangay Poblacion', 'Barangay Tagoloan', 'Barangay Luneta'])],
            'status' => ['required', Rule::in(['Active', 'Pending', 'Inactive'])],
            'expiration' => ['required', Rule::in(['No expiration', '30 days', '90 days', '1 year'])],
            'send_credentials' => ['sometimes', 'boolean'],
        ];
    }
}
