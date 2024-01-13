<?php

namespace App\Repository;

use App\Entity\Task;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\NonUniqueResultException;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Task>
 *
 * @method Task|null find($id, $lockMode = null, $lockVersion = null)
 * @method Task|null findOneBy(array $criteria, array $orderBy = null)
 * @method Task[]    findAll()
 * @method Task[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class TaskRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Task::class);
    }

    /**
     * Try to find task by id
     */
    public function findById(int $id): ?Task
    {
        $qb = $this->createQueryBuilder('task');
        $qb->where($qb->expr()->eq(':id', 'task.id'));
        $qb->setParameter('id', $id);
        try {
            return $qb->getQuery()->setMaxResults(1)->getOneOrNullResult();
        } catch (NonUniqueResultException) {
            return null;
        }
    }

    /**
     * Returns array [$column, $nextColumn]
     * @param int $id
     * @param int $columnId
     * @return Task[]|null
     */
    public function findByIdWithNext(int $id, int $columnId): ?array
    {
        $query = $this->createQueryBuilder('t')
            ->where('t.col = :columnId AND t.id = :id')
            ->orWhere('t.ord > (
                SELECT t2.ord
                FROM App\Entity\Task t2
                WHERE t2.id = :id
            ) AND t.id != :id AND t.col = :columnId')
            ->setParameter('id', $id)
            ->setParameter('columnId', $columnId)
            ->orderBy('t.ord', 'asc')
            ->setMaxResults(2)
            ->getQuery();
        $tasks = $query->getResult();
        if (count($tasks) < 2) {
            return null;
        }
        return $tasks;
    }

    /**
     * Returns array [$previousColumn, $column]
     * @param int $id
     * @param int $columnId
     * @return Task[]|null
     */
    public function findByIdWithPrevious(int $id, int $columnId): ?array
    {
        $query = $this->createQueryBuilder('t')
            ->where('t.col = :columnId AND t.id = :id')
            ->orWhere('t.ord < (
                SELECT t2.ord
                FROM App\Entity\Task t2
                WHERE t2.id = :id
            ) AND t.id != :id AND t.col = :columnId')
            ->setParameter('id', $id)
            ->setParameter('columnId', $columnId)
            ->orderBy('t.ord', 'desc')
            ->setMaxResults(2)
            ->getQuery();
        $tasks = $query->getResult();
        if (count($tasks) < 2) {
            return null;
        }
        return $tasks;
    }

    /**
     * @throws NonUniqueResultException
     */
    public function getLastOrdForColumn(int $columnId): int
    {
        /** @var Task|null $task */
        $task = $this->createQueryBuilder('t')
            ->where('t.col = :id')
            ->setParameter('id', $columnId)
            ->orderBy('t.ord', 'desc')
            ->setMaxResults(1)
            ->getQuery()->getOneOrNullResult();
        if (is_null($task)) {
            return 0;
        }
        return $task->getOrd();
    }

//    /**
//     * @return Task[] Returns an array of Task objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('t')
//            ->andWhere('t.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('t.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?Task
//    {
//        return $this->createQueryBuilder('t')
//            ->andWhere('t.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
