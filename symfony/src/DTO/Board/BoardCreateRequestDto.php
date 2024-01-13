<?php

namespace App\DTO\Board;

class BoardCreateRequestDto
{
    /**
     * @param string $title Board title
     */
    public function __construct(
        public readonly string $title
    ) {}
}