package com.suyang.incense.api.service.member;

import com.suyang.incense.api.response.member.mypage.PerfumeRes;
import com.suyang.incense.db.repository.member.MemberPerfumeCustomRepository;
import com.suyang.incense.db.repository.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MyPageServiceImpl implements MyPageService{

    public final MemberPerfumeCustomRepository memberPerfumeCustomRepository;
    private final MemberRepository memberRepository;
    private final AuthService authService;

    @Override
    public List<PerfumeRes> getMyPerfume(String type, Authentication authentication) {
        Long memberId = authService.getIdByAuthentication(authentication);
        return memberPerfumeCustomRepository.getMyPerfume(type, memberId);
    }
}
