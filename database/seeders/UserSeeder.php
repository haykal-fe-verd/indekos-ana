<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //! admin
        User::factory()->create([
            'nama' => "Akun Admin",
            'email' => 'admin@admin.com',
            'role' => 'admin',
        ]);

        //! penyewa
        User::factory()->create([
            'nama' => "Akun Penyewa",
            'email' => 'penyewa@penyewa.com',
            'role' => 'penyewa',
        ]);

        // User::factory(10)->create();
    }
}
