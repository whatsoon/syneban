<?php

namespace App\Repository;

use App\Entity\Board;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\NonUniqueResultException;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Security\Core\User\UserInterface;

/**
 * @extends ServiceEntityRepository<Board>
 *
 * @method Board|null find($id, $lockMode = null, $lockVersion = null)
 * @method Board|null findOneBy(array $criteria, array $orderBy = null)
 * @method Board[]    findAll()
 * @method Board[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class BoardRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Board::class);
    }

    /**
     * Try to find boards for given user
     * @return Board[]
     */
    public function findByUser(UserInterface $user): array
    {
        $qb = $this->createQueryBuilder('board');
        $qb->where($qb->expr()->isMemberOf(':user', 'board.users'));
        $qb->setParameter('user', $user);
        return $qb->getQuery()->getResult();
    }

    /**
     * Try to find board by id
     */
    public function findById(int $id): ?Board
    {
        $qb = $this->createQueryBuilder('board');
        $qb->where($qb->expr()->eq(':id', 'board.id'));
        $qb->setParameter('id', $id);
        try {
            return $qb->getQuery()->setMaxResults(1)->getOneOrNullResult();
        } catch (NonUniqueResultException) {
            return null;
        }
    }

//    /**
//     * @return Board[] Returns an array of Board objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('b')
//            ->andWhere('b.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('b.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?Board
//    {
//        return $this->createQueryBuilder('b')
//            ->andWhere('b.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
