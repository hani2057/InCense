package com.suyang.incense.api.service.member;

import com.suyang.incense.api.response.member.mypage.PerfumeRes;
import com.suyang.incense.db.repository.member.MemberPerfumeCustomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MyPageServiceImpl implements MyPageService{

    public final MemberPerfumeCustomRepository memberPerfumeCustomRepository;

    @Override
    public List<PerfumeRes> getMyPerfume(String type, Long memberId) {
        return memberPerfumeCustomRepository.getMyPerfume(type, memberId);
    }
}
