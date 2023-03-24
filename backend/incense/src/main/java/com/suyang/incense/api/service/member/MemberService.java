package com.suyang.incense.api.service.member;

import com.suyang.incense.api.request.member.MemberRegisterReq;
import com.suyang.incense.db.entity.member.Member;

public interface MemberService {

    // 신입 회원 정보 저장
    void registerMember(MemberRegisterReq memberRegisterReq);
    Member getMemeberByEmail(String email);
}
