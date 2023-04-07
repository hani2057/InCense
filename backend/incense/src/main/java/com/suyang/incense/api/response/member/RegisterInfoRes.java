package com.suyang.incense.api.response.member;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class RegisterInfoRes {

    private String accessToken;
    private String nickname;
}
