package com.suyang.incense.api.controller;


import com.suyang.incense.api.response.analysis.AnalysisRes;
import com.suyang.incense.api.service.analysis.AnalysisService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Api(value = "분석 API", tags = {"Analysis"})
@CrossOrigin("*")
@RequiredArgsConstructor
@RequestMapping("/analysis")
@RestController
public class AnalysisController {

    private final AnalysisService analysisService;

    @ApiOperation(value = "내 분석 하기")
    @ApiResponses(value = {@ApiResponse(responseCode = "200",description = "성공",
            content = @Content(schema = @Schema(implementation = ResponseEntity.class)))})
    @PostMapping(path="")
    public ResponseEntity<String> startAnalysis(){
        return ResponseEntity.ok("success");
    }

    @ApiOperation(value = "내 분석 결과 가져오기")
    @ApiResponses(value = {@ApiResponse(responseCode = "200",description = "성공",
            content = @Content(schema = @Schema(implementation = AnalysisRes.class)))})
    @GetMapping(path="")
    public ResponseEntity<AnalysisRes> getAnalysis(){
        AnalysisRes analysisRes = new AnalysisRes();
        return ResponseEntity.ok(analysisRes);
    }
}
