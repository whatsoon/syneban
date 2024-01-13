<?php

namespace App\DTO\Board;

class BoardUpdateRequestDto
{
    /**
     * @param string|null $title Board new title
     */
    public function __construct(
        public readonly ?string $title
    ) {}
}