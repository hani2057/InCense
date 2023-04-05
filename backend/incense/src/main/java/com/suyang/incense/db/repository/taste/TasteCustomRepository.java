package com.suyang.incense.db.repository.taste;

public interface TasteCustomRepository {

    String getPreferenceByMemberId(Long memberId);

    Long getTestCount(Long memberId);
}
