package com.suyang.incense.api.response.member;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class LoginRes {

    private String accessToken;

    private String email;

    private String type;

    public static LoginRes of(String accessToken, String email, String type) {
        return new LoginRes(accessToken, email, type);
    }

}
