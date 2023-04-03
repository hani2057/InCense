package com.suyang.incense.db.repository.alarm;

import com.suyang.incense.db.entity.member.AlarmSend;
import com.suyang.incense.db.entity.relation.MemberPerfumeAlarm;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlarmSendRepository extends JpaRepository<AlarmSend,Long>,AlarmSendCustomRepository{
}
