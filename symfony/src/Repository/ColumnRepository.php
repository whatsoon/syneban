<?php

namespace App\Repository;

use App\Entity\Column;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\NonUniqueResultException;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Column>
 *
 * @method Column|null find($id, $lockMode = null, $lockVersion = null)
 * @method Column|null findOneBy(array $criteria, array $orderBy = null)
 * @method Column[]    findAll()
 * @method Column[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ColumnRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Column::class);
    }

    /**
     * Try to find column by id
     */
    public function findById(int $id): ?Column
    {
        $qb = $this->createQueryBuilder('column');
        $qb->where($qb->expr()->eq(':id', 'column.id'));
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
     * @return Column[]|null
     */
    public function findByIdWithNext(int $id): ?array
    {
        $query = $this->createQueryBuilder('c')
            ->where('c.id = :id')
            ->orWhere('c.ord > (
                SELECT c2.ord
                FROM App\Entity\Column c2
                WHERE c2.id = :id
            ) AND c.id != :id')
            ->setParameter('id', $id)
            ->orderBy('c.ord', 'asc')
            ->setMaxResults(2)
            ->getQuery();
        $columns = $query->getResult();
        if (count($columns) < 2) {
            return null;
        }
        return $columns;
    }

    /**
     * Returns array [$column, $previousColumn]
     * @param int $id
     * @return Column[]|null
     */
    public function findByIdWithPrevious(int $id): ?array
    {
        $query = $this->createQueryBuilder('c')
            ->where('c.id = :id')
            ->orWhere('c.ord < (
                SELECT c2.ord
                FROM App\Entity\Column c2
                WHERE c2.id = :id
            ) AND c.id != :id')
            ->setParameter('id', $id)
            ->orderBy('c.ord', 'desc')
            ->setMaxResults(2)
            ->getQuery();
        $columns = $query->getResult();
        if (count($columns) < 2) {
            return null;
        }
        return $columns;
    }

    /**
     * @throws NonUniqueResultException
     */
    public function getLastOrdForBoard(int $boardId): int
    {
        /** @var Column|null $column */
        $column = $this->createQueryBuilder('column')
            ->where('column.board = :id')
            ->setParameter('id', $boardId)
            ->orderBy('column.ord', 'desc')
            ->setMaxResults(1)
            ->getQuery()->getOneOrNullResult();
        if (is_null($column)) {
            return 0;
        }
        return $column->getOrd();
    }

//    /**
//     * @return Column[] Returns an array of Column objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('c.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?Column
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
