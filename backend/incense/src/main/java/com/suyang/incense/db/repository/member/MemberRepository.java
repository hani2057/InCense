package com.suyang.incense.db.repository.member;

import com.suyang.incense.db.entity.member.Member;
import com.suyang.incense.db.entity.member.SocialType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long>  {

    Optional<Member> findByEmail(String email);
    Optional<Member> findByEmailAndType(String email, SocialType type);
}
