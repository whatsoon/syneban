<?php

namespace App\DTO\Column;

class ColumnSwapRequestDto
{
    public function __construct(
        public readonly string $direction
    )
    {
    }
}