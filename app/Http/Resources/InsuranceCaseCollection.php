<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class InsuranceCaseCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'list' => $this->collection->map(fn($el) => [
                'id'           => $el->id,
                'bought_at'    => date('Y-m-d', strtotime($el->bought_at)),
                'case'         => $el->case,
                'color'        => $el->color,
                'drivetrain'   => $el->drivetrain,
                'status'       => $el->status,
                'picture_url'  => $el->picture_name ?
                    asset('storage/' . config('services.site.picture_folder') . "/" . auth()->user()->id . '/' . $el->picture_name) :
                    null,
                'picture_name' => $el->picture_name,
                'user_id'      => $el->user_id,
                'mileage'      => number_format($el->mileage),
                'created_at'   => $el->created_at,
                'make_id'      => $el->car_make_id,
                'model_id'     => $el->car_model_id,
                'car_make'     => $el->carMake ?? null,
                'car_model'    => $el->carModel ?? null,
            ])
        ];
    }
}
