<?php

namespace App\Contracts;

use App\Models\InsuranceCase;
use Illuminate\Http\Request;

interface IInsuranceCase
{
    /**
     * Get all insurance cases data
     * @param $request
     * @param $user_id
     * @return mixed
     */
    public function all($request = null, $user_id = null): mixed;

    /**
     * Get insurance cases data list
     *
     * @param Request $request
     * @param $user_id
     * @return mixed
     */
    public function list(Request $request, $user_id): mixed;

    /**
     * Get insurance case data
     * @param InsuranceCase $insuranceCase
     * @return mixed
     */
    public function find(InsuranceCase $insuranceCase): InsuranceCase;

    /**
     * Save insurance case data
     * @param $data
     * @param InsuranceCase $insuranceCase
     * @return mixed
     */
    public function save($data, InsuranceCase $insuranceCase): InsuranceCase;

    /**
     * Cars list
     *
     * @return mixed
     */
    public function carsList(): mixed;
}
