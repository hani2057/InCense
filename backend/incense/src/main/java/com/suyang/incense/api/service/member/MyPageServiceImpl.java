package com.suyang.incense.api.service.member;

import com.suyang.incense.api.request.member.mypage.PerfumeModifyReq;
import com.suyang.incense.api.request.member.mypage.PerfumeRegisterReq;
import com.suyang.incense.api.request.member.mypage.ReviewModifyReq;
import com.suyang.incense.api.response.member.mypage.BookmarkRes;
import com.suyang.incense.api.response.member.mypage.DealRes;
import com.suyang.incense.api.response.member.mypage.PerfumeRes;
import com.suyang.incense.api.response.member.mypage.ReviewRes;
import com.suyang.incense.common.util.BaseResponseBody;
import com.suyang.incense.db.entity.member.Member;
import com.suyang.incense.db.entity.perfume.Perfume;
import com.suyang.incense.db.entity.relation.Category;
import com.suyang.incense.db.entity.relation.MemberPerfume;
import com.suyang.incense.db.entity.review.Review;
import com.suyang.incense.db.repository.deal.DealBookmarkRepository;
import com.suyang.incense.db.repository.deal.DealRepository;
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

    private final DealBookmarkRepository dealBookmarkRepository;
    private final MemberPerfumeRepository memberPerfumeRepository;
    private final DealRepository dealRepository;
    private final MemberRepository memberRepository;
    private final ReviewRepository reviewRepository;
    private final PerfumeRepository perfumeRepository;
    private final AuthService authService;
    private final MemberService memberService;

    @Override
    public List<PerfumeRes> getMyPerfume(String type, Authentication authentication) {
        Long memberId = authService.getIdByAuthentication(authentication);
        if(type.equals("WANT")) {
            return memberPerfumeRepository.getMyWantPerfume(memberId);
        } else {
            return memberPerfumeRepository.getMyHaveHadPerfume(type, memberId);
        }
    }

    @Override
    @Transactional
    public BaseResponseBody registerPerfume(PerfumeRegisterReq perfumeRegisterReq, Authentication authentication) {
        String category = perfumeRegisterReq.getCategory();
        Perfume perfume = perfumeRepository.findById(perfumeRegisterReq.getPerfumeId()).orElseThrow(IllegalArgumentException::new);
        Member member = authService.getMemberByAuthentication(authentication).orElseThrow(IllegalArgumentException::new);
        // 이미 동일한 member / perfume으로 등록되어 있으면 예외 발생
        if(memberPerfumeRepository.findByMemberAndPerfume(member, perfume).isPresent())
            return BaseResponseBody.of(418, "이미 등록되어 있는 향수입니다. ");
        // MemberPerfume
        MemberPerfume memberPerfume = new MemberPerfume();
        memberPerfume.setMember(member);
        memberPerfume.setPerfume(perfume);
        memberPerfume.setCategory(Category.valueOf(category));
        memberPerfumeRepository.save(memberPerfume);
        // review
        if(category.equals("WANT")) {
            perfume.setPopularCnt(perfume.getPopularCnt() + 1);
        } else {
            perfume.setCommentCnt(perfume.getCommentCnt() + 1);
            Review review = new Review();
            review.setPreference(perfumeRegisterReq.getPreference());
            review.setComment(perfumeRegisterReq.getComment());
            review.setMember(member);
            review.setPerfume(perfume);
            reviewRepository.save(review);
            // grade
            memberService.addRank(3, member.getId());
        }
        return BaseResponseBody.of(200, "Success");
    }

    @Override
    @Transactional
    public void modifyPerfume(PerfumeModifyReq perfumeModifyReq) {
        String category = perfumeModifyReq.getCategory();
        // memberPerfume
        MemberPerfume myPerfume = memberPerfumeRepository.findById(perfumeModifyReq.getMemberPerfumeId()).orElseThrow(IllegalArgumentException::new);
        myPerfume.setCategory(Category.valueOf(category));
        // review
        if(!category.equals("WANT")) {
            Member member = memberRepository.findById(myPerfume.getMember().getId()).orElseThrow(IllegalArgumentException::new);
            Perfume perfume = perfumeRepository.findById(myPerfume.getPerfume().getId()).orElseThrow(IllegalArgumentException::new);
            Review review = reviewRepository.getReviewByMemberAndPerfume(member, perfume);
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

    @Override
    public List<ReviewRes> getMyReview(Authentication authentication) {
//        Member member = memberRepository.findById(authService.getIdByAuthentication(authentication)).get();
//        return reviewCustomRepository.getReviewByMember(member);
        return reviewRepository.getReviewByMember(authService.getMemberByAuthentication(authentication).orElseThrow(IllegalArgumentException::new));
    }

    @Override
    @Transactional
    public void modifyMyReview(ReviewModifyReq reviewModifyReq) {
        Review review = reviewRepository.findById(reviewModifyReq.getReviewId()).orElseThrow(IllegalArgumentException::new);
        review.setComment(reviewModifyReq.getComment());
        review.setPreference(reviewModifyReq.getPreference());
    }

    @Override
    public List<DealRes> getMyDeal(Authentication authentication) {
        Member member = authService.getMemberByAuthentication(authentication).orElseThrow(IllegalArgumentException::new);
        return dealRepository.getDealByMember(member);
    }

    @Override
    public List<BookmarkRes> getMyBookmark(Authentication authentication) {
        Long memberId = authService.getIdByAuthentication(authentication);
        return dealBookmarkRepository.getBookmarkByMember(memberId);
    }
}
