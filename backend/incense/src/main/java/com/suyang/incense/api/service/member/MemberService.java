package com.suyang.incense.api.service.member;

import com.suyang.incense.db.entity.member.Member;

public interface MemberService {

    // 신입 회원 정보 저장
    void registerMember(String email, String type);

    Member getMemeberByEmail(String email);
}
