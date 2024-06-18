<?php

use App\Http\Controllers\Web\AuthController;
use App\Http\Controllers\Web\DashboardController;
use App\Http\Controllers\Web\HomeController;
use App\Http\Controllers\Web\KamarController;
use App\Http\Controllers\Web\KategoriController;
use App\Http\Controllers\Web\PembayaranController;
use App\Http\Controllers\Web\ProfileController;
use App\Http\Controllers\Web\TransaksiController;
use App\Http\Controllers\Web\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::post('/midtrans/callback', [PembayaranController::class, 'handleMidtransCallback']);

Route::middleware('guest')->group(function () {
    // home
    Route::get('/', [HomeController::class, 'index'])->name('home');

    // about
    Route::get('/about', [HomeController::class, 'about'])->name('about');

    // daftar kamar
    Route::get('/daftar-kamar', [HomeController::class, 'daftarKamar'])->name('daftar.kamar');

    // detail kamar
    Route::get('/detail-kamar/{id}', [HomeController::class, 'detailKamar'])->name('detail.kamar');

    // login
    Route::get('login', [AuthController::class, 'index'])->name('login');
    Route::post('login', [AuthController::class, 'store']);

    // register
    Route::get('register', [AuthController::class, 'register_index'])->name('register');
    Route::post('register', [AuthController::class, 'register_store']);

    // forgot password
    Route::get('forgot-password', [AuthController::class, 'forgot_password_index'])->name('password.request');
    Route::post('forgot-password', [AuthController::class, 'forgot_password_store'])->name('password.email');

    // reset password
    Route::get('reset-password/{token}', [AuthController::class, 'reset_password_index'])->name('password.reset');
    Route::post('reset-password', [AuthController::class, 'reset_password_store'])->name('password.store');
});


Route::middleware('auth')->group(function () {
    // logout
    Route::post('logout', [AuthController::class, 'destroy'])->name('logout');

    // profil
    Route::get('/profile', [ProfileController::class, 'index'])->name('profile.edit');
    Route::post('/profile', [ProfileController::class, 'update'])->name('profile.update');

    // confirm password
    Route::get('confirm-password', [AuthController::class, 'confirm_password_index'])->name('password.confirm');
    Route::post('confirm-password', [AuthController::class, 'confirm_password_store']);

    // update password
    Route::get('password', [AuthController::class, 'update_password_index'])->name('password.index');
    Route::put('password', [AuthController::class, 'update_password_update'])->name('password.update');


    // verify email
    Route::get('verify-email', [AuthController::class, 'verify_email_index'])->name('verification.notice');
    Route::post('email/verification-notification', [AuthController::class, 'verify_email_store'])
        ->middleware('throttle:6,1')
        ->name('verification.send');
    Route::get('verify-email/{id}/{hash}', [AuthController::class, 'verify_email_update'])
        ->middleware(['signed', 'throttle:6,1'])
        ->name('verification.verify');
});

//! verified email
Route::middleware(['auth', 'verified'])->group(function () {
    // dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // user
    Route::get('user', [UserController::class, 'index'])->name('user.index');
    Route::post('user', [UserController::class, 'store'])->name('user.store');
    Route::put('user/{user}', [UserController::class, 'update'])->name('user.update');
    Route::delete('user/{user}', [UserController::class, 'destroy'])->name('user.destroy');

    // kategori
    Route::get('kategori', [KategoriController::class, 'index'])->name('kategori.index');
    Route::post('kategori', [KategoriController::class, 'store'])->name('kategori.store');
    Route::put('kategori/{kategori}', [KategoriController::class, 'update'])->name('kategori.update');
    Route::delete('kategori/{kategori}', [KategoriController::class, 'destroy'])->name('kategori.destroy');

    // kamar
    Route::get('kamar', [KamarController::class, 'index'])->name('kamar.index');
    Route::get('kamar/create', [KamarController::class, 'create'])->name('kamar.create');
    Route::post('kamar', [KamarController::class, 'store'])->name('kamar.store');
    Route::get('kamar/{kamar}/show', [KamarController::class, 'show'])->name('kamar.show');
    Route::get('kamar/{kamar}/edit', [KamarController::class, 'edit'])->name('kamar.edit');
    Route::post('kamar/{kamar}', [KamarController::class, 'update'])->name('kamar.update');
    Route::delete('kamar/{kamar}', [KamarController::class, 'destroy'])->name('kamar.destroy');

    // remove foto and fasilitas
    Route::delete('foto/{id}', [KamarController::class, 'remove_foto'])->name('kamar.remove_foto');
    Route::delete('fasilitas/{id}', [KamarController::class, 'remove_fasilitas'])->name('kamar.remove_fasilitas');

    // pembayaran
    Route::get('/payment/{id}', [PembayaranController::class, 'index'])->name('payment.index');
    Route::post('/payment', [PembayaranController::class, 'store'])->name('payment.store');
    Route::post('/update-via', [PembayaranController::class, 'updateVia'])->name('payment.via');

    // transaksi
    Route::get('/kamar-saya', [TransaksiController::class, 'kamarSaya'])->name('kamar.saya.index');
    Route::get('/transaksi-saya', [TransaksiController::class, 'transaksiSaya'])->name('transaksi.index');
    Route::get('/transaksi', [TransaksiController::class, 'admin_index'])->name('admin.index');
});
