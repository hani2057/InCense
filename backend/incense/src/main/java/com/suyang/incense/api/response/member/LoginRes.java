package com.suyang.incense.api.response.member;

import lombok.AllArgsConstructor;
import lombok.Getter;


@Getter
@AllArgsConstructor
public class LoginRes {

    private String accessToken;
    private String nickname;
    private String email;
    private String type;

}
