package com.suyang.incense.db.repository.member;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.suyang.incense.api.response.member.mypage.ReviewRes;
import com.suyang.incense.db.entity.member.Member;
import com.suyang.incense.db.entity.perfume.Perfume;
import com.suyang.incense.db.entity.review.Review;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.suyang.incense.db.entity.perfume.QBrand.brand;
import static com.suyang.incense.db.entity.perfume.QPerfume.perfume;
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

    @Override
    public List<ReviewRes> getReviewByMember(Member member) {
        return jpaQueryFactory
                .select(Projections.constructor(
                        ReviewRes.class,
                        perfume.id,
                        brand.name,
                        perfume.name,
                        review.preference,
                        review.comment,
                        review.modifiedDate
                ))
                .from(perfume, brand, review)
                .where(review.member.eq(member), review.perfume.eq(perfume), perfume.brand.eq(brand))
                .fetch();
    }

}
