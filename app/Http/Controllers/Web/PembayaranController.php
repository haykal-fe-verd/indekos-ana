<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Kamar;
use App\Models\Pembayaran;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Str;

class PembayaranController extends Controller
{
    public function index(string $id): Response
    {
        $kamar = Kamar::with(['fasilitas_kamar', 'foto_kamar', 'kategori'])->findOrFail($id);

        return Inertia::render('pembayaran/detail-kamar', compact('kamar'));
    }

    public function store(Request $request): RedirectResponse
    {
        $invoice = 'INV-' . Str::slug($request->user()->nama) . '-' . now()->format('YmdHis');

        $pembayaran = new Pembayaran();
        $pembayaran->user_id = $request->user()->id;
        $pembayaran->kamar_id = $request->kamar_id;
        $pembayaran->invoice = $invoice;
        $pembayaran->jenis_sewa = $request->jenis_sewa;
        $pembayaran->tgl_bayar = date('Y-m-d');
        $pembayaran->tgl_kadaluarsa = $request->tgl_kadaluarsa;
        $pembayaran->total_harga = $request->total_harga;

        \Midtrans\Config::$serverKey = config('midtrans.server_key');
        \Midtrans\Config::$isProduction = config('midtrans.is_production');
        \Midtrans\Config::$isSanitized = config('midtrans.is_sanitized');
        \Midtrans\Config::$is3ds = config('midtrans.is_3ds');

        $params = [
            'transaction_details' => [
                'order_id' => $invoice,
                'gross_amount' => (int)$pembayaran->total_harga,
            ],
            'customer_details' => [
                'first_name' => $request->user()->nama,
                'email' => $request->user()->email,
                'phone' => $request->user()->no_hp,
            ]
        ];

        $snapToken = \Midtrans\Snap::getSnapToken($params);

        $pembayaran->snap_token = $snapToken;
        $pembayaran->save();

        return redirect()->route('payment.index', $pembayaran->kamar_id,)->with('success', 'Invoice berhasil dibuat')->with('snapToken', $pembayaran->snap_token);
    }

    public function updateVia(Request $request)
    {
        $pembayaran = Pembayaran::where('invoice', $request->invoice)->first();
        $pembayaran->via = $request->via;
        if ($request->transaction_time) {
            $pembayaran->tgl_bayar = Carbon::parse($request->transaction_time)->toDateString();
        }
        if ($request->transaction_status) {
            $statusMapping = [
                'pending' => '1',
                'settlement' => '2',
                'expire' => '3',
                'cancel' => '4',
                'deny' => '4',
            ];

            $pembayaran->status = $statusMapping[$request->transaction_status] ?? '1';
        }
        $pembayaran->save();

        return;
    }

    public function handleMidtransCallback(Request $request)
    {
        if ($request->has('order_id') && $request->has('status_code') && $request->has('transaction_status')) {
            $pembayaran = Pembayaran::where('invoice', $request->order_id)->firstOrFail();


            if ($request->transaction_status == 'settlement') {
                $pembayaran->status = '2';
            } else if ($request->transaction_status == 'pending') {
                $pembayaran->status = '1';
            } else if ($request->transaction_status == 'deny') {
                $pembayaran->status = '4';
            } else if ($request->transaction_status == 'expire') {
                $pembayaran->status = '3';
            } else if ($request->transaction_status == 'cancel') {
                $pembayaran->status = '4';
            }

            $pembayaran->save();
        }

        return redirect()->route('transaksi.index', with('success', 'Invoice Berhasil diupdate'));
    }
}
