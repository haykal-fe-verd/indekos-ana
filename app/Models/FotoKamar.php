<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FotoKamar extends Model
{
    use HasFactory;

    protected $table = "tb_foto_kamar";
    protected $primaryKey = 'id';
    protected $guarded = ['id'];

    // relasi dengan kamar
    public function kamar(): BelongsTo
    {
        return $this->belongsTo(Kamar::class, 'kamar_id', 'id');
    }
}
