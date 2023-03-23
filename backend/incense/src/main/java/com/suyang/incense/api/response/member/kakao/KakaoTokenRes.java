package com.suyang.incense.api.response.member.kakao;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class KakaoTokenRes {

    private String token_type;
    private String access_token;
    private String id_token;
    private Integer expires_in;
    private String refresh_token;
    private Integer refresh_token_expires_in;
    private String scope;
}
