<?php

namespace App\DTO\Column;

class ColumnShortResponseDto
{
    /**
     * @param int $id Column ID
     * @param string $title Column title
     */
    public function __construct(
        public readonly int $id,
        public readonly string $title,
    ) {}
}