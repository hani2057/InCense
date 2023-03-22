package com.suyang.incense.api.controller;

import com.suyang.incense.api.response.member.auth.LoginRes;
import com.suyang.incense.api.service.member.AuthService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AuthController {

    private final AuthService authService;

    @GetMapping("auth/login/kakao")
    @ApiOperation(value = "카카오 로그인", notes = "카카오 인가코드를 입력 받아 카카오 유저 정보를 반환하거나 로그인한다.")
    public ResponseEntity<LoginRes> kakaoLogin(@RequestParam String code) {
        System.out.println("두근두근 카카오 로그인 시간~_~");
        // 1. 인가코드로 Kakao AccessToken 가져오기
        String kakaoAccessToken = authService.getKakakoAccessToken(code).getAccess_token();
        System.out.println("###kakaoAccessToken : " + kakaoAccessToken);
        // 2. Kakao AccessToken으로 회원 정보 가져오기
        String email = authService.GetKakaoUserInfo(kakaoAccessToken);
        System.out.println(email);
        // 3. 기존 회원과 신입 회원 구분하기
        if(authService.isExistUser(email, "kakao")) {
            // 기존회원의 경우 JWT 토큰 발급해서 반환
            System.out.println("JWT 토큰 발급 해야지!!!!!!!!!!!!");
        } else {
            // 신입 회원의 경우 토큰 발급 X DB에 회원 정보 저장 X
            System.out.println("하 이건 어떻게 해야하지");
        }

        return null;
    }
}
