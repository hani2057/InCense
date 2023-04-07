package com.suyang.incense.db.repository.member;


import org.springframework.stereotype.Repository;

@Repository
public interface GradeCustomRepository {

    String checkMemberRank(Long memberId);
}
