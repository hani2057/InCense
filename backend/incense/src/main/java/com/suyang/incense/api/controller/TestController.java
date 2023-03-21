package com.suyang.incense.api.controller;


import com.suyang.incense.api.service.test.TestService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<String> startTest(){

        return ResponseEntity.ok("success");
    }





}
