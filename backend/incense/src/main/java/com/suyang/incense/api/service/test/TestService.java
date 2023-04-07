package com.suyang.incense.api.service.test;

import com.suyang.incense.api.response.test.TestResultDto;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface TestService {

    ResponseEntity<TestResultDto> getPreferenceData(String path, List<Integer> testAnswer, Long memberId);

    boolean savePreference(Long memberId, TestResultDto testResultDto);

    boolean isFirstTester(Long memberId);
}
