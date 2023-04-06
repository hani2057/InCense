package com.suyang.incense.api.controller;

import com.suyang.incense.api.response.member.LoginRes;
import com.suyang.incense.api.service.member.AuthService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Api(value = "로그인 API", tags = {"Authorization"})
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    @GetMapping("/login/kakao")
    @ApiOperation(value = "카카오 로그인", notes = "카카오 인가코드를 받아 로그인 진행")
    public ResponseEntity<LoginRes> kakaoLogin(@RequestParam String code) {
//        System.out.println("###[Kakao Login] code = " + code);
        
        // 1. 인가코드로 Kakao AccessToken 가져오기
        String kakaoAccessToken = authService.getKakakoAccessToken(code).getAccess_token();
//        System.out.println("###[Kakao Login] kakaoAccessToken = " + kakaoAccessToken);
        
        // 2. Kakao AccessToken으로 회원 정보 가져오기
        String email = authService.getKakaoUserInfo(kakaoAccessToken);
//        System.out.println("###[Kakao Login] User email = " + email);

        // 3. 기존 회원과 신입 회원 구분하기
        LoginRes loginRes = authService.isExistUser(email, "kakao");

//        System.out.println("###[Kakao Login] LoginRes.email = " + loginRes.getEmail() + " / LoginRes.type = " + loginRes.getType());
        return ResponseEntity.status(200).body(loginRes);
    }

    @GetMapping("/login/naver") // 현재 "검수중" 이기 때문에 사용 불가능
    @ApiOperation(value = "네이버 로그인", notes = "네이버 인가코드를 받아 로그인 진행")
    public ResponseEntity<LoginRes> naverLogin(@RequestParam String code) {
//        System.out.println("###[Naver Login] code = " + code);

        // 1. 인가코드로 Naver AccessToken 가져오기
        String naverAccessToken = authService.getNaverAccessToken(code).getAccess_token();
//        System.out.println("###[Naver Login] naverAccessToken = " + naverAccessToken);

        // 2. Naver AccessToken으로 회원정보 가져오기
        String email = authService.getNaverUserInfo(naverAccessToken);
//        System.out.println("###[Naver Login] User email = " + email);

        // 3. 기존 회원과 신입 회원 구분하기
        LoginRes loginRes = authService.isExistUser(email, "naver");
//        System.out.println("###[Naver Login] LoginRes.email = " + loginRes.getEmail() + " / LoginRes.type = " + loginRes.getType());

        return ResponseEntity.status(200).body(loginRes);
    }
}
