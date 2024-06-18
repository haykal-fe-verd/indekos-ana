<?php

namespace App\Http\Controllers\Web;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\ProfileUpdateRequest;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render('profile/index', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $validatedData = $request->validated();
        $tanggalLahir = Carbon::parse($validatedData['tanggal_lahir']);
        $umur = $tanggalLahir->age;
        $validatedData['umur'] = $umur;
        $user = $request->user();
        $user->fill($validatedData);

        if ($request->hasFile('photo')) {
            // validate photo
            $request->validate([
                'photo' => ['image', 'mimes:jpeg,png,jpg,gif', 'max:2048'],
            ]);

            // delete old photo
            if ($request->user()->photo) {
                File::delete(public_path('avatars/' . basename($request->user()->photo)));
            }

            // upload new photo
            $file = $request->file('photo');
            $filename = time() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('avatars'), $filename);
            $request->user()->photo = $filename;
        }

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $user->save();

        return Redirect::route('profile.edit')->with('success', 'Profil berhasil diubah');
    }
}
