package com.suyang.incense.api.response.member.kakao;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class KakaoUserInfoRes {

    public Long id;
    public String connected_at;

    public KakaoUser kakao_account;

    @Data
    public static class KakaoUser {

        Boolean has_email;
        Boolean email_needs_agreement;
        Boolean is_email_valid;
        Boolean is_email_verified;
        String email;
    }
}
