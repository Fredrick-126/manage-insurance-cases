<?php

namespace App\Repositories;

abstract class Repository
{
    abstract public function model();

    /**
     * Getting data by given columns and conditions, orders.
     *
     * @param              $columns
     * @param array $where
     * @param array|string $order
     *
     * @return mixed
     */
    public function getValueByColumns($columns, array $where = [], array|string $order = ''): mixed
    {
        $query = $this->model()->select($columns);

        if (!empty($where)) {
            $query = $query->where($where);
        }

        if (!empty($order)) {
            $query = $query->orderBy($order);
        }

        return $query->get();
    }
}
