package com.suyang.incense.api.service.analysis;


import com.suyang.incense.api.request.analysis.UpdateTasteReq;
import com.suyang.incense.api.request.analysis.WantPredictReq;
import com.suyang.incense.api.response.analysis.CloudDto;
import com.suyang.incense.api.response.analysis.NoteGraphDto;
import com.suyang.incense.api.response.analysis.WantPerfumePredictDto;
import com.suyang.incense.api.response.test.TestResultDto;
import com.suyang.incense.db.repository.deal.TasteRepository;
import com.suyang.incense.db.repository.member.MemberPerfumeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AnalysisServiceImpl implements AnalysisService{

    private final TasteRepository tasteRepository;
    private final MemberPerfumeRepository memberPerfumeRepository;

    public ResponseEntity<CloudDto> getWordCloudDataOfMine(String path, Long memberId) {

        URI uri = UriComponentsBuilder
                .fromUriString("http://j8a804.p.ssafy.io:포트번호")
                .path(path)
                .encode()
                .build()
                .toUri();

        String preference = tasteRepository.getPreferenceByMemberId(memberId);

        MultiValueMap<String, String> requestBody = new LinkedMultiValueMap<>();
        requestBody.add("preference", preference);

        RequestEntity<MultiValueMap<String, String>> requestEntity = RequestEntity
                .post(uri)
                .accept(MediaType.APPLICATION_JSON)
                .body(requestBody);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<CloudDto> responseEntity = restTemplate.exchange(requestEntity, CloudDto.class);

        return responseEntity;
    }

    public ResponseEntity<NoteGraphDto> getNoteGraphDataOfMine(String path, Long memberId) {

        URI uri = UriComponentsBuilder
                .fromUriString("http://j8a804.p.ssafy.io:포트번호")
                .path(path)
                .encode()
                .build()
                .toUri();

        String preference = tasteRepository.getPreferenceByMemberId(memberId);

        MultiValueMap<String, String> requestBody = new LinkedMultiValueMap<>();
        requestBody.add("preference", preference);

        RequestEntity<MultiValueMap<String, String>> requestEntity = RequestEntity
                .post(uri)
                .accept(MediaType.APPLICATION_JSON)
                .body(requestBody);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<NoteGraphDto> responseEntity = restTemplate.exchange(requestEntity, NoteGraphDto.class);

        return responseEntity;
    }

    public ResponseEntity<TestResultDto> updateTaste(String path, Long memberId) {

        URI uri = UriComponentsBuilder
                .fromUriString("http://j8a804.p.ssafy.io:포트번호")
                .path(path)
                .encode()
                .build()
                .toUri();

        List<UpdateTasteReq> updateTasteReq = memberPerfumeRepository.getHaveHadPerfumeAndScore(memberId);

        MultiValueMap<String, List<UpdateTasteReq>> requestMap = new LinkedMultiValueMap<>();
        requestMap.put("perfumes", Collections.singletonList(updateTasteReq));

        RequestEntity<MultiValueMap<String, List<UpdateTasteReq>>> requestEntity = RequestEntity
                .post(uri)
                .accept(MediaType.APPLICATION_JSON)
                .body(requestMap);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<TestResultDto> responseEntity = restTemplate.exchange(requestEntity, TestResultDto.class);

        return responseEntity;
    }

    public ResponseEntity<WantPerfumePredictDto> getSimilarityOfWantPerfume(String path, Long memberId) {

        URI uri = UriComponentsBuilder
                .fromUriString("http://j8a804.p.ssafy.io:포트번호")
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
        ResponseEntity<WantPerfumePredictDto> responseEntity = restTemplate.exchange(requestEntity, WantPerfumePredictDto.class);

        return responseEntity;
    }
}
