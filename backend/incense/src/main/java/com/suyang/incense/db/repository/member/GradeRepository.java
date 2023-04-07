package com.suyang.incense.db.repository.member;

import com.suyang.incense.db.entity.member.Grade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GradeRepository extends JpaRepository<Grade, Long>, GradeCustomRepository {

    Optional<Grade> findById(Long id);
    Optional<Grade> findByName(String name);
}
