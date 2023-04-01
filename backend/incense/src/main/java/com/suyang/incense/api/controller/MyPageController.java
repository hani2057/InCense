package com.suyang.incense.api.controller;

import com.suyang.incense.api.request.member.mypage.PerfumeModifyReq;
import com.suyang.incense.api.request.member.mypage.PerfumeRegisterReq;
import com.suyang.incense.api.request.member.mypage.ReviewModifyReq;
import com.suyang.incense.api.response.member.mypage.BookmarkRes;
import com.suyang.incense.api.response.member.mypage.DealRes;
import com.suyang.incense.api.response.member.mypage.PerfumeRes;
import com.suyang.incense.api.response.member.mypage.ReviewRes;
import com.suyang.incense.api.service.member.MyPageService;
import com.suyang.incense.common.util.BaseResponseBody;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;

@Api(value = "마이페이지 API", tags = {"My Page"})
@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
@RequestMapping("/mypage")
public class MyPageController {

    private final MyPageService myPageService;

    @GetMapping("/perfume")
    @ApiOperation(value = "향수 조회", notes = "등록한 Have, Had, Want 향수 조회")
    public ResponseEntity<List<PerfumeRes>> getPerfumeList(@RequestParam String type,
                                                           @ApiIgnore Authentication authentication) {
        List<PerfumeRes> response = myPageService.getMyPerfume(type, authentication);
        return ResponseEntity.status(200).body(response);
    }

    @PostMapping("/perfume")
    @ApiOperation(value = "향수 등록", notes = "Have, Had, Want 향수 등록")
    public ResponseEntity<? extends BaseResponseBody> registerMyPerfume(@RequestBody PerfumeRegisterReq perfumeRegisterReq,
                                                                        @ApiIgnore Authentication authentication) {
        BaseResponseBody response = myPageService.registerPerfume(perfumeRegisterReq, authentication);
        return ResponseEntity.status(200).body(response);
    }

    @PutMapping("/perfume")
    @ApiOperation(value = "향수 정보 수정", notes = "Have, Had, Want 등록한 향수 정보 수정")
    public ResponseEntity<? extends BaseResponseBody> modifyMyPerfume(@RequestBody PerfumeModifyReq perfumeModifyReq) {
        myPageService.modifyPerfume(perfumeModifyReq);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @DeleteMapping("/perfume")
    @ApiOperation(value = "향수 삭제", notes = "Have, Had, Want 향수 삭제")
    public ResponseEntity<? extends BaseResponseBody> removeMyPerfume(@RequestParam Long myPerfumeId) {
        myPageService.removePerfume(myPerfumeId);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @GetMapping("/review")
    @ApiOperation(value = "작성한 후기 조회", notes = "category와 상관없이 작성한 모든 후기 조회")
    public ResponseEntity<List<ReviewRes>> getPerfumeReview(@ApiIgnore Authentication authentication) {
        List<ReviewRes> response = myPageService.getMyReview(authentication);
        return ResponseEntity.status(200).body(response);
    }

    @PutMapping("/review")
    @ApiOperation(value = "후기 수정", notes = "후기 정보를 수정(카테고리 변경X)")
    public ResponseEntity<? extends BaseResponseBody> modifyMyReview(@RequestBody ReviewModifyReq reviewModifyReq) {
        myPageService.modifyMyReview(reviewModifyReq);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @GetMapping("/deal")
    @ApiOperation(value = "작성한 나눔/판매 글 목록 조회", notes = "나눔/판매 글 정보와 함께 조회")
    public ResponseEntity<List<DealRes>> getDealList(@ApiIgnore Authentication authentication) {
        List<DealRes> response = myPageService.getMyDeal(authentication);
        return ResponseEntity.status(200).body(response);
    }

    @GetMapping("/bookmark")
    @ApiOperation(value = "북마크한 나눔/판매 글 목록 조회", notes = "북마크한 나눔/판매 글 정보와 함께 조회")
    public ResponseEntity<List<BookmarkRes>> getBookmarkList(@ApiIgnore Authentication authentication) {
        List<BookmarkRes> response = myPageService.getMyBookmark(authentication);
        return ResponseEntity.status(200).body(response);
    }
}
