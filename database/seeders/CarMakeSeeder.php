<?php

namespace Database\Seeders;

use App\Models\CarMake;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CarMakeSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $makes = ['BMW', 'Mercedes', 'Jeep'];
        foreach ($makes as $make) {
            CarMake::factory()->create([
                'name' => $make
            ]);
        }
    }
}
