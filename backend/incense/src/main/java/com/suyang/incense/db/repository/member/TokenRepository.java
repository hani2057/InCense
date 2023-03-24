package com.suyang.incense.db.repository.member;

import com.suyang.incense.db.entity.member.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TokenRepository extends JpaRepository<Token, Long> {

    Optional<Token> findByKey(Long key);
    Optional<Token> findByUserId(Long userId);
}
