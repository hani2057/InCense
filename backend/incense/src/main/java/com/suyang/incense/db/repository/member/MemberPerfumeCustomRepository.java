package com.suyang.incense.db.repository.member;

import com.suyang.incense.api.response.member.mypage.PerfumeRes;

import java.util.List;

public interface MemberPerfumeCustomRepository {

    List<PerfumeRes> getMyPerfume(String type, Long memberId);
}
