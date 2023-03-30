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
            // popular_cnt +1 : 향수 Service로 빼서 구성할지 미정
            perfume.setPopularCnt(perfume.getPopularCnt() + 1);
        } else {
            perfume.setCommentCnt(perfume.getCommentCnt() + 1);
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
        String category = perfumeModifyReq.getCategory();
        // memberPerfume
        MemberPerfume myPerfume = memberPerfumeRepository.findById(perfumeModifyReq.getMemberPerfumeId()).get();
        myPerfume.setCategory(Category.valueOf(category));
        // review
        if(!category.equals("WANT")) {
            Member member = memberRepository.findById(myPerfume.getMember().getId()).get();
            Perfume perfume = perfumeRepository.findById(myPerfume.getPerfume().getId()).get();
            Review review = reviewCustomRepository.getReviewByMemberAndPerfume(member, perfume);
            if(review == null) {
                Review newReview = new Review();
                newReview.setMember(member);
                newReview.setPerfume(perfume);
                newReview.setPreference(perfumeModifyReq.getPreference());
                newReview.setComment(perfumeModifyReq.getComment());
                reviewRepository.save(newReview);
            } else {
                review.setPreference(perfumeModifyReq.getPreference());
                review.setComment(perfumeModifyReq.getComment());
            }
        }
    }

    @Override
    public void removePerfume(Long myPerfumeId) {
        memberPerfumeRepository.deleteById(myPerfumeId);
    }
}
