<?php

namespace App\Service;

use App\DTO\Auth\LoginRequestDto;
use App\Entity\User;
use App\Repository\UserRepository;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Gesdinet\JWTRefreshTokenBundle\Generator\RefreshTokenGeneratorInterface;
use Gesdinet\JWTRefreshTokenBundle\Model\RefreshTokenInterface;
use Gesdinet\JWTRefreshTokenBundle\Model\RefreshTokenManagerInterface;
use Google_Client;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\User\UserInterface;

class LoginService
{
    public function __construct(
        private readonly UserRepository                 $userRepository,
        private readonly EntityManagerInterface         $entityManager,
        private readonly JWTTokenManagerInterface       $JWTManager,
        private readonly RefreshTokenGeneratorInterface $refreshTokenGenerator,
        private readonly RefreshTokenManagerInterface   $refreshTokenManager,
        private                                         $accessTokenTtl,
        private                                         $accessTokenCookieName,
        private                                         $refreshTokenTtl,
        private                                         $refreshTokenCookieName,
    )
    {
    }

    /**
     * Check csrf tokens in cookie and request payload<br>
     * Throws {@see AuthenticationException} on invalid CSRF
     *
     * @param Request $request
     * @param LoginRequestDto $loginRequestDto Request payload
     */
    public function verifyCSRF(Request $request, LoginRequestDto $loginRequestDto): void
    {
        $csrfTokenCookie = $request->cookies->get('g_csrf_token');
        if (is_null($csrfTokenCookie)) {
            throw new AuthenticationException(
                'No CSRF token in Cookie',
                Response::HTTP_BAD_REQUEST
            );
        }
        $csrfTokenBody = $loginRequestDto->g_csrf_token;
        if (is_null($csrfTokenBody)) {
            throw new AuthenticationException(
                'No CSRF token in post body',
                Response::HTTP_BAD_REQUEST
            );
        }
        if ($csrfTokenCookie != $csrfTokenBody) {
            throw new AuthenticationException(
                'Failed to verify double submit cookie',
                Response::HTTP_BAD_REQUEST
            );
        }
    }

    /**
     * Verify id token and return payload<br>
     * Throws {@see AuthenticationException} on invalid token
     *
     * @param LoginRequestDto $loginRequestDto
     * @param string $clientId
     * @return array Token payload
     */
    public function verifyIdToken(LoginRequestDto $loginRequestDto, string $clientId): array
    {
        $client = new Google_Client(['client_id' => $clientId]);
        $payload = $client->verifyIdToken($loginRequestDto->credential);
        if ($payload) {
            return $payload;
        } else {
            throw new AuthenticationException('Login failed', Response::HTTP_UNAUTHORIZED);
        }
    }

    /**
     * Find user by email or create if it doesn't exist
     *
     * @param string $email
     * @return User
     */
    public function findUser(string $email): User
    {
        $user = $this->userRepository->findOneBy(['email' => $email]);
        if (is_null($user)) {
            $user = new User();
            $user->setEmail($email);
            $this->entityManager->persist($user);
            $this->entityManager->flush();
        }
        return $user;
    }

    /**
     * Create JWT token for given user
     *
     * @param UserInterface $user
     * @return string
     */
    public function createJwtAccessToken(UserInterface $user): string
    {
        return $this->JWTManager->create($user);
    }

    /**
     * Create refresh token for given user
     *
     * @param UserInterface $user
     * @return RefreshTokenInterface
     */
    public function createJwtRefreshToken(UserInterface $user): RefreshTokenInterface
    {
        $refresh = $this->refreshTokenGenerator->createForUserWithTtl(
            $user, $this->refreshTokenTtl
        );
        $this->refreshTokenManager->save($refresh);
        return $refresh;
    }

    /**
     * Set token in cookie with name {@see $accessTokenCookieName}
     *
     * @param Response $response
     * @param string $token
     */
    public function setAccessTokenCookie(Response $response, string $token): void
    {
        $response->headers->setCookie(Cookie::create(
            name: $this->accessTokenCookieName,
            value: $token,
            expire: time() + $this->accessTokenTtl,
            sameSite: 'lax',
            secure: true
        ));
    }

    /**
     * Set token in cookie with name {@see $refreshTokenCookieName}
     *
     * @param Response $response
     * @param string $token
     */
    public function setRefreshTokenCookie(Response $response, string $token): void
    {
        $response->headers->setCookie(Cookie::create(
            name: $this->refreshTokenCookieName,
            value: $token,
            expire: time() + $this->refreshTokenTtl,
            sameSite: 'lax',
            secure: true
        ));
    }

    /**
     * Get refresh token from cookie with name {@see $refreshTokenCookieName}
     *
     * @param Request $request
     * @return RefreshTokenInterface|null
     */
    public function extractRefreshToken(Request $request): ?RefreshTokenInterface
    {
        return $this->refreshTokenManager->get(
            $request->cookies->get($this->refreshTokenCookieName)
        );
    }

    /**
     * Check if refresh token is not null and valid
     *
     * @param RefreshTokenInterface|null $refreshToken
     * @return bool true if valid, else false
     */
    public function isRefreshTokenValid(?RefreshTokenInterface $refreshToken): bool
    {
        if (!is_null($refreshToken) && $refreshToken->isValid()) {
            return true;
        }
        return false;
    }

    /**
     * Update refresh token expiration date by {@see $refreshTokenTtl} seconds and save
     *
     * @param RefreshTokenInterface $refreshToken
     */
    public function refreshToken(RefreshTokenInterface $refreshToken): void
    {
        $expirationDate = new DateTime();
        $expirationDate->modify(sprintf('+%d seconds', $this->refreshTokenTtl));
        $refreshToken->setValid($expirationDate);

        $this->refreshTokenManager->save($refreshToken);
    }

    /**
     * Delete refresh token from database
     *
     * @param RefreshTokenInterface|null $refreshToken
     */
    public function deleteRefreshToken(?RefreshTokenInterface $refreshToken): void
    {
        if (!is_null($refreshToken)) $this->refreshTokenManager->delete($refreshToken);
    }

    /**
     * Set headers clearing cookies with names {@see $accessTokenCookieName} and {@see $refreshTokenCookieName}
     *
     * @param Response $response
     */
    public function clearAllTokenCookies(Response $response): void
    {
        $response->headers->clearCookie($this->accessTokenCookieName);
        $response->headers->clearCookie($this->refreshTokenCookieName);
    }
}