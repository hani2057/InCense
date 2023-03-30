package com.suyang.incense.db.repository.member;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.suyang.incense.db.entity.member.Member;
import com.suyang.incense.db.entity.perfume.Perfume;
import com.suyang.incense.db.entity.review.Review;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import static com.suyang.incense.db.entity.review.QReview.review;

@Repository
public class ReviewCustomRepositoryImpl implements ReviewCustomRepository {

    @Autowired
    private JPAQueryFactory jpaQueryFactory;

    @Override
    public Review getReviewByMemberAndPerfume(Member member, Perfume perfume) {
        return jpaQueryFactory
                .selectFrom(review)
                .where(review.member.eq(member), review.perfume.eq(perfume))
                .fetchOne();
    }
}
