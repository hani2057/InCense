package com.suyang.incense.db.repository.deal;

import com.suyang.incense.db.entity.relation.MemberDealBookmark;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DealBookmarkRepository extends JpaRepository<MemberDealBookmark, Long>, DealBookmarkCustomRepository {


}
