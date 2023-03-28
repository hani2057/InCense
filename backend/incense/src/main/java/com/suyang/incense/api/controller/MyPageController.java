package com.suyang.incense.api.controller;

import com.suyang.incense.api.response.member.mypage.PerfumeRes;
import com.suyang.incense.api.service.member.AuthService;
import com.suyang.incense.api.service.member.MemberService;
import com.suyang.incense.api.service.member.MyPageService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;

@Api(value = "마이페이지 API", tags = {"My Page"})
@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
@RequestMapping("/mypage")
public class MyPageController {

    private final MemberService memberService;
    private final MyPageService myPageService;
    private final AuthService authService;

    @GetMapping("/perfume")
    @ApiOperation(value = "향수 조회", notes = "등록한 Have / Had / Want 향수 조회")
    public ResponseEntity<List<PerfumeRes>> getPerfumeList(@RequestParam String type,
                                                           @ApiIgnore Authentication authentication) {
        List<PerfumeRes> response = myPageService.getMyPerfume(type, authentication);
        return ResponseEntity.status(200).body(response);
    }
}
