<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class InsuranceCase extends Model
{
    use HasFactory;

    protected $fillable = [
        'case', 'car_make_id', 'car_model_id', 'mileage', 'bought_at', 'color', 'drivetrain', 'picture_name'
    ];

    /**
     * Car make relationship
     *
     * @return BelongsTo
     */
    public function carMake(): BelongsTo
    {
        return $this->belongsTo(CarMake::class);
    }

    /**
     * Car model relationship
     *
     * @return BelongsTo
     */
    public function carModel(): BelongsTo
    {
        return $this->belongsTo(CarModel::class);
    }
}
