package com.suyang.incense.api.service.member;

import com.suyang.incense.api.response.member.auth.kakao.KakaoTokenRes;

public interface AuthService {

    KakaoTokenRes getKakakoAccessToken(String code);
    String GetKakaoUserInfo(String kakaoAccessToken);
    boolean isExistUser(String email, String type);

}
