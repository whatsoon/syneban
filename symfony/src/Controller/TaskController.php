<?php

namespace App\Controller;

use App\DTO\Task\TaskCreateRequestDto;
use App\DTO\Task\TaskResponseDto;
use App\DTO\Task\TaskSwapRequestDto;
use App\DTO\Task\TaskUpdateRequestDto;
use App\Service\TaskService;
use Nelmio\ApiDocBundle\Annotation\Model;
use OpenApi\Attributes as OA;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Attribute\MapRequestPayload;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/task', name: 'task_')]
#[OA\Tag('task')]
class TaskController extends AbstractController
{
    /**
     * Create task
     * @param TaskCreateRequestDto $dto
     * @param TaskService $taskService
     * @return JsonResponse
     */
    #[OA\RequestBody(
        content: new Model(type: TaskCreateRequestDto::class)
    )]
    #[OA\Response(
        response: 200,
        description: 'Created task in short format',
        content: new OA\JsonContent(
            ref: new Model(type: TaskResponseDto::class),
            type: 'object'
        )
    )]
    #[Route('', name: 'create', methods: 'POST', format: 'json')]
    public function create(
        #[MapRequestPayload] TaskCreateRequestDto $dto,
        TaskService                               $taskService): JsonResponse
    {
        return $this->json(
            $taskService->createFromRequest($dto, $this->getUser())
        );
    }

    /**
     * Update task data by id
     * @param int $id
     * @param TaskUpdateRequestDto $dto
     * @param TaskService $taskService
     * @return JsonResponse
     */
    #[OA\RequestBody(
        content: new Model(type: TaskUpdateRequestDto::class)
    )]
    #[OA\Response(
        response: 200,
        description: 'Task updated successfully',
    )]
    #[Route('/{id}', name: 'update', requirements: ['id' => '\d+'], methods: 'PUT', format: 'json')]
    public function update(
        int                                       $id,
        #[MapRequestPayload] TaskUpdateRequestDto $dto,
        TaskService                               $taskService): JsonResponse
    {
        $taskService->updateFromRequest($id, $dto, $this->getUser());
        return $this->json(null);
    }

    /**
     * Delete task by id
     * @param int $id
     * @param TaskService $taskService
     * @return JsonResponse
     */
    #[OA\Response(
        response: 200,
        description: 'Task deleted successfully',
    )]
    #[Route('/{id}', name: 'delete', requirements: ['id' => '\d+'], methods: 'DELETE', format: 'json')]
    public function delete(int $id, TaskService $taskService): JsonResponse
    {
        $taskService->delete($id, $this->getUser());
        return $this->json(null);
    }

    #[OA\Response(
        response: 200,
        description: 'Task swapped successfully'
    )]
    #[Route(':swap/{id}', name: 'swap', requirements: ['id' => '\d+'], methods: 'PUT', format: 'json')]
    public function swap(
        int                                     $id,
        #[MapRequestPayload] TaskSwapRequestDto $dto,
        TaskService                             $taskService): JsonResponse
    {
        $taskService->swap($id, $dto, $this->getUser());
        return $this->json(null);
    }
}