<?php

namespace App\Controller;

use App\DTO\Column\ColumnCreateRequestDto;
use App\DTO\Column\ColumnShortResponseDto;
use App\DTO\Column\ColumnSwapRequestDto;
use App\DTO\Column\ColumnUpdateRequestDto;
use App\Service\ColumnService;
use Nelmio\ApiDocBundle\Annotation\Model;
use OpenApi\Attributes as OA;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Attribute\MapRequestPayload;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/column', name: 'column_')]
#[OA\Tag('column')]
class ColumnController extends AbstractController
{
    /**
     * Create column
     * @param ColumnCreateRequestDto $dto
     * @param ColumnService $columnService
     * @return JsonResponse
     */
    #[OA\RequestBody(
        content: new Model(type: ColumnCreateRequestDto::class)
    )]
    #[OA\Response(
        response: 200,
        description: 'Created column in short format',
        content: new OA\JsonContent(
            ref: new Model(type: ColumnShortResponseDto::class),
            type: 'object'
        )
    )]
    #[Route('', name: 'create', methods: 'POST', format: 'json')]
    public function create(
        #[MapRequestPayload] ColumnCreateRequestDto $dto,
        ColumnService                               $columnService): JsonResponse
    {
        return $this->json(
            $columnService->createFromRequest($dto, $this->getUser())
        );
    }

    /**
     * Update column data by id
     * @param int $id
     * @param ColumnUpdateRequestDto $dto
     * @param ColumnService $columnService
     * @return JsonResponse
     */
    #[OA\RequestBody(
        content: new Model(type: ColumnUpdateRequestDto::class)
    )]
    #[OA\Response(
        response: 200,
        description: 'Column updated successfully',
    )]
    #[Route('/{id}', name: 'update', requirements: ['id' => '\d+'], methods: 'PUT', format: 'json')]
    public function update(
        int                                         $id,
        #[MapRequestPayload] ColumnUpdateRequestDto $dto,
        ColumnService                               $columnService): JsonResponse
    {
        $columnService->updateFromRequest($id, $dto, $this->getUser());
        return $this->json(null);
    }

    /**
     * Delete column by id
     * @param int $id
     * @param ColumnService $columnService
     * @return JsonResponse
     */
    #[OA\Response(
        response: 200,
        description: 'Column deleted successfully'
    )]
    #[Route('/{id}', name: 'delete', requirements: ['id' => '\d+'], methods: 'DELETE', format: 'json')]
    public function delete(int $id, ColumnService $columnService): JsonResponse
    {
        $columnService->delete($id, $this->getUser());
        return $this->json(null);
    }

    #[OA\Response(
        response: 200,
        description: 'Column swapped successfully'
    )]
    #[Route(':swap/{id}', name: 'swap', requirements: ['id' => '\d+'], methods: 'PUT', format: 'json')]
    public function swap(
        int                                       $id,
        #[MapRequestPayload] ColumnSwapRequestDto $dto,
        ColumnService                             $columnService): JsonResponse
    {
        $columnService->swap($id, $dto, $this->getUser());
        return $this->json(null);
    }
}