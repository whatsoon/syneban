<?php

namespace App\DTO\Task;

use DateTime;
use DateTimeImmutable;

class TaskResponseDto
{
    /**
     * @param int $id Task ID
     * @param string $title Task title
     * @param DateTimeImmutable $createdAt
     * @param DateTime|null $updatedAt
     * @param int $ord Order
     */
    public function __construct(
        public readonly int $id,
        public readonly string $title,
        public readonly DateTimeImmutable $createdAt,
        public readonly ?DateTime $updatedAt,
        public int $ord,
    ) {}
}