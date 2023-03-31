package com.suyang.incense.api.service.member;

import com.suyang.incense.api.request.member.MemberModifyReq;
import com.suyang.incense.api.request.member.MemberRegisterReq;
import com.suyang.incense.api.response.member.MemberInfoRes;
import com.suyang.incense.common.FileHandler;
import com.suyang.incense.db.entity.member.*;
import com.suyang.incense.db.repository.member.GradeCustomRepository;
import com.suyang.incense.db.repository.member.GradeLogRepository;
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
    private final GradeCustomRepository gradeCustomRepository;
    private final GradeLogRepository gradeLogRepository;
    private final FileHandler fileHandler;

    @Override
    public void registerMember(MemberRegisterReq registerInfo) {
        // 회원 정보 저장
        SocialType type = null;
        String profile = "";
        if(registerInfo.getType().equals("kakao")) type = SocialType.kakao;
        else type = SocialType.naver;

        byte gender = registerInfo.getGender();
        if(gender == 0) profile = "profile/male.png";
        else profile = "profile/female.png";

        Member member = Member.builder()
                .grade(gradeRepository.findById(1L).get())
                .email(registerInfo.getEmail())
                .role(Role.ROLE_USER)
                .type(type)
                .nickname(registerInfo.getNickname())
                .gender(gender)
                .birth(registerInfo.getBirth())
                .profile(profile)
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
        Member member = authService.getMemberByAuthentication(authentication).get();
        return new MemberInfoRes(member.getGrade().getName(), member.getNickname(), member.getGender(),
                member.getBirth(), member.getProfile(), member.getBirthOpen(), member.getGenderOpen(), member.getAlarmOpen());
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
        Member member = memberRepository.findById(memId).get();
        File file = new File(member.getProfile());
        file.delete();  // 서버에서 이미지 삭제
        return fileHandler.parseProfileImageInfo(profile);  // 이미지 새로 등록
    }

    @Override
    @Transactional
    public void addRank(int type, Long memberId) {
        GradeLog gradeLog = new GradeLog();
        Member member = memberRepository.findById(memberId).get();
        gradeLog.setMember(member);
        switch (type) {
            case 1:
                gradeLog.setScore(20);
                gradeLog.setReason("나눔/판매 글 업로드");
                member.setScore(member.getScore()+20);
                break;
            case 2:
                gradeLog.setScore(10);
                gradeLog.setReason("댓글/대댓글 작성");
                member.setScore(member.getScore()+10);
                break;
            case 3:
                gradeLog.setScore(20);
                gradeLog.setReason("후기 작성");
                member.setScore(member.getScore()+20);
                break;
            case 4:
                gradeLog.setScore(100);
                gradeLog.setReason("첫번째 테스트 완료");
                member.setScore(member.getScore()+100);
                break;
            default:
                gradeLog.setScore(0);
                gradeLog.setReason("버그");
                break;
        }
        gradeLogRepository.save(gradeLog);
    }

    @Override
    public void checkRank(Long memberId) {
        String rank = gradeCustomRepository.checkMemberRank(memberId);
        Member member = memberRepository.findById(memberId).get();
        member.setGrade(gradeRepository.findByName(rank).get());
    }
}
