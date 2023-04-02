package com.suyang.incense.db.repository.member;

import com.suyang.incense.db.entity.member.Member;

import java.util.List;

public interface MemberCustomRepository {
    public List<Member> getAlarmMembers(Long perfumeId);
}
