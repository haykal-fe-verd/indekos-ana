<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\FasilitasKamar;
use App\Models\FotoKamar;
use Illuminate\Support\Facades\File;
use App\Models\Kamar;
use App\Models\Kategori;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class KamarController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Kamar::query()->with(['kategori', 'foto_kamar', 'fasilitas_kamar'])->latest();

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($query) use ($search) {
                $query->where('nama_kamar', 'LIKE', "%$search%")
                    ->orWhere('deskripsi_kamar', 'LIKE', "%$search%")
                    ->orWhere('luas_kamar', 'LIKE', "%$search%")
                    ->orWhere('lokasi_kamar', 'LIKE', "%$search%")
                    ->orWhere('harga_kamar', 'LIKE', "%$search%")
                    ->orWhere('jenis_sewa', 'LIKE', "%$search%")
                    ->orWhereHas('kategori', function ($query) use ($search) {
                        $query->where('nama_kategori', 'LIKE', "%$search%");
                    });
            });
        }

        $kamar = $query->paginate($request->perpage ?? 10)->withQueryString();
        return Inertia::render('kamar/index', compact('kamar'));
    }

    public function show(Kamar $kamar): Response
    {
        $kamar->load(['fasilitas_kamar', 'foto_kamar', 'kategori']);
        return Inertia::render('kamar/show', compact('kamar'));
    }

    public function create(): Response
    {
        $kategori = Kategori::all();

        return Inertia::render('kamar/create', compact('kategori'));
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'kategori_id' => 'required|exists:tb_kategori,id',
            'nama_kamar' => 'required',
            'deskripsi_kamar' => 'required',
            'luas_kamar' => 'required',
            'lokasi_kamar' => 'required',
            'harga_kamar' => 'required',
            'foto_kamar' => 'required|array',
            'foto_kamar.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
            'fasilitas_kamar' => 'required|array',
            'fasilitas_kamar.*' => 'string|max:255',
        ]);

        $kamar = Kamar::create($request->all());

        if ($request->hasFile('foto_kamar')) {
            foreach ($request->file('foto_kamar') as $file) {
                $randName = rand();
                $filename = time() . '-' . $randName . '.' . $file->getClientOriginalExtension();
                $file->move(public_path('foto'), $filename);


                $kamar->foto_kamar()->create([
                    'kamar_id' => $kamar->id,
                    'foto' => $filename
                ]);
            }
        }

        if ($request->has('fasilitas_kamar')) {
            foreach ($request->fasilitas_kamar as $fasilitas) {
                $kamar->fasilitas_kamar()->create([
                    'kamar_id' => $kamar->id,
                    'nama_fasilitas' => $fasilitas
                ]);
            }
        }

        return redirect()->route('kamar.index')->with('success', "Kamar Berhasil ditambahkan");
    }

    public function edit(Kamar $kamar): Response
    {
        $kamar->load(['fasilitas_kamar', 'foto_kamar', 'kategori']);
        $kategori = Kategori::all();

        return Inertia::render('kamar/edit', compact('kamar', 'kategori'));
    }

    public function update(Request $request, Kamar $kamar): RedirectResponse
    {
        $request->validate([
            'kategori_id' => 'required|exists:tb_kategori,id',
            'nama_kamar' => 'required',
            'deskripsi_kamar' => 'required',
            'luas_kamar' => 'required',
            'lokasi_kamar' => 'required',
            'harga_kamar' => 'required',
        ]);

        $kamar->update($request->all());

        if ($request->hasFile('foto_kamar')) {
            $request->validate([
                'foto_kamar' => 'nullable|array',
                'foto_kamar.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);

            foreach ($request->file('foto_kamar') as $file) {
                $randName = rand();
                $filename = time() . '-' . $randName . '.' . $file->getClientOriginalExtension();
                $file->move(public_path('foto'), $filename);

                $kamar->foto_kamar()->create([
                    'kamar_id' => $kamar->id,
                    'foto' => $filename
                ]);
            }
        }

        if ($request->has('fasilitas_kamar')) {
            $request->validate([
                'fasilitas_kamar' => 'nullable|array',
                'fasilitas_kamar.*' => 'string|max:255',
            ]);
            foreach ($request->fasilitas_kamar as $fasilitas) {
                $kamar->fasilitas_kamar()->create([
                    'kamar_id' => $kamar->id,
                    'nama_fasilitas' => $fasilitas
                ]);
            }
        }

        return redirect()->route('kamar.index')->with('success', "Kamar Berhasil diperbarui");
    }

    public function destroy(Kamar $kamar): RedirectResponse
    {
        foreach ($kamar->foto_kamar as $foto) {
            File::delete(public_path('foto/' . basename($foto->foto)));
        }
        $kamar->delete();
        return redirect()->route('kamar.index')->with('success', "Kamar Berhasil dihapus");
    }

    // remove foto only
    public function remove_foto(string $id): RedirectResponse
    {
        $foto_kamar = FotoKamar::findOrFail($id);

        File::delete(public_path('foto/' . basename($foto_kamar->foto)));
        $foto_kamar->delete();

        return redirect()->back()->with('success', "Foto Berhasil dihapus");
    }

    // remove fasilitas only
    public function remove_fasilitas(string $id): RedirectResponse
    {
        $fasilitas_kamar = FasilitasKamar::findOrFail($id);
        $fasilitas_kamar->delete();

        return redirect()->back()->with('success', "Fasilitas Berhasil dihapus");
    }
}
