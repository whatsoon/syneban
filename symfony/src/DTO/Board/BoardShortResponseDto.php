<?php

namespace App\DTO\Board;

use DateTime;
use DateTimeImmutable;

class BoardShortResponseDto
{
    /**
     * @param int $id Board ID
     * @param string $title Board title
     */
    public function __construct(
        public readonly int $id,
        public readonly string $title,
        public readonly DateTimeImmutable $createdAt,
        public readonly ?DateTime $updatedAt,
    ) {}
}