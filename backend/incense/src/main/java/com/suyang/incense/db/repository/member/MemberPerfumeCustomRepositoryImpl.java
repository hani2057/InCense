package com.suyang.incense.db.repository.member;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.suyang.incense.api.response.member.mypage.PerfumeRes;
import com.suyang.incense.db.entity.relation.Category;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.suyang.incense.db.entity.perfume.QBrand.brand;
import static com.suyang.incense.db.entity.perfume.QPerfume.perfume;
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
                        perfume.id,
                        brand.name,
                        perfume.name,
                        perfume.image
                ))
                .from(perfume, memberPerfume, brand)
                .where(perfume.id.eq(memberPerfume.perfume.id), perfume.brand.id.eq(brand.id),
                        memberPerfume.member.id.eq(memberId), memberPerfume.category.eq(Category.WANT))
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
                        perfume.id,
                        brand.name,
                        perfume.name,
                        perfume.image,
                        review.preference,
                        review.comment
                ))
                .from(perfume, memberPerfume, brand, review)
                .where(perfume.eq(memberPerfume.perfume), perfume.brand.eq(brand),
                        memberPerfume.member.id.eq(memberId), memberPerfume.category.eq(Category.valueOf(type)),
                        review.member.id.eq(memberId), review.perfume.eq(perfume))
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

}
