package com.suyang.incense.api.controller;

import com.suyang.incense.api.response.analysis.CloudDto;
import com.suyang.incense.api.response.analysis.NoteGraphDto;
import com.suyang.incense.api.response.analysis.PerfumePredictDto;
import com.suyang.incense.api.response.analysis.PredictRes;
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
        String path = "/ml/update";

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
        String path = "/ml/word";

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
        String path = "/ml/graph";

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
        String path = "/ml/predict/want";

        Long memberId = authService.getIdByAuthentication(authentication);

        ResponseEntity<PerfumePredictDto> response = analysisService.getSimilarityOfWantPerfume(path, memberId);

        return getResponseEntity(response);
    }

    @ApiOperation(value = "전체 향수 취향 일치도 조회")
    @GetMapping("/all/similarity")
    public ResponseEntity<?> getPredictOfAllPerfume(@ApiIgnore Authentication authentication) {

        //flask server api uri
        String path = "/ml/predict/all";

        Long memberId = authService.getIdByAuthentication(authentication);

        ResponseEntity<PerfumePredictDto> response = analysisService.getPredictOfAllPerfume(path, memberId);

        return getResponseEntity(response);
    }

    private ResponseEntity<?> getResponseEntity(ResponseEntity<PerfumePredictDto> response) {
        if(response.getStatusCode() == HttpStatus.OK){

            List<PredictRes> result = new ArrayList<>();

            List<PerfumePredictDto.PerfumePredict> list = Objects.requireNonNull(response.getBody()).getResult();
            for(PerfumePredictDto.PerfumePredict data : list){
                PredictRes predictRes = new PredictRes();

                predictRes.setPerfumeId(data.getPerfumeIndex());
                predictRes.setPredict(data.getPredict());

                PerfumeSimpleRes perfumeSimpleRes = perfumeService.getPerfumeNameAndBrand(data.getPerfumeIndex());

                predictRes.setPerfumeName(perfumeSimpleRes.getPerfumeName());
                predictRes.setPerfumeBrand(perfumeSimpleRes.getPerfumeBrand());
                predictRes.setImage(perfumeSimpleRes.getImage());

                result.add(predictRes);
            }

            return ResponseEntity.status(200).body(result);

        } else{
            return ResponseEntity.status(500).body("data response fail......");
        }
    }
}
