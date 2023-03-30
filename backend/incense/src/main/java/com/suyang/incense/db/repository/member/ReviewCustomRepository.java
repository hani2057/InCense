package com.suyang.incense.db.repository.member;

import com.suyang.incense.db.entity.member.Member;
import com.suyang.incense.db.entity.perfume.Perfume;
import com.suyang.incense.db.entity.review.Review;



public interface ReviewCustomRepository {

    Review getReviewByMemberAndPerfume(Member member, Perfume perfume);
}
