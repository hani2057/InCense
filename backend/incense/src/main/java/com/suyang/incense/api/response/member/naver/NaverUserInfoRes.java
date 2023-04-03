package com.suyang.incense.api.response.member.naver;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NaverUserInfoRes {

    public String resultcode;
    public String message;

    public Response response;

    @Data
    public static class Response {

        String email;
        String nickname;
        String profile_image;
        String age;
        String gender;
        String id;
        String name;
        String birthday;
        String birthyear;
        String mobile;

    }
}
