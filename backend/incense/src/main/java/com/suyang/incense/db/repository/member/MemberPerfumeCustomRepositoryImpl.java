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

@Repository
public class MemberPerfumeCustomRepositoryImpl implements MemberPerfumeCustomRepository{

    @Autowired
    private JPAQueryFactory jpaQueryFactory;


    @Override
    public List<PerfumeRes> getMyPerfume(String type, Long memberId) {

        List<PerfumeRes> result = jpaQueryFactory
                .select(Projections.constructor(
                        PerfumeRes.class,
                        perfume.id,
                        perfume.name,
                        brand.name,
                        perfume.image
                ))
                .from(perfume, memberPerfume, brand)
                .where(perfume.id.eq(memberPerfume.perfume.id), perfume.brand.id.eq(brand.id),
                        memberPerfume.member.id.eq(memberId), memberPerfume.category.eq(Category.valueOf(type)))
                .fetch();



//        select exists (
//                select member_perfume_alarm_id
//        from member_perfume_alarm
//        where member_id=1 and perfume_id=67);

//        https://suyou.tistory.com/286

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
