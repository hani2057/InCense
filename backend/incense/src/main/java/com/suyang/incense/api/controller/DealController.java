package com.suyang.incense.api.controller;

import com.suyang.incense.api.request.deal.DealCommentReq;
import com.suyang.incense.api.request.deal.DealConditionReq;
import com.suyang.incense.api.request.deal.DealReportReq;
import com.suyang.incense.api.request.deal.DealReq;
import com.suyang.incense.api.response.deal.DealCommentRes;
import com.suyang.incense.api.response.deal.DealDetailRes;
import com.suyang.incense.api.response.deal.DealListRes;
import com.suyang.incense.api.service.alarm.AlarmService;
import com.suyang.incense.api.service.deal.*;
import com.suyang.incense.api.service.member.AuthService;
import com.suyang.incense.api.service.member.MemberService;
import com.suyang.incense.db.entity.deal.Deal;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

@Api(value = "판매 나눔 API", tags = {"Deal"})
@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
@RequestMapping("/deal")
public class DealController {

  private final DealService dealService;
  private final DealPhotoService dealPhotoService;
  private final DealCommentService dealCommentService;
  private final DealBookmarkService dealBookmarkService;
  private final DealReportService dealReportService;
  private final MemberService memberService;
  private final AuthService authService;
  private final AlarmService alarmService;

  @ApiOperation(value = "나눔/판매 글 생성")
  @PostMapping(/*consumes = {"multipart/form-data"}*/)
  public ResponseEntity<?> createDeal(
          @ModelAttribute @ApiParam(value = "나눔/판매 글 생성 정보", required = true) DealReq dealReq,
          @ApiIgnore Authentication authentication)
          throws IOException {

    //판매/나눔 글 생성
    Long memberId = authService.getIdByAuthentication(authentication);

    System.out.println("memberId............................................: " + memberId);

    Deal deal = dealService.create(dealReq, memberId);

    //이미지 넣기
    boolean imageExist = dealPhotoService.saveImage(deal.getId(), dealReq.getFiles());

    //점수 갱신
    memberService.addRank(1, memberId);
//    memberService.checkRank(memberId);

    //알람 전송 : 나눔/판매글 id, 향수 id 전송
    alarmService.sendAlarmToAllMembers(deal);

    return ResponseEntity.status(200).body("success");
  }

  @ApiOperation(value = "나눔/판매 글 수정")
  @PutMapping(path = "/{deal-id}", consumes = {"multipart/form-data"})
  public ResponseEntity<?> updateDeal(
          @PathVariable(value = "deal-id") Long dealId,
          @ModelAttribute @ApiParam(value = "나눔/판매 글 생성 정보", required = true) DealReq dealReq,
          @ApiIgnore Authentication authentication)
          throws IOException {

    //판매/나눔 글 정보 수정
    Long memberId = authService.getIdByAuthentication(authentication);
    Deal deal = dealService.update(dealReq, dealId, memberId);

    //이미지 수정
    dealPhotoService.updateImage(deal.getId(), dealReq.getFiles());

    return ResponseEntity.status(200).body("success");
  }

  @ApiOperation(value = "나눔/판매 글 삭제")
  @DeleteMapping("/{deal-id}")
  public ResponseEntity<?> deleteDeal(
          @PathVariable(value = "deal-id") Long dealId,
          @ApiIgnore Authentication authentication) throws IOException {

    Long memberId = authService.getIdByAuthentication(authentication);

    if (!dealService.delete(dealId, memberId)) {
      return ResponseEntity.status(404).body("유효하지 않은 사용자");
    }

    return ResponseEntity.status(200).body("success");
  }

  @ApiOperation(value = "나눔/판매 글 마감")
  @PutMapping("/close/{deal-id}")
  public ResponseEntity<?> closeDeal(
          @PathVariable(value = "deal-id") Long dealId,
          @ApiIgnore Authentication authentication) {

    Long memberId = authService.getIdByAuthentication(authentication);

    if(!dealService.closeDeal(dealId, memberId)){
      return ResponseEntity.status(404).body("유효하지 않은 사용자");
    }

    return ResponseEntity.status(200).body("success");
  }

  @ApiOperation(value = "나눔/판매 글 리스트 조회")
  @GetMapping("")
  public ResponseEntity<Page<DealListRes>> getAllDeals(
          @ModelAttribute DealConditionReq dealConditionReq,
          @PageableDefault(value = 20) Pageable pageable) {

    /* dummy */
//    List<DealListRes> result = new ArrayList<>();
//    DealListRes temp = new DealListRes(1l, "2023.03.20", "글 제목", 100, 10000, (byte)0, (byte)0, 1, "헤일리", "Chanel", "No.5", "향수 이미지 url");
//    result.add(temp);
//
//    return ResponseEntity.status(200).body(result);

    Page<DealListRes> result = dealService.getAllDeals(dealConditionReq, pageable);

    return ResponseEntity.status(200).body(result);

  }

