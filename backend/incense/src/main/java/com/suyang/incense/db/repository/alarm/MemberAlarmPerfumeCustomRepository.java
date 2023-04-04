package com.suyang.incense.db.repository.alarm;

public interface MemberAlarmPerfumeCustomRepository {
    long removeMemberPerfumeAlarm(Long perfumeId, Long memberId);

    long getIsAlarm(Long perfumeId, Long memberId);
}
