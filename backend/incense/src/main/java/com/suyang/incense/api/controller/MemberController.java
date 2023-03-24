package com.suyang.incense.api.controller;

import com.suyang.incense.api.request.member.MemberRegisterReq;
import com.suyang.incense.api.service.member.AuthService;
import com.suyang.incense.api.service.member.MemberService;
import com.suyang.incense.db.entity.member.Member;
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
    public ResponseEntity<String> registerMember(@RequestBody MemberRegisterReq registerInfo) {
        System.out.println("###registerInfo = " + registerInfo.getEmail());
        System.out.println("###registerInfo = " + registerInfo.getType());
        System.out.println("###registerInfo = " + registerInfo.getNickname());
        System.out.println("###registerInfo = " + registerInfo.getGender());
        System.out.println("###registerInfo = " + registerInfo.getBirth());

        memberService.registerMember(registerInfo);
        return ResponseEntity.status(200).body(authService.getToken(registerInfo.getEmail()));
    }

}
