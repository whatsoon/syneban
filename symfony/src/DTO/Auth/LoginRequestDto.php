<?php

namespace App\DTO\Auth;

/**
 * @param string credential auth token from Google
 * @param string g_csrf_token csrf token from Google
 */
class LoginRequestDto
{
    public function __construct(
        public readonly string $credential,
        public readonly string $g_csrf_token
    ) {}
}