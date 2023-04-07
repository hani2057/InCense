package com.suyang.incense.db.repository.taste;

import com.suyang.incense.db.entity.analysis.Taste;
import com.suyang.incense.db.entity.member.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TasteRepository extends JpaRepository<Taste, Long>, TasteCustomRepository {

    List<Taste> findByMemberOrderByIdDesc(Member member);
}
