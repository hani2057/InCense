package com.suyang.incense.db.repository.alarm;

import com.suyang.incense.db.entity.member.AlarmSend;

import java.util.List;

public interface AlarmSendCustomRepository {
    long removeAlarmSend(Long dealId, Long memberId);

    List<AlarmSend> getAlarmSendList(Long memberId);
}
