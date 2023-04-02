package com.suyang.incense.db.repository.member;

import com.suyang.incense.db.entity.member.Member;
import com.suyang.incense.db.entity.perfume.Perfume;
import com.suyang.incense.db.entity.relation.MemberPerfume;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberPerfumeRepository extends JpaRepository<MemberPerfume, Long>, MemberPerfumeCustomRepository {

    Optional<MemberPerfume> findById(Long id);
    Optional<MemberPerfume> findByMemberAndPerfume(Member member, Perfume perfume);

}
