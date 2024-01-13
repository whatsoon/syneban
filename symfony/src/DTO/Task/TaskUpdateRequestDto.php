<?php

namespace App\DTO\Task;

class TaskUpdateRequestDto
{
    /**
     * @param string|null $title Task title
     * @param int|null $columnId
     */
    public function __construct(
        public readonly ?string $title,
        public readonly ?int $columnId,
    ) {}
}