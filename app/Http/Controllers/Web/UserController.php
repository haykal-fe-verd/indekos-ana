<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\File;
use Illuminate\Validation\Rule;
use Inertia\Response;
use Inertia\Inertia;


class UserController extends Controller
{
    public function index(Request $request): Response
    {
        $query = User::query()->orderBy('role', 'asc')->latest();

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('nama', 'like', '%' . $search . '%')
                    ->orWhere('email', 'like', '%' . $search . '%')
                    ->orWhere('role', 'like', '%' . $search . '%')
                    ->orWhere('umur', 'like', '%' . $search . '%')
                    ->orWhere('alamat', 'like', '%' . $search . '%')
                    ->orWhere('no_hp', 'like', '%' . $search . '%');
            });
        }

        $user = $query->paginate($request->perpage ?? 10)->withQueryString();

        return Inertia::render('user/index', compact('user'));
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'nama' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:tb_user,email'],
            'tanggal_lahir' => ['required', 'date'],
            'umur' => ['required', 'integer'],
            'no_hp' => ['required', 'string', 'max:20'],
            'alamat' => ['required', 'string', 'max:255'],
            'jenis_kelamin' => ['required', Rule::in(['pria', 'wanita'])],
            'role' => ['required', Rule::in(['admin', 'penyewa'])],
            'password' => ['required', 'string', 'min:8'],
        ]);

        $request->merge(['email_verified_at' => now()]);
        User::create($request->all());

        return redirect()->route('user.index')->with('success', 'User berhasil ditambahkan');
    }

    public function update(Request $request, User $user): RedirectResponse
    {
        $request->validate([
            'nama' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', Rule::unique('tb_user', 'email')->ignore($user->id)],
            'tanggal_lahir' => ['required', 'date'],
            'umur' => ['required', 'integer'],
            'no_hp' => ['required', 'string', 'max:20'],
            'alamat' => ['required', 'string', 'max:255'],
            'jenis_kelamin' => ['required', Rule::in(['pria', 'wanita'])],
            'role' => ['required', Rule::in(['admin', 'penyewa'])],
        ]);

        $user->update($request->all());

        return redirect()->route('user.index')->with('success', 'User berhasil diperbarui');
    }

    public function destroy(User $user): RedirectResponse
    {
        if ($user->photo) {
            File::delete(public_path('avatars/' . basename($user->photo)));
        }
        $user->delete();
        return redirect()->route('user.index')->with('success', 'User berhasil dihapus');
    }
}
