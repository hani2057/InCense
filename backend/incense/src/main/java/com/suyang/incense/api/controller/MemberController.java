package com.suyang.incense.api.controller;

import com.suyang.incense.api.request.member.MemberRegisterReq;
import com.suyang.incense.api.response.member.NicknameCheckRes;
import com.suyang.incense.api.response.member.RegisterInfoRes;
import com.suyang.incense.api.service.member.AuthService;
import com.suyang.incense.api.service.member.MemberService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Api(value = "사용자 API", tags = {"Member"})
@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
@RequestMapping("/member")
public class MemberController {

    private final MemberService memberService;
    private final AuthService authService;

    @PostMapping("/register")
    @ApiOperation(value = "회원가입", notes = "사용자 정보를 입력받아 회원가입 진행")
    public ResponseEntity<RegisterInfoRes> registerMember(@RequestBody MemberRegisterReq registerInfo) {
        memberService.registerMember(registerInfo);
        RegisterInfoRes response = new RegisterInfoRes(authService.getToken(registerInfo.getEmail()));
        return ResponseEntity.status(200).body(response);
    }

    @GetMapping("/nickname/check")
    @ApiOperation(value = "닉네임 중복 체크", notes = "중복된 닉네임은 사용 불가능 (true 사용 가능, false 사용 불가능)")
    public ResponseEntity<NicknameCheckRes> nicknameCheck(@RequestParam String nickname) {
        NicknameCheckRes response = new NicknameCheckRes(memberService.isPossibleNickname(nickname));
        return ResponseEntity.status(200).body(response);
    }

}
