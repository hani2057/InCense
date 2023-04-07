package com.suyang.incense.api.service.member;

import com.suyang.incense.api.response.perfume.PerfumeReviewRes;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ReviewService {
    List<PerfumeReviewRes> getPerfumeReviewResList(Long perfumeId, Pageable pageable);
    Long getPerfumeReviewCount(Long perfumeId, Pageable pageable);
}
