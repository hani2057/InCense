package com.suyang.incense.api.service.member;

import com.suyang.incense.api.response.perfume.PerfumeReviewRes;
import com.suyang.incense.db.repository.member.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.*;

@RequiredArgsConstructor
@Service
public class ReviewServiceImpl implements ReviewService{

    private final ReviewRepository reviewRepository;
    @Override
    public List<PerfumeReviewRes> getPerfumeReviewResList(Long perfumeId, Pageable pageable){
       return reviewRepository.getPerfumeReview(perfumeId,pageable);
    }

    @Override
    public Long getPerfumeReviewCount(Long perfumeId, Pageable pageable) {
        return reviewRepository.getPerfumeReviewCount(perfumeId,pageable);
    }


}
