<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('insurance_cases', function (Blueprint $table) {
            $table->id();
            $table->string('case')->index()->nullable();
            $table->foreignId('user_id')->unsigned()->index()->comment('User ID')
                ->constrained('users')->onDelete('cascade')->onUpdate('cascade');
            $table->foreignId('car_make_id')->unsigned()->index()->nullable()->comment('Make ID')
                ->constrained('car_makes')->onDelete('cascade')->onUpdate('cascade');
            $table->foreignId('car_model_id')->unsigned()->index()->nullable()->comment('Car Model ID')
                ->constrained('car_models')->onDelete('cascade')->onUpdate('cascade');
            $table->integer('mileage')->default(0)->nullable();
            $table->dateTime('bought_at');
            $table->enum('color', ['White', 'Silver', 'Black', 'Other'])->nullable();
            $table->enum('drivetrain', ['2x4', '4x4'])->nullable();
            $table->enum('status', ['draft', 'completed', 'deleted'])->index();
            $table->string('picture_name')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('insurance_cases');
    }
};
