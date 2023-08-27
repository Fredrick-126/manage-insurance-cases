<?php

namespace Database\Seeders;

use App\Models\CarMake;
use App\Models\CarModel;
use Illuminate\Database\Seeder;

class CarModelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $models = [
            'BMW'      => ['3 Series', '5 Series', '7 Series'],
            'Mercedes' => ['C Class', 'E Class', 'S Class'],
            'Jeep'     => ['Wrangler', 'Grand Cherokee']
        ];

        foreach ($models as $key => $model) {
            $carMake = CarMake::query()->where('name', $key)->first();
            if ($carMake) {
                foreach ($model as $m) {
                    CarModel::query()->create([
                        'car_make_id' => $carMake->id,
                        'model_name'  => $m
                    ]);
                }
            }
        }
    }
}
