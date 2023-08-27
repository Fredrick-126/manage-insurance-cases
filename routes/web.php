<?php

use App\Http\Controllers\CarMakeController;
use App\Http\Controllers\CarModelController;
use App\Http\Controllers\InsuranceCaseController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::middleware('auth')->group(function () {
    Route::get('/', [InsuranceCaseController::class, 'index'])
        ->middleware(['auth', 'verified'])
        ->name('welcome');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('insurance-cases', InsuranceCaseController::class)->names([
        'index' => 'insurance-cases'
    ]);
    Route::post('insurance-cases/search', [InsuranceCaseController::class, 'search'])->name('insurance-cases.search');

    Route::get('car-makes/search', [CarModelController::class, 'search'])->name('car-makes.search');
    Route::apiResource('car-makes', CarMakeController::class)->names([
        'index' => 'car-makes'
    ]);

    Route::apiResource('car-models', CarModelController::class)->names([
        'index' => 'car-models'
    ]);
});

require __DIR__.'/auth.php';
