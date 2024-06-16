<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Pembayaran;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TransaksiController extends Controller
{

    public function kamarSaya(Request $request): Response
    {
        $query = Pembayaran::with(['user', 'kamar', 'kamar.foto_kamar', 'kamar.fasilitas_kamar', 'kamar.kategori'])
            ->where('user_id', $request->user()->id)
            ->where('status', '2')
            ->latest();

        $kamarSaya = $query->paginate($request->perpage ?? 10)->withQueryString();

        return Inertia::render('transaksi/index', compact('kamarSaya'));
    }

    public function transaksiSaya(Request $request): Response
    {
        $query = Pembayaran::with(['user', 'kamar.kategori'])->where('user_id', $request->user()->id)->latest();

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($query) use ($search) {
                $query->where('invoice', 'LIKE', "%$search%")
                    ->orWhere('updated_at', 'LIKE', "%$search%")
                    ->orWhereHas('kamar', function ($query) use ($search) {
                        $query->where('nama_kamar', 'LIKE', "%$search%")
                            ->orWhere('harga_kamar', 'LIKE', "%$search%")
                            ->orWhere('lokasi_kamar', 'LIKE', "%$search%")
                            ->orWhereHas('kategori', function ($query) use ($search) {
                                $query->where('nama_kategori', 'LIKE', "%$search%");
                            });
                    });
            });
        }

        $transaksi = $query->paginate($request->perpage ?? 10)->withQueryString();

        return Inertia::render('transaksi/transaksi-saya', compact('transaksi'));
    }

    public function admin_index(Request $request)
    {
        $query = Pembayaran::with(['user', 'kamar.kategori'])->latest();

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($query) use ($search) {
                $query->where('invoice', 'LIKE', "%$search%")
                    ->orWhere('updated_at', 'LIKE', "%$search%")
                    ->orWhereHas('kamar', function ($query) use ($search) {
                        $query->where('nama_kamar', 'LIKE', "%$search%")
                            ->orWhere('harga_kamar', 'LIKE', "%$search%")
                            ->orWhere('jenis_sewa', 'LIKE', "%$search%")
                            ->orWhere('lokasi_kamar', 'LIKE', "%$search%")
                            ->orWhereHas('kategori', function ($query) use ($search) {
                                $query->where('nama_kategori', 'LIKE', "%$search%");
                            });
                    });
            });
        }

        $transaksi = $query->paginate($request->perpage ?? 10)->withQueryString();

        return Inertia::render('transaksi/admin', compact('transaksi'));
    }
}
