<?php

namespace App\DTO\Task;

class TaskSwapRequestDto
{
    public function __construct(
        public readonly string $direction
    )
    {
    }
}