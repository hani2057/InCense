package com.suyang.incense.db.repository.member;

import com.suyang.incense.api.request.analysis.UpdateTasteReq;
import com.suyang.incense.api.response.member.mypage.PerfumeRes;

import java.util.List;
import java.util.Optional;

public interface MemberPerfumeCustomRepository {

    List<PerfumeRes> getMyWantPerfume(Long memberId);
    List<PerfumeRes> getMyHaveHadPerfume(String type, Long memberId);

    List<UpdateTasteReq> getHaveHadPerfumeAndScore(Long memberId);

    List<Long> getWantPerfumeId(Long memberId);
}
