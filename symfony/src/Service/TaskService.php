<?php

namespace App\Service;

use App\DTO\Task\TaskCreateRequestDto;
use App\DTO\Task\TaskResponseDto;
use App\DTO\Task\TaskSwapRequestDto;
use App\DTO\Task\TaskUpdateRequestDto;
use App\Entity\Task;
use App\Mapper\TaskMapper;
use App\Repository\TaskRepository;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\NonUniqueResultException;
use Symfony\Component\HttpFoundation\Exception\BadRequestException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Security\Core\User\UserInterface;

class TaskService
{
    public function __construct(
        private readonly ColumnService $columnService,
        private readonly EntityManagerInterface $entityManager,
        private readonly TaskRepository $taskRepository,
        private readonly TaskMapper $mapper
    )
    {
    }

    /**
     * Create column from request data.
     * @throws NotFoundHttpException if column not found or access denied
     * @throws NonUniqueResultException
     */
    public function createFromRequest(TaskCreateRequestDto $dto, UserInterface $user): TaskResponseDto
    {
        $column = $this->columnService->getColumnOrThrow($dto->columnId, $user);
        $ord = $this->taskRepository->getLastOrdForColumn($dto->columnId);
        $task = new Task();
        $task->setCol($column);
        $task->setTitle($dto->title);
        $task->setOrd($ord + 1);
        $this->entityManager->persist($task);
        $this->entityManager->flush();
        return $this->mapper->toTaskResponseDto($task);
    }

    /**
     * Update task by id with data from request.
     * @throws NotFoundHttpException if task not found or access denied
     */
    public function updateFromRequest(int $id, TaskUpdateRequestDto $dto, UserInterface $user): TaskResponseDto
    {
        $task = $this->getTaskOrThrow($id, $user);
        if (isset($dto->title)) {
            $task->setTitle($dto->title);
        }
        if (isset($dto->columnId) && $dto->columnId !== $task->getCol()->getId()) {
            $column = $this->columnService->getColumnOrThrow($dto->columnId, $user);
            $ord = $this->taskRepository->getLastOrdForColumn($dto->columnId);
            $task->setOrd($ord + 1);
            $task->setCol($column);
        }
        $this->setUpdatedNow($task);
        $this->entityManager->flush();
        return $this->mapper->toTaskResponseDto($task);
    }

    public function swap(int $id, TaskSwapRequestDto $dto, UserInterface $user): void
    {
        $task = $this->getTaskOrThrow($id, $user);
        if ($dto->direction === 'up') {
            $tasks = $this->taskRepository->findByIdWithPrevious($id, $task->getCol()->getId());
            if (is_null($tasks)) return;
            $temp = $tasks[0]->getOrd();
            $tasks[0]->setOrd($tasks[1]->getOrd());
            $tasks[1]->setOrd($temp);
            $this->entityManager->flush();
            return;
        }
        if ($dto->direction === 'down') {
            $tasks = $this->taskRepository->findByIdWithNext($id, $task->getCol()->getId());
            if (is_null($tasks)) return;
            $temp = $tasks[0]->getOrd();
            $tasks[0]->setOrd($tasks[1]->getOrd());
            $tasks[1]->setOrd($temp);
            $this->entityManager->flush();
            return;
        }
        throw new BadRequestException();
    }

    /**
     * Delete task by id.
     * @throws NotFoundHttpException if task not found or access denied
     */
    public function delete(int $id, UserInterface $user): void
    {
        $task = $this->getTaskOrThrow($id, $user);
        $this->columnService->setUpdatedNow($task->getCol());
        $this->entityManager->remove($task);
        $this->entityManager->flush();
    }

    /**
     * Try to get task by id.
     * @throws NotFoundHttpException if board not found or access denied
     */
    public function getTaskOrThrow(int $id, UserInterface $user): Task
    {
        $task = $this->taskRepository->findById($id);
        if (is_null($task)) {
            throw new NotFoundHttpException();
        }
        if (!($task instanceof Task)) {
            throw new NotFoundHttpException();
        }
        if (!$task->getCol()->getBoard()->getUsers()->contains($user)) {
            throw new NotFoundHttpException();
        }
        return $task;
    }

    /**
     * Sets "Updated at" field at current time for task, column and board
     * @param Task $task
     * @return void
     */
    public function setUpdatedNow(Task $task): void
    {
        $task->setUpdatedAt(new DateTime());
        $task->getCol()->setUpdatedAt(new DateTime());
        $task->getCol()->getBoard()->setUpdatedAt(new DateTime());
    }
}