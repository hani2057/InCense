package com.suyang.incense.api.service.member;

import com.suyang.incense.api.request.member.MemberRegisterReq;
import com.suyang.incense.db.entity.member.Member;
import com.suyang.incense.db.entity.member.Role;
import com.suyang.incense.db.entity.member.SocialType;
import com.suyang.incense.db.repository.member.GradeRepository;
import com.suyang.incense.db.repository.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final GradeRepository gradeRepository;

    @Override
    public void registerMember(MemberRegisterReq registerInfo) {
        // 회원 정보 저장
        SocialType type = null;
        if(registerInfo.getType().equals("kakao")) type = SocialType.kakao;
        else type = SocialType.naver;

        Member member = Member.builder()
                .grade(gradeRepository.findById(1L).get())
                .email(registerInfo.getEmail())
                .role(Role.ROLE_USER)
                .type(type)
                .nickname(registerInfo.getNickname())
                .gender(registerInfo.getGender())
                .birth(registerInfo.getBirth())
                .birthOpen(registerInfo.getBirthOpen())
                .genderOpen(registerInfo.getGenderOpen())
                .alarmOpen(registerInfo.getAlarmOpen())
                .build();
        memberRepository.save(member);
    }

    @Override
    public Member getMemeberByEmail(String email) {
        return memberRepository.findByEmail(email).get();
    }
}
