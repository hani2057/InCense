package com.suyang.incense.db.repository.member;

import com.suyang.incense.api.response.member.mypage.ReviewRes;
import com.suyang.incense.api.response.perfume.PerfumeReviewRes;
import com.suyang.incense.db.entity.member.Member;
import com.suyang.incense.db.entity.perfume.Perfume;
import com.suyang.incense.db.entity.review.Review;
import org.springframework.data.domain.Pageable;

import java.util.List;


public interface ReviewCustomRepository {

    Review getReviewByMemberAndPerfume(Member member, Perfume perfume);

    List<ReviewRes> getReviewByMember(Member member);

    List<PerfumeReviewRes> getPerfumeReview(Long perfumeId, Pageable pageable);

    Long getPerfumeReviewCount(Long perfumeId, Pageable pageable);
}
