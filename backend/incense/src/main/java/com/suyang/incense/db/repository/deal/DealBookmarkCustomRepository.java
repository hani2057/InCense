package com.suyang.incense.db.repository.deal;

import com.suyang.incense.api.response.member.mypage.BookmarkRes;
import com.suyang.incense.db.entity.relation.MemberDealBookmark;

import java.util.List;

public interface DealBookmarkCustomRepository {

    MemberDealBookmark findByDealIdAndMemberId(Long dealId, Long memberId);
    List<BookmarkRes> getBookmarkByMember(Long memberId);
}
