<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int $user_id
 * @property string|null $first_name
 * @property string|null $middle_name
 * @property string|null $last_name
 * @property string|null $contact_number
 * @property string $role
 * @property string $office
 * @property string $status
 * @property Carbon|null $access_expires_at
 * @property-read User $user
 */
#[Fillable([
    'first_name',
    'middle_name',
    'last_name',
    'contact_number',
    'role',
    'office',
    'status',
    'access_expires_at',
])]
class UserManagement extends Model
{
    protected $table = 'usermanagement';

    /** @var array<string, mixed> */
    protected $attributes = [
        'role' => 'Viewer',
        'office' => 'Municipal Office',
        'status' => 'Active',
    ];

    /** @return BelongsTo<User, $this> */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /** @return array<string, string> */
    protected function casts(): array
    {
        return ['access_expires_at' => 'datetime'];
    }
}
