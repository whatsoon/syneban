<?php

namespace App\Controller;

use App\DTO\Auth\LoginRequestDto;
use App\DTO\Auth\UserResponseDto;
use App\Repository\UserRepository;
use App\Service\LoginService;
use Nelmio\ApiDocBundle\Annotation\Model;
use Nelmio\ApiDocBundle\Annotation\Security;
use OpenApi\Attributes as OA;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Exception\BadRequestException;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\MapRequestPayload;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api', name: 'auth_')]
#[OA\Tag('auth')]
class AuthController extends AbstractController
{
    /**
     * Get user email
     *
     * @return JsonResponse
     */
    #[OA\Response(
        response: 200,
        description: 'Returns user email',
        content: new OA\JsonContent(
            ref: new Model(type: UserResponseDto::class),
            type: 'object'
        )
    )]
    #[OA\Response(
        response: 401,
        description: 'Authentication error'
    )]
    #[Route('/user', name: 'user', methods: ['GET'], format: 'json')]
    public function user(): JsonResponse
    {
        $response = new JsonResponse();
        $response->setData(new UserResponseDto(
            $this->getUser()->getUserIdentifier()
        ));
        return $response;
    }

    /**
     * Google login
     *
     * @param LoginRequestDto $loginRequestDto
     * @param Request $request
     * @param LoginService $loginService
     * @return JsonResponse User email
     */
    #[OA\RequestBody(
        content: new Model(type: LoginRequestDto::class)
    )]
    #[Security(name: null)]
    #[OA\Response(
        response: 200,
        description: 'Login success, tokens were set to cookies'
    )]
    #[Route('/login', name: 'login', methods: ['POST'], format: 'json')]
    public function login(
        #[MapRequestPayload] LoginRequestDto $loginRequestDto,
        Request $request,
        LoginService $loginService
    ): Response
    {
        $loginService->verifyCSRF($request, $loginRequestDto);

        $payload = $loginService->verifyIdToken($loginRequestDto, $this->getParameter('google.client_id'));
        $user = $loginService->findUser($payload['email']);

        $res = new RedirectResponse('/');

        $loginService->setAccessTokenCookie(
            $res, $loginService->createJwtAccessToken($user)
        );
        $loginService->setRefreshTokenCookie(
            $res, $loginService->createJwtRefreshToken($user)
        );

        return $res;
    }

    /**
     * Log out user
     *
     * @param Request $request
     * @param LoginService $loginService
     * @return JsonResponse
     */
    #[OA\Response(
        response: 200,
        description: 'Logout success, tokens were removed'
    )]
    #[Route('/logout', name: 'logout', methods: ['POST'], format: 'json')]
    public function logout(Request $request, LoginService $loginService): JsonResponse
    {
        $loginService->deleteRefreshToken(
            $loginService->extractRefreshToken($request)
        );
        $response = new JsonResponse();
        $loginService->clearAllTokenCookies($response);
        return $response;
    }

    /**
     * Refresh tokens
     *
     * @param Request $request
     * @param UserRepository $userRepository
     * @param LoginService $loginService
     * @return JsonResponse User email
     */
    #[OA\Response(
        response: 200,

        description: 'Refresh success, tokens was updated'
    )]
    #[Route('/refresh', name: 'refresh', methods: ['POST'], format: 'json')]
    public function refresh(
        Request $request,
        UserRepository $userRepository,
        LoginService $loginService
    ): JsonResponse
    {
        $refreshToken = $loginService->extractRefreshToken($request);
        if (!$loginService->isRefreshTokenValid($refreshToken)) {
            throw new BadRequestException(
                'Refresh token is invalid',
                Response::HTTP_FORBIDDEN
            );
        }

        $loginService->refreshToken($refreshToken);

        $user = $userRepository->findOneBy([
            'email' => $refreshToken->getUsername()
        ]);
        $res = new JsonResponse();
        $res->setData(new UserResponseDto($user->getUserIdentifier()));

        $loginService->setAccessTokenCookie(
            $res, $loginService->createJwtAccessToken($user)
        );

        $loginService->setRefreshTokenCookie(
            $res, $refreshToken->getRefreshToken()
        );

        return $res;
    }
}
