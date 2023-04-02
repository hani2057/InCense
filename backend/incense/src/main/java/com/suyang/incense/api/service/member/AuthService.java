package com.suyang.incense.api.service.member;

import com.suyang.incense.api.response.member.LoginRes;
import com.suyang.incense.api.response.member.kakao.KakaoTokenRes;
import com.suyang.incense.db.entity.member.Member;
import org.springframework.security.core.Authentication;

import java.util.Optional;

public interface AuthService {

    KakaoTokenRes getKakakoAccessToken(String code);
    String GetKakaoUserInfo(String kakaoAccessToken);
    LoginRes isExistUser(String email, String type);
    String getToken(String email);
    Long getIdByAuthentication(Authentication authentication);
    Optional<Member> getMemberByAuthentication(Authentication authentication);

}
