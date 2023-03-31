package com.suyang.incense.api.service.test;

import com.suyang.incense.api.request.test.TestResultDto;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface TestService {

    ResponseEntity<TestResultDto> getPreferenceData(String url, List<Integer> testAnswer);

    boolean savePreference(Long memberId, TestResultDto testResultDto);
}
