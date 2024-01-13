<?php

namespace App\DTO\Task;

class TaskCreateRequestDto
{
    /**
     * @param string $title Task title
     * @param int $columnId Column id this task belong to
     */
    public function __construct(
        public readonly string $title,
        public readonly int $columnId
    ) {}
}