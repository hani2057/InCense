package com.suyang.incense.api.controller;


import com.suyang.incense.api.request.test.TestResultDto;
import com.suyang.incense.api.service.test.TestService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Api(value = "테스트 API", tags = {"Test"})
@CrossOrigin("*")
@RequiredArgsConstructor
@RequestMapping("/test")
@RestController
public class TestController {
    private final TestService testService;

    @ApiOperation(value = "취향 테스트 하기")
    @ApiResponses(value = {@ApiResponse(responseCode = "200",description = "성공",
            content = @Content(schema = @Schema(implementation = String.class)))})
    @PostMapping(path="")
    public ResponseEntity<String> startTest(@RequestBody List<Integer> testAnswer) throws Exception {

        String url = "";

        ResponseEntity<TestResultDto> response = testService.getPreferenceData(url, testAnswer);

        if(response.getStatusCode() == HttpStatus.OK){
            //DB에 데이터 넣고 성공 처리
            TestResultDto testResult = response.getBody();
            System.out.println("성공적으로 데이터 받아옴!!!!!!!!!!!!!!!!!!!");
            System.out.println("preference...............: " +testResult.getPreference());
        } else{
            return ResponseEntity.status(500).body("data response fail....");
        }

        return ResponseEntity.ok("success");
    }

}
