package com.suyang.incense.db.repository.member;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.suyang.incense.api.request.analysis.UpdateTasteReq;
import com.suyang.incense.api.response.member.mypage.PerfumeRes;
import com.suyang.incense.db.entity.relation.Category;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.suyang.incense.db.entity.relation.QMemberPerfume.memberPerfume;
import static com.suyang.incense.db.entity.relation.QMemberPerfumeAlarm.memberPerfumeAlarm;
import static com.suyang.incense.db.entity.review.QReview.review;

@Repository
public class MemberPerfumeCustomRepositoryImpl implements MemberPerfumeCustomRepository{

    @Autowired
    private JPAQueryFactory jpaQueryFactory;


    @Override
    public List<PerfumeRes> getMyWantPerfume(Long memberId) {

        List<PerfumeRes> result = jpaQueryFactory
                .select(Projections.constructor(
                        PerfumeRes.class,
                        memberPerfume.id,
                        memberPerfume.perfume.id,
                        memberPerfume.perfume.brand.name,
                        memberPerfume.perfume.name,
                        memberPerfume.perfume.image
                ))
                .from(memberPerfume)
                .where(memberPerfume.member.id.eq(memberId), memberPerfume.category.eq(Category.WANT))
                .fetch();

        for (PerfumeRes perfume : result) {
            if (jpaQueryFactory.selectFrom(memberPerfumeAlarm)
                    .where(memberPerfumeAlarm.member.id.eq(memberId),
                            memberPerfumeAlarm.perfume.id.eq(perfume.getPerfumeId()))
                    .fetchFirst() != null) {
                perfume.setAlarm(true);
            }
        }

        return result;
    }

    @Override
    public List<PerfumeRes> getMyHaveHadPerfume(String type, Long memberId) {

        List<PerfumeRes> result = jpaQueryFactory
                .select(Projections.constructor(
                        PerfumeRes.class,
                        memberPerfume.id,
                        memberPerfume.perfume.id,
                        memberPerfume.perfume.brand.name,
                        memberPerfume.perfume.name,
                        memberPerfume.perfume.image,
                        review.preference,
                        review.comment
                ))
                .from(memberPerfume, review)
                .where(memberPerfume.member.id.eq(memberId), memberPerfume.category.eq(Category.valueOf(type)),
                        review.member.id.eq(memberId), review.perfume.eq(memberPerfume.perfume))
                .fetch();

        for (PerfumeRes perfume : result) {
            if (jpaQueryFactory.selectFrom(memberPerfumeAlarm)
                    .where(memberPerfumeAlarm.member.id.eq(memberId),
                            memberPerfumeAlarm.perfume.id.eq(perfume.getPerfumeId()))
                    .fetchFirst() != null) {
                perfume.setAlarm(true);
            }
        }

        return result;
    }

    public List<UpdateTasteReq> getHaveHadPerfumeAndScore(Long memberId) {

        List<UpdateTasteReq> result = jpaQueryFactory
                .select(Projections.constructor(
                        UpdateTasteReq.class,
                        review.perfume.id,
                        review.preference
                ))
                .from(memberPerfume)
                .innerJoin(review).on(review.member.eq(memberPerfume.member).and(review.perfume.eq(memberPerfume.perfume)))
                .where(
                        memberPerfume.category.eq(Category.valueOf("HAVE"))
                                .or(memberPerfume.category.eq(Category.valueOf("HAD")))
                )
                .orderBy(review.perfume.id.desc())
                .fetch();

        return result;
    }

    public List<Long> getWantPerfumeId(Long memberId) {

        List<Long> result = jpaQueryFactory
                .select(memberPerfume.perfume.id)
                .from(memberPerfume)
                .where(memberPerfume.category.eq(Category.valueOf("WANT"))
                        .and(memberPerfume.member.id.eq(memberId))
                )
                .fetch();

        return result;
    }

}
