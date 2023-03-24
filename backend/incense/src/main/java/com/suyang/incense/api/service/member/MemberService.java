package com.suyang.incense.api.service.member;

import com.suyang.incense.api.request.member.MemberRegisterReq;
import com.suyang.incense.db.entity.member.Member;
import org.springframework.security.core.Authentication;

public interface MemberService {

    void registerMember(MemberRegisterReq memberRegisterReq);
    Member getMemeberByEmail(String email);
    boolean isPossibleNickname(String nickname);
    void modifyNickname(String nickname, Authentication authentication);
}
