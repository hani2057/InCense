package com.suyang.incense.api.service.member;

import com.suyang.incense.api.response.member.mypage.PerfumeRes;

import java.util.List;

public interface MyPageService {

    List<PerfumeRes> getMyPerfume(String type, Long memberId);
}
