<?php

namespace App\Repositories;

use App\Contracts\IInsuranceCase;
use App\Models\CarMake;
use App\Models\InsuranceCase;

class InsuranceCaseRepository extends Repository implements IInsuranceCase
{
    public function model()
    {
        return app(InsuranceCase::class);
    }

    public function makesModel()
    {
        return app(CarMake::class);
    }

    /**
     * Get all data
     *
     * @param $request
     * @param $user_id
     * @return mixed
     */
    public function all($request = null, $user_id = null): mixed
    {
        $query = $this->model()
            ->with(['carMake', 'carModel']);

        if (!empty($user_id)) {
            $query->where('user_id', $user_id);
        }

        if ($request && $request->has('filter')) {
            $search = $request->input('filter');
            $caseSearch = strtolower($search);
            $query->whereRaw('LOWER(case)', 'like', "%$caseSearch%")
                ->orWhere('mileage', $search)
                ->orWhere('color', $search)
                ->orWhereHas('carMake', function ($q) use ($caseSearch) {
                    $q->where('name', 'like', "%$caseSearch%");
                })
                ->orWhereHas('carModel', function ($q) use ($caseSearch) {
                    $q->where('model_name', 'like', "%$caseSearch%");
                });
        }

        return $query
            ->orderBy('created_at', 'desc')
            ->get();
    }

    /**
     * Get insurance cases data
     *
     * @param $request
     * @param null $user_id
     * @return mixed
     */
    public function list($request, $user_id = null): mixed
    {
        return $this->all($request, $user_id);
    }

    /**
     * Find insurance case data
     *
     * @param $el
     * @return InsuranceCase
     */
    public function find($el): InsuranceCase
    {
        $el->car_make = $el->carMake()->first();
        $el->car_model = $el->carModel()->first();
        $el->picture_url = asset('storage/' . config('services.site.picture_folder') . "/" . auth()->user()->id . '/' . $el->picture_name);

        return $el;
    }

    /**
     * Save insurance case data
     *
     * @param $data
     * @param $insuranceCase
     * @return InsuranceCase
     */
    public function save($data, $insuranceCase): InsuranceCase
    {
        $insuranceCase->fill($data);

        $insuranceCase->user_id = auth()->user()->id;

        $insuranceCase->save();

        return $this->find($insuranceCase);
    }

    /**
     * Get cars list
     *
     * @return mixed
     */
    public function carsList(): mixed
    {
        return $this->makesModel()
            ->with(['carModels' => function ($q) {
                $q->orderBy('car_make_id')
                    ->orderBy('model_name');
            }])
            ->orderBy('id')
            ->get();
    }
}
