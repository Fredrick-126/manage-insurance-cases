<?php

namespace Database\Factories;

use App\Models\CarMake;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<CarMake>
 */
class CarMakeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name()
        ];
    }
}
