<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CarMake extends Model
{
    use HasFactory;

    protected $fillable = ['name'];

    /**
     * Car models
     *
     * @return HasMany
     */
    public function carModels(): HasMany
    {
        return $this->hasMany(CarModel::class);
    }

    /**
     * Insurance Cases
     *
     * @return HasMany
     */
    public function insuranceCases(): HasMany
    {
        return $this->hasMany(InsuranceCase::class);
    }
}
