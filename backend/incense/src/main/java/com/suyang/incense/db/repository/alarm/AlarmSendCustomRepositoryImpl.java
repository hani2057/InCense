package com.suyang.incense.db.repository.alarm;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.suyang.incense.db.entity.member.AlarmSend;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.suyang.incense.db.entity.member.QAlarmSend.alarmSend;
import static com.suyang.incense.db.entity.member.QMember.member;

@RequiredArgsConstructor
@Repository
public class AlarmSendCustomRepositoryImpl implements AlarmSendCustomRepository{
    private JPAQueryFactory jpaQueryFactory;
    @Override
    public long removeAlarmSend(Long dealId, Long memberId){

        return jpaQueryFactory.delete(alarmSend)
                .where(alarmSend.deal.id.eq(dealId), alarmSend.member.id.eq(memberId))
                .execute();
    }

    @Override
    public List<AlarmSend> getAlarmSendList(Long memberId){
        return jpaQueryFactory.select(alarmSend)
                .from(alarmSend)
                .join(alarmSend.member,member)
                .where(member.id.eq(memberId)
                        ,alarmSend.isDeleted.eq((byte)0)
                )
                .fetch();
    }
}
