<?php

namespace Database\Seeders;

use App\Models\Kategori;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class KategoriSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Kategori::create([
            'nama_kategori' => 'Pria'
        ]);
        Kategori::create([
            'nama_kategori' => 'Wanita'
        ]);
        Kategori::create([
            'nama_kategori' => 'Keluarga'
        ]);
        Kategori::create([
            'nama_kategori' => 'VIP'
        ]);
        Kategori::create([
            'nama_kategori' => 'Exclusive'
        ]);
    }
}
