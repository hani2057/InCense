package com.suyang.incense.api.service.member;

import com.suyang.incense.api.request.member.MemberInfoModifyReq;
import com.suyang.incense.api.request.member.MemberProfileModifyReq;
import com.suyang.incense.api.request.member.MemberRegisterReq;
import com.suyang.incense.api.response.member.MemberInfoRes;
import com.suyang.incense.api.response.member.RegisterInfoRes;
import com.suyang.incense.db.entity.member.Member;
import org.springframework.security.core.Authentication;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface MemberService {

    // 회원가입 - 추가 정보 작성
    RegisterInfoRes registerMember(MemberRegisterReq memberRegisterReq);

    // email을 통해서 사용자 정보 조회
    Member getMemberByEmail(String email);

    // 닉네임 중복 체크 - 사용가능한 닉네임인지 판단
    boolean isPossibleNickname(String nickname);

    // 사용자 전체 정보 조회
    MemberInfoRes getMemberInfo(Authentication authentication);

    // 사용자 정보 변경
    void modifyMemberInfo(MemberInfoModifyReq memberInfoModifyReq, Authentication authentication);
    void modifyMemberProfile(MemberProfileModifyReq memberProfileModifyReq, Authentication authentication) throws IOException;

    // 사용자 프로필 이미지 변경
    String updateProfile(Long userId, MultipartFile file) throws IOException;

    // 사용자 점수 추가 & 사용자 등급 변경
    void addRank(int type, Long memberId);
//    void checkRank(Long memberId);


}
