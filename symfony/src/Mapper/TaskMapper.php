<?php

namespace App\Mapper;

use App\DTO\Task\TaskResponseDto;
use App\Entity\Task;

class TaskMapper
{
    /**
     * Convert Task to TaskResponseDto
     */
    public function toTaskResponseDto(Task $task): TaskResponseDto
    {
        return new TaskResponseDto(
            id: $task->getId(),
            title: $task->getTitle(),
            createdAt: $task->getCreatedAt(),
            updatedAt: $task->getUpdatedAt(),
            ord: $task->getOrd(),
        );
    }
}