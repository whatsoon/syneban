<?php

namespace App\DTO\Auth;

/**
 * @param string email user's email
 */
class UserResponseDto
{
    public function __construct(
        public readonly string $email
    ) {}
}