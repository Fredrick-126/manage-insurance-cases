<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('car_models', function (Blueprint $table) {
            $table->id();
            $table->foreignId('car_make_id')
                ->unsigned()
                ->index()
                ->comment('Make ID')
                ->constrained('car_makes')
                ->onDelete('cascade')
                ->onUpdate('cascade');
            $table->string('model_name')
                ->index()
                ->comment('car model name');
            $table->timestamps();
        });

        Artisan::call('db:seed', ['--class' => 'CarModelSeeder']);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('car_models');
    }
};
