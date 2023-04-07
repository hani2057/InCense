package com.suyang.incense.api.controller;


import com.suyang.incense.api.response.perfume.PerfumeReviewRes;
import com.suyang.incense.api.service.member.ReviewService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.properties.bind.DefaultValue;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(value = "리뷰 Api", tags = {"Review"})
@CrossOrigin("*")
@RequiredArgsConstructor
@RestController
public class ReviewController {

    private final ReviewService reviewService;
    private final int PAGE_CNT = 5;
    @GetMapping("perfume/{perfume_id}/review")
    public ResponseEntity<Page<PerfumeReviewRes>> getPerfumeReviewList(@PathVariable("perfume_id") Long perfumeId, @RequestParam(defaultValue = "0") int page){
        Pageable pageable = PageRequest.of(page-1<0?0:page-1,PAGE_CNT);
        Long totalCount = reviewService.getPerfumeReviewCount(perfumeId,pageable);
        List<PerfumeReviewRes> perfumeReviewResList = reviewService.getPerfumeReviewResList(perfumeId,pageable);
        Page<PerfumeReviewRes> perfumeResPages= PageableExecutionUtils.getPage(perfumeReviewResList, pageable, () -> totalCount);
        return ResponseEntity.ok(perfumeResPages);
    }


}
