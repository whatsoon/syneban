<?php

namespace App\DTO\Column;

class ColumnCreateRequestDto
{
    /**
     * @param string $title Column title
     * @param int $boardId Board ID this column belong to
     */
    public function __construct(
        public readonly string $title,
        public readonly int $boardId
    ) {}
}