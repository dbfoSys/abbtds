<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property string $name
 * @property string|null $first_name
 * @property string|null $middle_name
 * @property string|null $last_name
 * @property string|null $contact_number
 * @property string|null $username
 * @property string $email
 * @property string $role
 * @property string $office
 * @property string $status
 * @property Carbon|null $email_verified_at
 * @property Carbon|null $access_expires_at
 * @property bool $must_change_password
 * @property Carbon|null $last_login_at
 * @property string $password
 * @property string|null $remember_token
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable([
    'name',
    'first_name',
    'middle_name',
    'last_name',
    'contact_number',
    'username',
    'email',
    'role',
    'office',
    'status',
    'access_expires_at',
    'must_change_password',
    'last_login_at',
    'password',
])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    /** @var array<string, mixed> */
    protected $attributes = [
        'role' => 'Viewer',
        'office' => 'Municipal Office',
        'status' => 'Active',
        'must_change_password' => false,
    ];

    public function hasActiveAccess(): bool
    {
        return $this->status === 'Active'
            && ($this->access_expires_at === null || $this->access_expires_at->isFuture());
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'access_expires_at' => 'datetime',
            'must_change_password' => 'boolean',
            'last_login_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}
