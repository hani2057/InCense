package com.suyang.incense.api.service.member;

import com.suyang.incense.db.entity.member.Grade;
import com.suyang.incense.db.entity.member.Member;
import com.suyang.incense.db.entity.member.Role;
import com.suyang.incense.db.entity.member.SocialType;
import com.suyang.incense.db.repository.member.GradeRepository;
import com.suyang.incense.db.repository.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Objects;


@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final GradeRepository gradeRepository;

    @Override
    public void registerMember(String email, String type) {
        // 회원 정보 저장
        Member member = new Member();
        member.setEmail(email);
        member.setRole(Role.ROLE_GUEST);
        member.setGrade(gradeRepository.findById(1L).get());
        if(type.equals("kakao")) member.setType(SocialType.kakao);
        else if (type.equals("naver")) member.setType(SocialType.naver);
        memberRepository.save(member);
    }
}
