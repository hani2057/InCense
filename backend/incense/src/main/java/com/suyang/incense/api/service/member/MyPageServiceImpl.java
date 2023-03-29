package com.suyang.incense.api.service.member;

import com.suyang.incense.api.request.member.mypage.PerfumeRegisterReq;
import com.suyang.incense.api.response.member.mypage.PerfumeRes;
import com.suyang.incense.db.entity.relation.Category;
import com.suyang.incense.db.entity.relation.MemberPerfume;
import com.suyang.incense.db.entity.review.Review;
import com.suyang.incense.db.repository.member.MemberPerfumeCustomRepository;
import com.suyang.incense.db.repository.member.MemberPerfumeRepository;
import com.suyang.incense.db.repository.member.MemberRepository;
import com.suyang.incense.db.repository.member.ReviewRepository;
import com.suyang.incense.db.repository.perfume.PerfumeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MyPageServiceImpl implements MyPageService{

    public final MemberPerfumeCustomRepository memberPerfumeCustomRepository;
    private final MemberPerfumeRepository memberPerfumeRepository;
    private final MemberRepository memberRepository;
    private final ReviewRepository reviewRepository;
    private final PerfumeRepository perfumeRepository;
    private final AuthService authService;

    @Override
    public List<PerfumeRes> getMyPerfume(String type, Authentication authentication) {
        Long memberId = authService.getIdByAuthentication(authentication);
        return memberPerfumeCustomRepository.getMyPerfume(type, memberId);
    }

    @Override
    public void registerPerfume(PerfumeRegisterReq perfumeRegisterReq, Long id) {
        String category = perfumeRegisterReq.getCategory();
        System.out.println("### perfumeRegisterReq.getPerfumeId() = " + perfumeRegisterReq.getPerfumeId() );
        // MemberPerfume
        MemberPerfume memberPerfume = new MemberPerfume();
        memberPerfume.setMember(memberRepository.findById(id).get());
        memberPerfume.setPerfume(perfumeRepository.findById(perfumeRegisterReq.getPerfumeId()).get());
        memberPerfume.setCategory(Category.valueOf(category));
        MemberPerfume perfume = memberPerfumeRepository.save(memberPerfume);
        // review
        if(!category.equals("WANT")) {
            Review review = new Review();
            review.setMemberPerfume(perfume);
            review.setPreference(perfumeRegisterReq.getPreference());
            review.setComment(perfumeRegisterReq.getComment());
            reviewRepository.save(review);
        }
    }
}
