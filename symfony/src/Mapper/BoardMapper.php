<?php

namespace App\Mapper;

use App\DTO\Auth\UserResponseDto;
use App\DTO\Board\BoardResponseDto;
use App\DTO\Board\BoardShortResponseDto;
use App\DTO\Column\ColumnResponseDto;
use App\Entity\Board;

class BoardMapper
{
    public function __construct(
        private readonly ColumnMapper $columnMapper
    )
    {
    }

    /**
     * Convert board to BoardResponseDto
     */
    public function toBoardResponseDto(Board $board): BoardResponseDto
    {
        $columns = $board->getColumns()->map(
            fn($column) => $this->columnMapper->toColumnResponseDto($column)
        )->toArray();
        usort($columns, function ($c1, $c2) {
            /**
             * @var ColumnResponseDto $c1
             * @var ColumnResponseDto $c2
             */
            return $c2->ord <=> $c1->ord;
        });
        return new BoardResponseDto(
            id: $board->getId(),
            title: $board->getTitle(),
            users: $board->getUsers()->map(fn($user) => new UserResponseDto(
                email: $user->getEmail()
            ))->toArray(),
            createdAt: $board->getCreatedAt(),
            updatedAt: $board->getUpdatedAt(),
            columns: $columns
        );
    }

    /**
     * Convert board to BoardShortResponseDto
     */
    public function toBoardShortResponseDto(Board $board): BoardShortResponseDto
    {
        return new BoardShortResponseDto(
            id: $board->getId(),
            title: $board->getTitle(),
            createdAt: $board->getCreatedAt(),
            updatedAt: $board->getUpdatedAt()
        );
    }
}