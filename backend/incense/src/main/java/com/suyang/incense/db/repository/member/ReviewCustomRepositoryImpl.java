package com.suyang.incense.db.repository.member;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.suyang.incense.api.response.member.mypage.ReviewRes;
import com.suyang.incense.api.response.perfume.PerfumeReviewRes;
import com.suyang.incense.db.entity.member.Member;
import com.suyang.incense.db.entity.perfume.Perfume;
import com.suyang.incense.db.entity.review.Review;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;


import java.util.List;

import static com.suyang.incense.db.entity.member.QMember.member;
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
                        review.perfume.id,
                        review.id,
                        review.perfume.brand.name,
                        review.perfume.name,
                        review.perfume.image,
                        review.preference,
                        review.comment,
                        review.modifiedDate
                ))
                .from(review)
                .where(review.member.eq(member))
                .fetch();
    }


    @Override
    public List<PerfumeReviewRes> getPerfumeReview(Long perfumeId, Pageable pageable){
        return jpaQueryFactory
                .select(Projections.constructor(
                        PerfumeReviewRes.class,
                        review.member.nickname,
                        review.preference,
                        review.comment
                ))
                .from(review)
                .join(review.perfume,perfume)
                .join(review.member,member)
                .where(review.perfume.id.eq(perfumeId))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

    }


    @Override
    public Long getPerfumeReviewCount(Long perfumeId, Pageable pageable){
        return jpaQueryFactory
                .select(review.id.count())
                .from(review)
                .where(review.perfume.id.eq(perfumeId))
                .fetchOne();

    }


}
