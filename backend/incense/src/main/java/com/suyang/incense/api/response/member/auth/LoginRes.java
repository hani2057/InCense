package com.suyang.incense.api.response.member.auth;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginRes {

    public String accessToken;
    public String email;
}
