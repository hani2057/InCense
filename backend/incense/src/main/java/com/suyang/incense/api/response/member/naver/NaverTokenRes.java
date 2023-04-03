package com.suyang.incense.api.response.member.naver;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NaverTokenRes {

    private String access_token;
    private String refresh_token;
    private String token_type;
    private Integer expires_in;
}
