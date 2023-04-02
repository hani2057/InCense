package com.suyang.incense.api.controller;


import com.suyang.incense.api.response.analysis.CloudDto;
import com.suyang.incense.api.response.analysis.NoteGraphDto;
import com.suyang.incense.api.response.analysis.WantPerfumePredictDto;
import com.suyang.incense.api.response.analysis.WantPredictRes;
import com.suyang.incense.api.response.perfume.PerfumeSimpleRes;
import com.suyang.incense.api.response.test.TestResultDto;
import com.suyang.incense.api.service.analysis.AnalysisService;
import com.suyang.incense.api.service.member.AuthService;
import com.suyang.incense.api.service.perfume.PerfumeService;
import com.suyang.incense.api.service.test.TestService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Api(value = "분석 API", tags = {"Analysis"})
@CrossOrigin("*")
@RequiredArgsConstructor
@RequestMapping("/analysis")
@RestController
public class AnalysisController {

    private final AnalysisService analysisService;
    private final AuthService authService;
    private final TestService testService;
    private final PerfumeService perfumeService;

    @ApiOperation(value = "취향 반영하기(업데이트)")
    @GetMapping("/update")
    public ResponseEntity<?> updateTaste(@ApiIgnore Authentication authentication) {

        //flask server api uri
        String path = "/api/ml/update";

        Long memberId = authService.getIdByAuthentication(authentication);

        ResponseEntity<TestResultDto> response = analysisService.updateTaste(path, memberId);

        if(response.getStatusCode() == HttpStatus.OK){
            TestResultDto testResult = response.getBody();

            if(!testService.savePreference(memberId, testResult)){
                return ResponseEntity.status(500).body("data save fail.....");
            }
        } else{
            return ResponseEntity.status(500).body("data response fail.....");
        }
        return ResponseEntity.ok("success");
    }

    @ApiOperation(value = "노트 워드 클라우드 데이터 조회")
    @GetMapping("/word-cloud")
    public ResponseEntity<?> getWordCloudData(@ApiIgnore Authentication authentication) {

        //flask server api uri
        String path = "/api/ml/word";

        Long memberId = authService.getIdByAuthentication(authentication);

        ResponseEntity<CloudDto> response = analysisService.getWordCloudDataOfMine(path, memberId);

        if(response.getStatusCode() == HttpStatus.OK){
            return ResponseEntity.status(200).body(response.getBody());
        } else{
            return ResponseEntity.status(500).body("data response fail......");
        }
    }

    @ApiOperation(value = "노트 그래프 데이터 조회")
    @GetMapping("/note-graph")
    public ResponseEntity<?> getNoteGraphData(@ApiIgnore Authentication authentication) {

        //flask server api uri
        String path = "/api/ml/graph";

        Long memberId = authService.getIdByAuthentication(authentication);

        ResponseEntity<NoteGraphDto> response = analysisService.getNoteGraphDataOfMine(path, memberId);

        if(response.getStatusCode() == HttpStatus.OK){
            return ResponseEntity.status(200).body(response.getBody());
        } else{
            return ResponseEntity.status(500).body("data response fail......");
        }
    }

    @ApiOperation(value = "WANT 향수 취향 일치도 조회")
    @GetMapping("/want/similarity")
    public ResponseEntity<?> getSimilarityOfWant(@ApiIgnore Authentication authentication) {

        //flask server api uri
        String path = "/api/ml/predict/want";

        Long memberId = authService.getIdByAuthentication(authentication);

        ResponseEntity<WantPerfumePredictDto> response = analysisService.getSimilarityOfWantPerfume(path, memberId);

        if(response.getStatusCode() == HttpStatus.OK){

            List<WantPredictRes> result = new ArrayList<>();

            List<WantPerfumePredictDto.PerfumePredict> list = Objects.requireNonNull(response.getBody()).getResult();
            for(WantPerfumePredictDto.PerfumePredict data : list){
                WantPredictRes wantPredictRes = new WantPredictRes();

                wantPredictRes.setPerfumeId(data.getPerfumeIndex());
                wantPredictRes.setPredict(data.getPredict());

                PerfumeSimpleRes perfumeSimpleRes = perfumeService.getPerfumeNameAndBrand(data.getPerfumeIndex());

                wantPredictRes.setPerfumeName(perfumeSimpleRes.getPerfumeName());
                wantPredictRes.setPerfumeBrand(perfumeSimpleRes.getPerfumeBrand());

                result.add(wantPredictRes);
            }

            return ResponseEntity.status(200).body(result);

        } else{
            return ResponseEntity.status(500).body("data response fail......");
        }
    }


}
