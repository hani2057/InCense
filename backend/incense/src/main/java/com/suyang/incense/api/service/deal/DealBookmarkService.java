package com.suyang.incense.api.service.deal;

public interface DealBookmarkService {

    Boolean setBookmarkStatus(Long dealId, Long memberId);

    Boolean getBookmarkStatus(Long dealId, Long memberId);
}
