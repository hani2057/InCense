package com.suyang.incense.db.repository.member;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.suyang.incense.db.entity.member.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.suyang.incense.db.entity.member.QMember.member;
import static com.suyang.incense.db.entity.perfume.QPerfume.perfume;
import static com.suyang.incense.db.entity.relation.QMemberPerfume.memberPerfume;
import static com.suyang.incense.db.entity.relation.QMemberPerfumeAlarm.memberPerfumeAlarm;

@RequiredArgsConstructor
@Repository
public class MemberCustomRepositoryImpl implements MemberCustomRepository{
    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<Member> getAlarmMembers(Long perfumeId){

        return jpaQueryFactory.select(member)
                .from(memberPerfumeAlarm)
                .innerJoin(memberPerfumeAlarm.member,member)
                .innerJoin(memberPerfumeAlarm.perfume,perfume)
                .where(perfume.id.eq(perfumeId))
                .fetch();
    }

}
