<?php

namespace App\Controller;

use App\DTO\Board\BoardCreateRequestDto;
use App\DTO\Board\BoardResponseDto;
use App\DTO\Board\BoardShortResponseDto;
use App\DTO\Board\BoardUpdateRequestDto;
use App\Service\BoardService;
use Nelmio\ApiDocBundle\Annotation\Model;
use OpenApi\Attributes as OA;
use OpenApi\Attributes\Items;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Attribute\MapRequestPayload;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/board', name: 'board_')]
#[OA\Tag('board')]
class BoardController extends AbstractController
{
    /**
     * Get all user boards
     * @param BoardService $boardService
     * @return JsonResponse
     */
    #[OA\Response(
        response: 200,
        description: 'List of all user boards in short format',
        content: new OA\JsonContent(
            type: 'array',
            items: new Items(
                ref: new Model(type: BoardShortResponseDto::class)
            )
        )
    )]
    #[Route('', name: 'get_all', methods: 'GET', format: 'json')]
    public function getAll(BoardService $boardService): JsonResponse
    {
        return $this->json(
            $boardService->getAllForUser($this->getUser())
        );
    }

    /**
     * Get board data by id
     * @param int $id
     * @param BoardService $boardService
     * @return JsonResponse
     */
    #[OA\Response(
        response: 200,
        description: 'Board data',
        content: new OA\JsonContent(
            ref: new Model(type: BoardResponseDto::class),
            type: 'object'
        )
    )]
    #[Route('/{id}', name: 'get', requirements: ['id' => '\d+'], methods: 'GET', format: 'json')]
    public function get(int $id, BoardService $boardService): JsonResponse
    {
        $board = $boardService->getById($id, $this->getUser());

        return $this->json($board);
    }

    /**
     * Create board
     * @param BoardCreateRequestDto $dto
     * @param BoardService $boardService
     * @return JsonResponse
     */
    #[OA\RequestBody(
        content: new Model(type: BoardCreateRequestDto::class)
    )]
    #[OA\Response(
        response: 200,
        description: 'Created board in short format',
        content: new OA\JsonContent(
            ref: new Model(type: BoardShortResponseDto::class),
            type: 'object'
        )
    )]
    #[Route('', name: 'create', methods: 'POST', format: 'json')]
    public function create(
        #[MapRequestPayload] BoardCreateRequestDto $dto,
        BoardService                               $boardService): JsonResponse
    {
        $board = $boardService->createFromRequest($dto, $this->getUser());
        return $this->json($board);
    }

    /**
     * Update board data by id
     * @param int $id
     * @param BoardUpdateRequestDto $dto
     * @param BoardService $boardService
     * @return JsonResponse
     */
    #[OA\Response(
        response: 200,
        description: 'Updated board in short format',
        content: new OA\JsonContent(
            ref: new Model(type: BoardShortResponseDto::class),
            type: 'object'
        )
    )]
    #[OA\RequestBody(
        content: new Model(type: BoardUpdateRequestDto::class)
    )]
    #[Route(
        '/{id}',
        name: 'put',
        requirements: ['id' => '\d+'],
        methods: 'PUT', format: 'json')
    ]
    public function update(
        int                                        $id,
        #[MapRequestPayload] BoardUpdateRequestDto $dto,
        BoardService                               $boardService): JsonResponse
    {
        $board = $boardService->updateFromRequest($id, $dto, $this->getUser());
        return $this->json($board);
    }

    /**
     * Delete board by id
     * @param int $id
     * @param BoardService $boardService
     * @return JsonResponse
     */
    #[OA\Response(
        response: 200,
        description: 'Board deleted successfully',
    )]
    #[Route(
        '/{id}',
        name: 'delete',
        requirements: ['id' => '\d+'],
        methods: 'DELETE', format: 'json')
    ]
    public function delete(
        int          $id,
        BoardService $boardService): JsonResponse
    {
        $boardService->delete($id, $this->getUser());
        return $this->json(null);
    }
}
