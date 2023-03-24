package com.suyang.incense.api.service.member;

import com.suyang.incense.api.response.member.LoginRes;
import com.suyang.incense.api.response.member.kakao.KakaoTokenRes;
import org.springframework.security.core.Authentication;

public interface AuthService {

    KakaoTokenRes getKakakoAccessToken(String code);
    String GetKakaoUserInfo(String kakaoAccessToken);
    LoginRes isExistUser(String email, String type);
    String getToken(String email);
    Long getIdByAuthentication(Authentication authentication);

}
