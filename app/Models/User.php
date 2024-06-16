<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasFactory, Notifiable;

    protected $table = 'tb_user';
    protected $primaryKey = 'id';
    protected $dates = ['tanggal_lahir'];
    protected $fillable = [
        "nama",
        "tanggal_lahir",
        "umur",
        "no_hp",
        "alamat",
        "email",
        "password",
        "role",
        "jenis_kelamin",
        'photo',
        'email_verified_at'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    // relasi dengan pembayaran
    public function pembayaran(): HasMany
    {
        return $this->hasMany(Pembayaran::class, 'user_id', 'id');
    }
}
