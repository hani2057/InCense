package com.suyang.incense.api.controller;


import com.suyang.incense.api.response.test.TestResultDto;
import com.suyang.incense.api.service.member.AuthService;
import com.suyang.incense.api.service.member.MemberService;
import com.suyang.incense.api.service.test.TestService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;

@Api(value = "테스트 API", tags = {"Test"})
@CrossOrigin("*")
@RequiredArgsConstructor
@RequestMapping("/test")
@RestController
public class TestController {
    private final TestService testService;
    private final AuthService authService;
    private final MemberService memberService;

    @ApiOperation(value = "취향 테스트 하기")
    @ApiResponses(value = {@ApiResponse(responseCode = "200",description = "성공",
            content = @Content(schema = @Schema(implementation = String.class)))})
    @PostMapping(path="")
    public ResponseEntity<String> startTest(
            @RequestBody List<Integer> testAnswer,
            @ApiIgnore Authentication authentication) throws Exception {

        //flask server api uri
        String path = "/ml/result";

        Long memberId = authService.getIdByAuthentication(authentication);

        for(Integer i : testAnswer){
            System.out.print(i + " ");
        }

        ResponseEntity<TestResultDto> response = testService.getPreferenceData(path, testAnswer, memberId);

        if(response.getStatusCode() == HttpStatus.OK){
            //DB에 데이터 넣고 성공 처리
            TestResultDto testResult = response.getBody();

            if(!testService.savePreference(memberId, testResult)){
                return ResponseEntity.status(500).body("data save fail.....");
            }

        } else{
            return ResponseEntity.status(500).body("data response fail.....");
        }

        if(testService.isFirstTester(memberId)){
            memberService.addRank(4, memberId);
        }

        return ResponseEntity.ok("success");
    }

}
