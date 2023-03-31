package com.suyang.incense.api.service.test;


import com.suyang.incense.api.request.test.TestResultDto;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class TestServiceImpl implements TestService{

    public ResponseEntity<TestResultDto> getPreferenceData(String url, List<Integer> testAnswer) {

        RestTemplate restTemplate = new RestTemplate();

        //Header set
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);

        //Body set : 사용자로부터 받은 테스트 데이터
        MultiValueMap<String, List<Integer>> body = new LinkedMultiValueMap<>();
        body.add("choose", testAnswer);

        //Message
        HttpEntity<?> requestMessage = new HttpEntity<>(body, httpHeaders);

        //Request
        ResponseEntity<TestResultDto> response = restTemplate.postForEntity(url, requestMessage, TestResultDto.class);

        return response;
    }

    @Override
    public boolean savePreference(Long memberId, TestResultDto testResultDto) {
        return false;
    }
}
