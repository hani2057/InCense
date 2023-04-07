package com.suyang.incense.api.service.analysis;


import com.suyang.incense.api.request.analysis.UpdateTasteReq;
import com.suyang.incense.api.request.analysis.WantPredictReq;
import com.suyang.incense.api.response.analysis.CloudDto;
import com.suyang.incense.api.response.analysis.NoteGraphDto;
import com.suyang.incense.api.response.analysis.PerfumePredictDto;
import com.suyang.incense.api.response.test.TestResultDto;
import com.suyang.incense.db.repository.taste.TasteRepository;
import com.suyang.incense.db.repository.member.MemberPerfumeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AnalysisServiceImpl implements AnalysisService{

    private final TasteRepository tasteRepository;
    private final MemberPerfumeRepository memberPerfumeRepository;

    public ResponseEntity<CloudDto> getWordCloudDataOfMine(String path, Long memberId) {

        URI uri = UriComponentsBuilder
                .fromUriString("http://j8a804.p.ssafy.io:5000")
                .path(path)
                .encode()
                .build()
                .toUri();

        String preference = tasteRepository.getPreferenceByMemberId(memberId);

        Map<String, String> requestBody = new HashMap<>();
        requestBody.put("preference", preference);

        RequestEntity<Map<String, String>> requestEntity = RequestEntity
                .post(uri)
                .accept(MediaType.APPLICATION_JSON)
                .body(requestBody);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<CloudDto> responseEntity = restTemplate.exchange(requestEntity, CloudDto.class);

        return responseEntity;
    }

    public ResponseEntity<NoteGraphDto> getNoteGraphDataOfMine(String path, Long memberId) {

        URI uri = UriComponentsBuilder
                .fromUriString("http://j8a804.p.ssafy.io:5000")
                .path(path)
                .encode()
                .build()
                .toUri();

        String preference = tasteRepository.getPreferenceByMemberId(memberId);

        Map<String, String> requestBody = new HashMap<>();
        requestBody.put("preference", preference);

        RequestEntity<Map<String, String>> requestEntity = RequestEntity
                .post(uri)
                .accept(MediaType.APPLICATION_JSON)
                .body(requestBody);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<NoteGraphDto> responseEntity = restTemplate.exchange(requestEntity, NoteGraphDto.class);

        return responseEntity;
    }

    public ResponseEntity<TestResultDto> updateTaste(String path, Long memberId) {

        URI uri = UriComponentsBuilder
                .fromUriString("http://j8a804.p.ssafy.io:5000")
                .path(path)
                .encode()
                .build()
                .toUri();

        List<UpdateTasteReq> updateTasteReq = memberPerfumeRepository.getHaveHadPerfumeAndScore(memberId);

        Map<String, List<UpdateTasteReq>> requestMap = new HashMap<>();
        requestMap.put("perfumes", updateTasteReq);

        RequestEntity<Map<String, List<UpdateTasteReq>>> requestEntity = RequestEntity
                .post(uri)
                .accept(MediaType.APPLICATION_JSON)
                .body(requestMap);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<TestResultDto> responseEntity = restTemplate.exchange(requestEntity, TestResultDto.class);

        return responseEntity;
    }

    public ResponseEntity<PerfumePredictDto> getSimilarityOfWantPerfume(String path, Long memberId) {

        URI uri = UriComponentsBuilder
                .fromUriString("http://j8a804.p.ssafy.io:5000")
                .path(path)
                .encode()
                .build()
                .toUri();

        String preference = tasteRepository.getPreferenceByMemberId(memberId);
        List<Long> wantPerfume = memberPerfumeRepository.getWantPerfumeId(memberId);

        WantPredictReq request = new WantPredictReq();
        request.setPreference(preference);
        request.setWantPerfume(wantPerfume);

        RequestEntity<WantPredictReq> requestEntity = RequestEntity
                .post(uri)
                .accept(MediaType.APPLICATION_JSON)
                .body(request);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<PerfumePredictDto> responseEntity = restTemplate.exchange(requestEntity, PerfumePredictDto.class);

        return responseEntity;
    }

    public ResponseEntity<PerfumePredictDto> getPredictOfAllPerfume(String path, Long memberId) {

        URI uri = UriComponentsBuilder
                .fromUriString("http://j8a804.p.ssafy.io:5000")
                .path(path)
                .encode()
                .build()
                .toUri();

        String preference = tasteRepository.getPreferenceByMemberId(memberId);

        Map<String, String> requestBody = new HashMap<>();
        requestBody.put("preference", preference);

        RequestEntity<Map<String, String>> requestEntity = RequestEntity
                .post(uri)
                .accept(MediaType.APPLICATION_JSON)
                .body(requestBody);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<PerfumePredictDto> responseEntity = restTemplate.exchange(requestEntity, PerfumePredictDto.class);

        return responseEntity;
    }
}