  //나눔/판매 글 상세 조회 컨트롤러
  @ApiOperation(value = "나눔/판매 글 상세 조회")
  @GetMapping("/{deal-id}")
  public ResponseEntity<DealDetailRes> getDeal(
          @PathVariable(value = "deal-id") Long dealId) {

    /* dummy */
//    DealDetailRes result = new DealDetailRes(
//            Gubun.SALE,
//            "나눔/판매 글 제목",
//            "나눔/판매 글 내용",
//            "2023.03.21",
//            (byte)0,
//            (byte)0,
//            "헤일리",
//            "등급1",
//            "등급 이미지 url",
//            "Chanel",
//            "No.5",
//            "2023.01",
//            10000,
//            100
//    );
    DealDetailRes result = dealService.getDeal(dealId);
    return ResponseEntity.status(200).body(result);
  }

  @ApiOperation(value = "나눔/판매 글 댓글 생성")
  @PostMapping("/comment/{deal-id}")
  public ResponseEntity<?> createDealComment(
          @PathVariable(value = "deal-id") Long dealId,
          @RequestBody @ApiParam(value = "나눔/판매 글 댓글 생성 정보", required = true) DealCommentReq dealCommentReq,
          @ApiIgnore Authentication authentication) {

    Long memberId = authService.getIdByAuthentication(authentication);

    dealCommentService.create(dealId, memberId, dealCommentReq);
    memberService.addRank(2, memberId);

    return ResponseEntity.status(200).body("success");

  }

  @ApiOperation(value = "나눔/판매 댓글 수정")
  @PutMapping("/comment/{comment-id}")
  public ResponseEntity<?> updateDealComment(
          @PathVariable(value = "comment-id") Long commentId,
          @RequestBody @ApiParam(value = "나눔/판매 댓글 수정 정보", required = true) DealCommentReq dealCommentReq,
          @ApiIgnore Authentication authentication) {

    Long memberId = authService.getIdByAuthentication(authentication);

    dealCommentService.update(commentId, memberId, dealCommentReq);

    return ResponseEntity.status(200).body("success");
  }

  @ApiOperation(value = "나눔/판매 댓글 삭제")
  @DeleteMapping("/comment/{comment-id}")
  public ResponseEntity<?> deleteDealComment(
          @PathVariable(value = "comment-id") Long commentId,
          @RequestBody Map<String, String> type,
          @ApiIgnore Authentication authentication) {

    String typeArg = type.get("type");

    Long memberId = authService.getIdByAuthentication(authentication);

    dealCommentService.delete(typeArg, commentId, memberId);

    return ResponseEntity.status(200).body("success");
  }

  @ApiOperation(value = "나눔/판매 댓글 조회")
  @GetMapping("/comment/{deal-id}")
  public ResponseEntity<?> getComments(
          @PathVariable(value = "deal-id") Long dealId){

    List<DealCommentRes> result = dealCommentService.getComments(dealId);

    return ResponseEntity.status(200).body(result);
  }

  @ApiOperation(value = "나눔/판매 북마크 ON/OFF")
  @PutMapping("/bookmark/{deal-id}")
  public ResponseEntity<?> setBookmarkStatus(
          @PathVariable(value = "deal-id") Long dealId,
          @ApiIgnore Authentication authentication) {

    Long memberId = authService.getIdByAuthentication(authentication);

    //북마크 등록되어 있는 경우 북마크 해제, 해제되어 있는 경우 등록
    Boolean isRegistered = dealBookmarkService.setBookmarkStatus(dealId, memberId);

    return ResponseEntity.status(200).body(isRegistered);

  }

  @ApiOperation(value = "나눔/판매 북마크 여부 조회")
  @GetMapping("/bookmark/{deal-id}")
  public ResponseEntity<Map<String, Boolean>> getBookmartStatus(
          @PathVariable(value = "deal-id") Long dealId,
          @ApiIgnore Authentication authentication) {

    Long memberId = authService.getIdByAuthentication(authentication);

    Boolean isRegistered = dealBookmarkService.getBookmarkStatus(dealId, memberId);

    Map<String, Boolean> result = new HashMap<>();
    result.put("bookmark", isRegistered);

    return ResponseEntity.status(200).body(result);

  }

  @ApiOperation(value = "나눔/판매 글 신고")
  @PostMapping("/report")
  public ResponseEntity<?> createReport(
          @RequestBody @ApiParam(value = "나눔/판매 신고 정보", required = true) DealReportReq dealReportReq,
          @ApiIgnore Authentication authentication){

    Long memberId = authService.getIdByAuthentication(authentication);

    dealReportService.createReport(dealReportReq, memberId);

    return ResponseEntity.status(200).body("success");
  }

}