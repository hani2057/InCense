package com.suyang.incense.api.service.member;

import com.suyang.incense.api.request.member.MemberModifyReq;
import com.suyang.incense.api.request.member.MemberRegisterReq;
import com.suyang.incense.api.response.member.MemberInfoRes;
import com.suyang.incense.common.FileHandler;
import com.suyang.incense.db.entity.member.Grade;
import com.suyang.incense.db.entity.member.Member;
import com.suyang.incense.db.entity.member.Role;
import com.suyang.incense.db.entity.member.SocialType;
import com.suyang.incense.db.repository.member.GradeRepository;
import com.suyang.incense.db.repository.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.File;
import java.io.IOException;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final AuthService authService;
    private final MemberRepository memberRepository;
    private final GradeRepository gradeRepository;
    private final FileHandler fileHandler;

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
                .build();
        memberRepository.save(member);
    }

    @Override
    public Member getMemberByEmail(String email) {
        return memberRepository.findByEmail(email).get();
    }

    @Override
    public boolean isPossibleNickname(String nickname) {
        Optional<Member> member = memberRepository.findByNickname(nickname);
        return member.isEmpty();
    }

    @Override
    public MemberInfoRes getMemberInfo(Authentication authentication) {
        Member member = memberRepository.findById(authService.getIdByAuthentication(authentication)).get();
        Grade grade = member.getGrade();
        String profile = "";
        if(member.getProfile() == null) profile = "./images/member/default/default.png";
        return new MemberInfoRes(grade.getName(), grade.getImage(), member.getNickname(), member.getGender(),
                member.getBirth(), profile, member.getBirthOpen(), member.getGenderOpen(), member.getAlarmOpen());
    }

    @Override
    @Transactional
    public void modifyMember(MemberModifyReq memberModifyReq, Authentication authentication) throws IOException {
        Member member = memberRepository.findById(authService.getIdByAuthentication(authentication)).get();
        member.setProfile(updateProfile(member.getId(), memberModifyReq.getImage()));
        member.setNickname(memberModifyReq.getNickname());
        member.setBirthOpen(memberModifyReq.getBirthOpen());
        member.setGenderOpen(memberModifyReq.getGenderOpen());
        member.setAlarmOpen(memberModifyReq.getAlarmOpen());
    }

    @Override
    @Transactional
    public String updateProfile(Long memId, MultipartFile profile) throws IOException {
        // 서버에서 이미지 삭제
        Member member = memberRepository.findById(memId).get();
        File file = new File(member.getProfile());
        file.delete();
        // 이미지 새로 등록
        return fileHandler.parseProfileImageInfo(profile);
    }
}
