<?php

namespace App\DTO\Board;

use App\DTO\Auth\UserResponseDto;
use App\DTO\Column\ColumnResponseDto;
use DateTime;
use DateTimeImmutable;

class BoardResponseDto
{
    /**
     * @param int $id Board ID
     * @param string $title Board title
     * @param UserResponseDto[] $users that have access to this board
     * @param DateTimeImmutable $createdAt
     * @param DateTime|null $updatedAt
     * @param ColumnResponseDto[] $columns Board columns
     */
    public function __construct(
        public readonly int $id,
        public readonly string $title,
        /** @var UserResponseDto[] $users */
        public readonly array $users,
        public readonly DateTimeImmutable $createdAt,
        public readonly ?DateTime $updatedAt,
        /** @var ColumnResponseDto[] $users */
        public readonly array $columns,
    ) {}
}