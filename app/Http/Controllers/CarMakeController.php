<?php

namespace App\Http\Controllers;

use App\Models\CarMake;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CarMakeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('CarMakeList', [
            'data' => $this->getList()
        ]);
    }

    public function search(): JsonResponse
    {
        return response()->json([
            'data' => $this->getList()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'name' => "required|string|max:200|unique:car_makes,name",
        ]);

        $carMake = new CarMake();
        $carMake->fill($request->all());
        $carMake->save();

        return response()->json([
            'status' => 'success',
            'data'   => $this->getList()
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(CarMake $carMake)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, CarMake $carMake): JsonResponse
    {
        $request->validate([
            'name' => "required|string|max:200|unique:car_makes,name,$carMake->id",
        ]);

        $carMake->fill($request->all());
        $carMake->save();

        return response()->json([
            'status' => 'success',
            'data'   => $this->getList()
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CarMake $carMake): JsonResponse
    {
        $carMake->insuranceCases()->delete();
        $carMake->carModels()->delete();
        $carMake->delete();

        return response()->json([
            'status' => 'success',
            'data'   => $this->getList()
        ]);
    }

    private function getList(): Collection
    {
        return CarMake::all();
    }
}
