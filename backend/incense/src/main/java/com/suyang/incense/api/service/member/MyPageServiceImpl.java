package com.suyang.incense.api.service.member;

import com.suyang.incense.api.request.member.mypage.PerfumeModifyReq;
import com.suyang.incense.api.request.member.mypage.PerfumeRegisterReq;
import com.suyang.incense.api.response.member.mypage.PerfumeRes;
import com.suyang.incense.db.entity.member.Member;
import com.suyang.incense.db.entity.perfume.Perfume;
import com.suyang.incense.db.entity.relation.Category;
import com.suyang.incense.db.entity.relation.MemberPerfume;
import com.suyang.incense.db.entity.review.Review;
import com.suyang.incense.db.repository.member.*;
import com.suyang.incense.db.repository.perfume.PerfumeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MyPageServiceImpl implements MyPageService{

    public final MemberPerfumeCustomRepository memberPerfumeCustomRepository;
    private final MemberPerfumeRepository memberPerfumeRepository;
    private final ReviewCustomRepository reviewCustomRepository;
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
    @Transactional
    public void registerPerfume(PerfumeRegisterReq perfumeRegisterReq, Authentication authentication) {
        String category = perfumeRegisterReq.getCategory();
        Perfume perfume = perfumeRepository.findById(perfumeRegisterReq.getPerfumeId()).get();
        Member member = memberRepository.findById(authService.getIdByAuthentication(authentication)).get();
        // MemberPerfume
        MemberPerfume memberPerfume = new MemberPerfume();
        memberPerfume.setMember(member);
        memberPerfume.setPerfume(perfume);
        memberPerfume.setCategory(Category.valueOf(category));
        memberPerfumeRepository.save(memberPerfume);
        // review
        if(category.equals("WANT")) {
            perfume.setPopularCnt(perfume.getPopularCnt() + 1);     // popular_cnt +1 : 향수 Service로 빼서 구성할지 미정
        } else {
            perfume.setCommentCnt(perfume.getCommentCnt() + 1);     // comment_cnt +1 : 향수 Service로 빼서 구성할지 미정
            Review review = new Review();
            review.setPreference(perfumeRegisterReq.getPreference());
            review.setComment(perfumeRegisterReq.getComment());
            review.setMember(member);
            review.setPerfume(perfume);
            reviewRepository.save(review);
        }
    }

    @Override
    @Transactional
    public void modifyPerfume(PerfumeModifyReq perfumeModifyReq) {
        // MemberPerfume
        MemberPerfume memberPerfume = memberPerfumeRepository.findById(perfumeModifyReq.getMemberPerfumeId()).get();
        memberPerfume.setCategory(Category.valueOf(perfumeModifyReq.getCategory()));
        // review
        Review review = reviewCustomRepository.getReviewByMemberAndPerfume(memberPerfume.getMember(), memberPerfume.getPerfume());
        review.setPreference(perfumeModifyReq.getPreference());
        review.setComment(perfumeModifyReq.getComment());
    }

    @Override
    public void removePerfume(Long myPerfumeId) {
        memberPerfumeRepository.deleteById(myPerfumeId);
    }
}
