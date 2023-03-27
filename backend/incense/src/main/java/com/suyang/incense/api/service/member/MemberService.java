package com.suyang.incense.api.service.member;

import com.suyang.incense.api.request.member.MemberModifyReq;
import com.suyang.incense.api.request.member.MemberRegisterReq;
import com.suyang.incense.api.response.member.MemberInfoRes;
import com.suyang.incense.db.entity.member.Member;
import org.springframework.security.core.Authentication;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface MemberService {

    void registerMember(MemberRegisterReq memberRegisterReq);
    Member getMemberByEmail(String email);
    boolean isPossibleNickname(String nickname);
    MemberInfoRes getMemberInfo(Authentication authentication);
    void modifyMember(MemberModifyReq memberModifyReq, Authentication authentication) throws IOException;
    String updateProfile(Long userId, MultipartFile file) throws IOException;
}
