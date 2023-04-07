package com.suyang.incense.api.service.member;

import com.suyang.incense.api.request.member.mypage.PerfumeModifyReq;
import com.suyang.incense.api.request.member.mypage.PerfumeRegisterReq;
import com.suyang.incense.api.request.member.mypage.ReviewModifyReq;
import com.suyang.incense.api.response.member.mypage.BookmarkRes;
import com.suyang.incense.api.response.member.mypage.DealRes;
import com.suyang.incense.api.response.member.mypage.PerfumeRes;
import com.suyang.incense.api.response.member.mypage.ReviewRes;
import com.suyang.incense.common.util.BaseResponseBody;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface MyPageService {

    // [향수]
    List<PerfumeRes> getMyPerfume(String type, Authentication Authentication);
    BaseResponseBody registerPerfume(PerfumeRegisterReq perfumeRegisterReq, Authentication authentication);
    void modifyPerfume(PerfumeModifyReq perfumeModifyReq);
    void removePerfume(Long myPerfumeId);

    // [후기]
    List<ReviewRes> getMyReview(Authentication Authentication);
    void modifyMyReview(ReviewModifyReq reviewModifyReq);

    // [나눔/판매]
    List<DealRes> getMyDeal(Authentication authentication);
    List<BookmarkRes> getMyBookmark(Authentication authentication);
}
