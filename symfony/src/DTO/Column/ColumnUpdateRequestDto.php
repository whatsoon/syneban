<?php

namespace App\DTO\Column;

class ColumnUpdateRequestDto
{
    /**
     * @param string|null $title New column title
     * @param int|null $ord
     */
    public function __construct(
        public readonly ?string $title,
        public readonly ?int $ord
    ) {}
}