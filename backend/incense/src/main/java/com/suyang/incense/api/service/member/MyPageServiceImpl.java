package com.suyang.incense.api.service.member;

import com.suyang.incense.api.request.member.mypage.PerfumeRegisterReq;
import com.suyang.incense.api.response.member.mypage.PerfumeRes;
import com.suyang.incense.db.entity.perfume.Perfume;
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

import javax.transaction.Transactional;
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
    @Transactional
    public void registerPerfume(PerfumeRegisterReq perfumeRegisterReq, Authentication authentication) {
        String category = perfumeRegisterReq.getCategory();
        Perfume perfume = perfumeRepository.findById(perfumeRegisterReq.getPerfumeId()).get();
        // MemberPerfume
        MemberPerfume memberPerfume = new MemberPerfume();
        memberPerfume.setMember(memberRepository.findById(authService.getIdByAuthentication(authentication)).get());
        memberPerfume.setPerfume(perfume);
        memberPerfume.setCategory(Category.valueOf(category));
        MemberPerfume myPerfume = memberPerfumeRepository.save(memberPerfume);
        // review
        if(category.equals("WANT")) {
            // popular_cnt +1 : 향수 Service로 빼서 구성할지 미정
            perfume.setPopularCnt(perfume.getPopularCnt() + 1);
        } else {
            Review review = new Review();
            review.setMemberPerfume(myPerfume);
            review.setPreference(perfumeRegisterReq.getPreference());
            review.setComment(perfumeRegisterReq.getComment());
            reviewRepository.save(review);
        }
    }
}
