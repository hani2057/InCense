package com.suyang.incense.db.repository.alarm;

import com.suyang.incense.db.entity.perfume.Perfume;
import com.suyang.incense.db.entity.relation.MemberPerfumeAlarm;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberAlarmPerfumeRepository extends JpaRepository<MemberPerfumeAlarm,Long>,MemberAlarmPerfumeCustomRepository {
}
