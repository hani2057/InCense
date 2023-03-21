package com.suyang.incense.db.repository.deal;

import com.suyang.incense.db.entity.member.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {

}
