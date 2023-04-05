package com.suyang.incense.api.controller;

import com.suyang.incense.api.request.member.MemberInfoModifyReq;
import com.suyang.incense.api.request.member.MemberProfileModifyReq;
import com.suyang.incense.api.request.member.MemberRegisterReq;
import com.suyang.incense.api.response.member.MemberInfoRes;
import com.suyang.incense.api.response.member.NicknameCheckRes;
import com.suyang.incense.api.response.member.RegisterInfoRes;
import com.suyang.incense.common.util.BaseResponseBody;
import org.springframework.security.core.Authentication;
import com.suyang.incense.api.service.member.AuthService;
import com.suyang.incense.api.service.member.MemberService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.io.IOException;

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
        RegisterInfoRes response = memberService.registerMember(registerInfo);
        return ResponseEntity.status(200).body(response);
    }

    @GetMapping("/nickname/check")
    @ApiOperation(value = "닉네임 중복 체크", notes = "중복된 닉네임은 사용 불가능 (true 사용 가능, false 사용 불가능)")
    public ResponseEntity<NicknameCheckRes> nicknameCheck(@RequestParam String nickname) {
        NicknameCheckRes response = new NicknameCheckRes(memberService.isPossibleNickname(nickname));
        return ResponseEntity.status(200).body(response);
    }

    @GetMapping("/info")
    @ApiOperation(value = "회원정보 조회", notes = "로그인한 회원의 전체 회원정보를 조회")
    public ResponseEntity<MemberInfoRes> MemberInfo(@ApiIgnore Authentication authentication) {
        MemberInfoRes response = memberService.getMemberInfo(authentication);
        return ResponseEntity.status(200).body(response);
    }

    @PutMapping(path = "/modify/info")
    @ApiOperation(value = "회원 정보 변경", notes = "로그인한 회원의 개인 정보를 변경")
    public ResponseEntity<? extends BaseResponseBody> modifyMemberInfo(@RequestBody MemberInfoModifyReq memberInfoModifyReq,
                                                                       @ApiIgnore Authentication authentication) throws IOException {
        memberService.modifyMemberInfo(memberInfoModifyReq, authentication);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @PutMapping(path = "/modify/profile", consumes = {"multipart/form-data"})
    @ApiOperation(value = "회원 프로필 정보 변경", notes = "로그인한 회원의 프로필 이미지 정보를 변경")
    public ResponseEntity<? extends BaseResponseBody> modifyMemberProfile(@ModelAttribute MemberProfileModifyReq memberProfileModifyReq,
                                                                          @ApiIgnore Authentication authentication) throws IOException {
        memberService.modifyMemberProfile(memberProfileModifyReq, authentication);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

//    @PostMapping("/rank/add")
//    @ApiOperation(value = "점수 로그 작성", notes = "점수 추가")
//    public ResponseEntity<? extends BaseResponseBody> temp(@RequestParam int type, @RequestParam Long memberId) {
//        memberService.addRank(type, memberId);
//        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
//    }

}
