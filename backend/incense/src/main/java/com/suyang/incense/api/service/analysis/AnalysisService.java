package com.suyang.incense.api.service.analysis;

import com.suyang.incense.api.response.analysis.CloudDto;
import com.suyang.incense.api.response.analysis.NoteGraphDto;
import com.suyang.incense.api.response.analysis.WantPerfumePredictDto;
import com.suyang.incense.api.response.test.TestResultDto;
import org.springframework.http.ResponseEntity;

public interface AnalysisService {

    ResponseEntity<CloudDto> getWordCloudDataOfMine(String path, Long memberId);

    ResponseEntity<NoteGraphDto> getNoteGraphDataOfMine(String path, Long memberId);

    ResponseEntity<TestResultDto> updateTaste(String path, Long memberId);

    ResponseEntity<WantPerfumePredictDto> getSimilarityOfWantPerfume(String path, Long memberId);
}
