<?php

namespace App\Tests\Mapper;

use App\DTO\Board\BoardResponseDto;
use App\Entity\Board;
use App\Entity\Column;
use App\Entity\Task;
use App\Entity\User;
use App\Mapper\BoardMapper;
use App\Mapper\ColumnMapper;
use App\Mapper\TaskMapper;
use App\Repository\BoardRepository;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\Exception\ORMException;
use Doctrine\ORM\OptimisticLockException;
use Exception;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;

class MapperTest extends KernelTestCase
{
    private BoardMapper $boardMapper;
    private BoardRepository $boardRepository;

    /**
     * @throws OptimisticLockException
     * @throws ORMException
     * @throws Exception
     */
    protected function setUp(): void
    {
        self::bootKernel();

        $user = new User();
        $user->setEmail('test@test.test');

        $task = new Task();
        $task->setId(1);
        $task->setTitle('task');

        $column = new Column();
        $column
            ->setId(1)
            ->setTitle('col')
            ->addTask($task);

        $board = new Board();
        $board
            ->setId(1)
            ->setTitle('board')
            ->addUser($user)
            ->addColumn($column);

        $this->boardRepository = $this->createMock(BoardRepository::class);
        $this->boardRepository->method('findAll')->willReturn([
            $board
        ]);

        $taskMapper = new TaskMapper();
        $columnMapper = new ColumnMapper($taskMapper);
        $this->boardMapper = new BoardMapper($columnMapper);
    }

    /**
     */
    public function testToBoardResponseDto(): void
    {
        $board = $this->boardRepository->findAll()[0];
        $user = $board->getUsers()->first();
        $column = $board->getColumns()->first();
        $task = $column->getTasks()->first();

        $result = $this->boardMapper->toBoardResponseDto($board);

        self::assertInstanceOf(BoardResponseDto::class, $result);
        self::assertEquals(
            $board->getTitle(),
            $result->title
        );
        self::assertEquals(
            $user->getEmail(),
            $result->users[0]->email
        );
        self::assertEquals(
            $column->getTitle(),
            $result->columns[0]->title
        );
        self::assertEquals(
            $task->getTitle(),
            $result->columns[0]->tasks[0]->title
        );
    }
}
