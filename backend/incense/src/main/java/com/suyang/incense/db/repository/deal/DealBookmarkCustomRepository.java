package com.suyang.incense.db.repository.deal;

import com.suyang.incense.db.entity.relation.MemberDealBookmark;

public interface DealBookmarkCustomRepository {

    MemberDealBookmark findByDealIdAndMemberId(Long dealId, Long memberId);
}
