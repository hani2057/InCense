package com.suyang.incense.db.repository.alarm;


import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import static com.suyang.incense.db.entity.relation.QMemberPerfumeAlarm.memberPerfumeAlarm;

@RequiredArgsConstructor
@Repository
public class MemberAlarmPerfumeCustomRepositoryImpl implements MemberAlarmPerfumeCustomRepository {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public long removeMemberPerfumeAlarm(Long perfumeId, Long memberId){
        return jpaQueryFactory.delete(memberPerfumeAlarm)
                .where(memberPerfumeAlarm.member.id.eq(memberId), memberPerfumeAlarm.perfume.id.eq(perfumeId))
                .execute();
    }

    @Override
    public long getIsAlarm(Long perfumeId, Long memberId){
        return jpaQueryFactory.select(memberPerfumeAlarm.count())
                .from(memberPerfumeAlarm)
                .where(memberPerfumeAlarm.member.id.eq(memberId), memberPerfumeAlarm.perfume.id.eq(perfumeId))
                .fetchOne();
    }


}
