<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Kamar;
use App\Models\Kategori;
use App\Models\Pembayaran;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;


class DashboardController extends Controller
{
    public function index(Request $request): Response
    {
        if ($request->user()->role === 'admin') {
            $totalKamar = Kamar::count();
            $totalKategori = Kategori::count();
            $totalPenyewa = User::where('role', 'penyewa')->count();
            $totalTransaksi = Pembayaran::count();

            return Inertia::render('dashboard/admin', compact('totalKamar', 'totalKategori', 'totalPenyewa', 'totalTransaksi'));
        } else {
            $query = Kamar::with(['fasilitas_kamar', 'foto_kamar', 'kategori'])->latest();

            if ($request->has('search')) {
                $search = $request->search;
                $query->where(function ($query) use ($search) {
                    $query->where('nama_kamar', 'LIKE', "%$search%")
                        ->orWhere('deskripsi_kamar', 'LIKE', "%$search%")
                        ->orWhere('luas_kamar', 'LIKE', "%$search%")
                        ->orWhere('lokasi_kamar', 'LIKE', "%$search%")
                        ->orWhere('harga_kamar', 'LIKE', "%$search%");
                });
            }

            $kamar = $query->paginate($request->perpage ?? 16)->withQueryString();

            return Inertia::render('dashboard/penyewa', compact('kamar'));
        }
    }
}
