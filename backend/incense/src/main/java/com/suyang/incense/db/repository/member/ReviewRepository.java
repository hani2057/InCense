package com.suyang.incense.db.repository.member;

import com.suyang.incense.db.entity.review.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long>, ReviewCustomRepository {

    Optional<Review> findById(Long id);

}
