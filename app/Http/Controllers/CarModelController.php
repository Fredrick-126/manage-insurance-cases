<?php

namespace App\Http\Controllers;

use App\Models\CarMake;
use App\Models\CarModel;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CarModelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('CarModelList', [
            'data'  => $this->getList(),
            'makes' => CarMake::all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'car_make_id' => "required",
            'model_name'  => "required|string|max:200",
        ]);

        $carModel = new CarModel();
        $carModel->fill($request->all());
        $carModel->save();

        return response()->json([
            'status' => 'success',
            'data'   => $this->getList()
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(CarModel $carModel)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, CarModel $carModel): JsonResponse
    {
        $request->validate([
            'car_make_id' => "required",
            'model_name'  => "required|string|max:200",
        ]);

        $carModel->fill($request->all());
        $carModel->save();

        return response()->json([
            'status' => 'success',
            'data'   => $this->getList()
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CarModel $carModel): JsonResponse
    {
        $carModel->insuranceCases()->delete();
        $carModel->delete();

        return response()->json([
            'status' => 'success',
            'data'   => $this->getList()
        ]);
    }

    public function getList(): Collection
    {
        return CarModel::query()->with(['carMake'])
            ->orderBy('car_make_id')
            ->orderBy('model_name')
            ->get();
    }
}
