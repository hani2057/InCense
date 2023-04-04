package com.suyang.incense.api.service.test;


import com.suyang.incense.api.request.test.TestReq;
import com.suyang.incense.api.response.test.TestResultDto;
import com.suyang.incense.db.entity.analysis.Taste;
import com.suyang.incense.db.entity.member.Member;
import com.suyang.incense.db.repository.deal.TasteRepository;
import com.suyang.incense.db.repository.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class TestServiceImpl implements TestService{

    private final TasteRepository tasteRepository;
    private final MemberRepository memberRepository;

    public ResponseEntity<TestResultDto> getPreferenceData(String path, List<Integer> testAnswer, Long memberId) {

        System.out.println("Service 시작.............................getPreferenceData.....................");
        for(Integer i : testAnswer){
            System.out.print(i + " ");
        }

        URI uri = UriComponentsBuilder
                .fromUriString("http://j8a804.p.ssafy.io:5000")
//                .fromUriString("http://localhost:8081")
                .path(path)
                .encode()
                .build()
                .toUri();

        String pastPreference = tasteRepository.getPreferenceByMemberId(memberId);

        TestReq testRequest = new TestReq();
        testRequest.setChoose(testAnswer);
        testRequest.setPastPreference(Objects.requireNonNullElse(pastPreference, ""));

        //REQUEST
        System.out.println("test Request......................................................");
        System.out.println("choose: " + testRequest.getChoose());
        System.out.println("past preference: " + testRequest.getPastPreference());

        RequestEntity<TestReq> requestEntity = RequestEntity
                .post(uri)
                .accept(MediaType.APPLICATION_JSON)
                .body(testRequest);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<TestResultDto> responseEntity = restTemplate.exchange(requestEntity, TestResultDto.class);

        return responseEntity;

    }

    public boolean savePreference(Long memberId, TestResultDto testResultDto) {

        Taste taste = new Taste();

        Member member = memberRepository.findById(memberId).orElseThrow(IllegalArgumentException::new);
        taste.setMember(member);
        taste.setPreference(testResultDto.getPreference());

        tasteRepository.save(taste);

        return true;
    }
}
