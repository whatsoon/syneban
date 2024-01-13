<?php

namespace App\Mapper;

use App\DTO\Column\ColumnResponseDto;
use App\DTO\Column\ColumnShortResponseDto;
use App\DTO\Task\TaskResponseDto;
use App\Entity\Column;

class ColumnMapper
{
    public function __construct(
        private readonly TaskMapper $taskMapper
    )
    {
    }

    /**
     * Convert column to ColumnResponseDto
     */
    public function toColumnResponseDto(Column $column): ColumnResponseDto
    {
        $tasks = $column->getTasks()->map(
            fn($t) => $this->taskMapper->toTaskResponseDto($t)
        )->toArray();
        usort($tasks, function ($t1, $t2) {
            /**
             * @var TaskResponseDto $t1
             * @var TaskResponseDto $t2
             */
            return $t2->ord <=> $t1->ord;
        });
        return new ColumnResponseDto(
            id: $column->getId(),
            title: $column->getTitle(),
            createdAt: $column->getCreatedAt(),
            updatedAt: $column->getUpdatedAt(),
            ord: $column->getOrd(),
            tasks: $tasks
        );
    }

    /**
     * Convert column to ColumnShortResponseDto
     */
    public function toColumnShortResponseDto(Column $column): ColumnShortResponseDto
    {
        return new ColumnShortResponseDto(
            id: $column->getId(),
            title: $column->getTitle(),
        );
    }
}