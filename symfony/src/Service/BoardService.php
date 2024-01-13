<?php

namespace App\Service;

use App\DTO\Board\BoardCreateRequestDto;
use App\DTO\Board\BoardResponseDto;
use App\DTO\Board\BoardShortResponseDto;
use App\DTO\Board\BoardUpdateRequestDto;
use App\Entity\Board;
use App\Entity\User;
use App\Mapper\BoardMapper;
use App\Repository\BoardRepository;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\User\UserInterface;

class BoardService
{
    public function __construct(
        private readonly BoardRepository        $boardRepository,
        private readonly EntityManagerInterface $entityManager,
        private readonly BoardMapper            $mapper,
    )
    {
    }

    /**
     * Get all boards for given user
     * @return BoardShortResponseDto[]
     */
    public function getAllForUser(UserInterface $user): array
    {
        $result = array_map(
            fn($board) => $this->mapper->toBoardShortResponseDto($board),
            $this->boardRepository->findByUser($user)
        );
        usort($result, function ($b1, $b2) {
            /**
             * @var BoardShortResponseDto $b1
             * @var BoardShortResponseDto $b2
             */
            return $b1->updatedAt <=> $b2->updatedAt;
        });
        return $result;
    }

    /**
     * Try to get board by id.
     * @throws NotFoundHttpException if board not found or access denied
     */
    public function getById(int $id, UserInterface $user): BoardResponseDto
    {
        $board = $this->getBoardOrThrow($id, $user);

        return $this->mapper->toBoardResponseDto($board);
    }

    /**
     * Create board from request data.<br>
     * @throws AuthenticationException if user is not instance of {@see User}
     */
    public function createFromRequest(BoardCreateRequestDto $dto, UserInterface $user): BoardShortResponseDto
    {
        if (!($user instanceof User)) {
            throw new AuthenticationException("Couldn't get user information");
        }
        $board = new Board();
        $board->setTitle($dto->title);
        $board->addUser($user);
        $this->entityManager->persist($board);
        $this->entityManager->flush();
        return $this->mapper->toBoardShortResponseDto($board);
    }

    /**
     * Update board by id with data from request.
     * @throws NotFoundHttpException if board not found or access denied
     */
    public function updateFromRequest(int $id, BoardUpdateRequestDto $dto, UserInterface $user): BoardShortResponseDto
    {
        $board = $this->getBoardOrThrow($id, $user);
        if (isset($dto->title)) {
            $board->setTitle($dto->title);
        }
        $this->setUpdatedNow($board);
        $this->entityManager->flush();
        return $this->mapper->toBoardShortResponseDto($board);
    }

    /**
     * Delete board by id.
     * @throws NotFoundHttpException if board not found or access denied
     */
    public function delete(int $id, UserInterface $user): void
    {
        $board = $this->getBoardOrThrow($id, $user);
        $this->entityManager->remove($board);
        $this->entityManager->flush();
    }

    /**
     * Try to get board by id.
     * @throws NotFoundHttpException if board not found or access denied
     */
    public function getBoardOrThrow(int $id, UserInterface $user): Board
    {
        $board = $this->boardRepository->findById($id);
        if (is_null($board)) {
            throw new NotFoundHttpException();
        }
        if (!($board instanceof Board)) {
            throw new NotFoundHttpException();
        }
        if (!$board->getUsers()->contains($user)) {
            throw new NotFoundHttpException();
        }
        return $board;
    }

    /**
     * Sets "Updated at" field at current time for board
     * @param Board $board
     * @return void
     */
    public function setUpdatedNow(Board $board): void
    {
        $board->setUpdatedAt(new DateTime());
    }
}