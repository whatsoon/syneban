<?php

namespace App\DTO\Column;

use App\DTO\Task\TaskResponseDto;
use DateTime;
use DateTimeImmutable;

class ColumnResponseDto
{
    /**
     * @param int $id Column ID
     * @param string $title Column title
     * @param DateTimeImmutable $createdAt
     * @param DateTime|null $updatedAt
     * @param int $ord Order
     * @param TaskResponseDto[] $tasks Task list of this column
     */
    public function __construct(
        public readonly int $id,
        public readonly string $title,
        public readonly DateTimeImmutable $createdAt,
        public readonly ?DateTime $updatedAt,
        public int $ord,
        /** @var TaskResponseDto[] $users */
        public readonly array $tasks,
    ) {}
}