package com.suyang.incense.api.service.alarm;

import com.suyang.incense.db.entity.deal.Deal;
import com.suyang.incense.db.entity.member.AlarmSend;
import com.suyang.incense.db.entity.member.Member;
import com.suyang.incense.db.entity.perfume.Perfume;

import java.util.List;

public interface AlarmService {

    public void sendAlarmToAllMembers( Deal deal);

    void setMemberAlarmPerfume(Long perfumeId, Long memberId);

    void deleteMemberAlarmPerfume(Long perfumeId, Long memberId);

    long getIsAlarm(Long perfumeId, Long memberId);

    List<AlarmSend> getAlarmSendList(Long memberId);

    void readAlarm(Long alarmSendId);

    void deleteAlarmSend(Long alarmSendId);

    void readAlarmAll(Long memberId);
}
