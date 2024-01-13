<?php

namespace App\Service;

use App\DTO\Column\ColumnCreateRequestDto;
use App\DTO\Column\ColumnShortResponseDto;
use App\DTO\Column\ColumnSwapRequestDto;
use App\DTO\Column\ColumnUpdateRequestDto;
use App\Entity\Column;
use App\Mapper\ColumnMapper;
use App\Repository\ColumnRepository;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\NonUniqueResultException;
use Symfony\Component\CssSelector\Exception\InternalErrorException;
use Symfony\Component\HttpFoundation\Exception\BadRequestException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Security\Core\User\UserInterface;

class ColumnService
{
    public function __construct(
        private readonly BoardService           $boardService,
        private readonly EntityManagerInterface $entityManager,
        private readonly ColumnRepository       $columnRepository,
        private readonly ColumnMapper           $mapper
    )
    {
    }

    /**
     * Create column from request data.
     * @throws NotFoundHttpException if board not found or access denied
     * @throws NonUniqueResultException
     */
    public function createFromRequest(ColumnCreateRequestDto $dto, UserInterface $user): ColumnShortResponseDto
    {
        $board = $this->boardService->getBoardOrThrow($dto->boardId, $user);
        $ord = $this->columnRepository->getLastOrdForBoard($dto->boardId);
        $column = new Column();
        $column->setBoard($board);
        $column->setTitle($dto->title);
        $column->setOrd($ord + 1);
        $this->entityManager->persist($column);
        $this->entityManager->flush();
        return $this->mapper->toColumnShortResponseDto($column);
    }

    /**
     * Update column by id with data from request.
     * @throws NotFoundHttpException if column not found or access denied
     */
    public function updateFromRequest(int $id, ColumnUpdateRequestDto $dto, UserInterface $user): ColumnShortResponseDto
    {
        $column = $this->getColumnOrThrow($id, $user);
        if (isset($dto->title)) {
            $column->setTitle($dto->title);
        }
        if (isset($dto->ord)) {
            $column->setOrd($dto->ord);
        }
        $this->setUpdatedNow($column);
        $this->entityManager->flush();
        return $this->mapper->toColumnShortResponseDto($column);
    }

    /**
     * @param int $id
     * @param ColumnSwapRequestDto $dto
     * @param UserInterface $user
     * @return void
     * @throws NotFoundHttpException
     * @throws BadRequestException
     */
    public function swap(int $id, ColumnSwapRequestDto $dto, UserInterface $user): void
    {
        $this->getColumnOrThrow($id, $user);
        if ($dto->direction === 'left') {
            $columns = $this->columnRepository->findByIdWithPrevious($id);
            if (is_null($columns)) return;
            $temp = $columns[0]->getOrd();
            $columns[0]->setOrd($columns[1]->getOrd());
            $columns[1]->setOrd($temp);
            $this->entityManager->flush();
            return;
        }
        if ($dto->direction === 'right') {
            $columns = $this->columnRepository->findByIdWithNext($id);
            if (is_null($columns)) return;
            $temp = $columns[0]->getOrd();
            $columns[0]->setOrd($columns[1]->getOrd());
            $columns[1]->setOrd($temp);
            $this->entityManager->flush();
            return;
        }
        throw new BadRequestException();
    }

    /**
     * Delete column by id with data from request.
     * @throws NotFoundHttpException if column not found or access denied
     */
    public function delete(int $id, UserInterface $user): void
    {
        $column = $this->getColumnOrThrow($id, $user);
        $this->boardService->setUpdatedNow($column->getBoard());
        $this->entityManager->remove($column);
        $this->entityManager->flush();
    }

    /**
     * Try to get column by id.
     * @throws NotFoundHttpException if column not found or access denied
     */
    public function getColumnOrThrow(int $id, UserInterface $user): Column
    {
        $column = $this->columnRepository->findById($id);
        if (is_null($column)) {
            throw new NotFoundHttpException();
        }
        if (!($column instanceof Column)) {
            throw new NotFoundHttpException();
        }
        if (!$column->getBoard()->getUsers()->contains($user)) {
            throw new NotFoundHttpException();
        }
        return $column;
    }

    /**
     * Sets "Updated at" field at current time for column and board
     * @param Column $column
     * @return void
     */
    public function setUpdatedNow(Column $column): void
    {
        $column->setUpdatedAt(new DateTime());
        $column->getBoard()->setUpdatedAt(new DateTime());
    }
}