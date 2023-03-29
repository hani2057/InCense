package com.suyang.incense.db.repository.member;

import com.suyang.incense.db.entity.member.GradeLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GradeLogRepository extends JpaRepository<GradeLog, Long> {
}
