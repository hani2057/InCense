package com.suyang.incense.api.controller;

import com.suyang.incense.api.request.deal.DealCommentReq;
import com.suyang.incense.api.request.deal.DealReq;
import com.suyang.incense.api.response.deal.DealDetailRes;
import com.suyang.incense.api.response.deal.DealListRes;
import com.suyang.incense.api.service.deal.DealCommentService;
import com.suyang.incense.api.service.deal.DealPhotoService;
import com.suyang.incense.api.service.deal.DealService;
import com.suyang.incense.db.entity.deal.Deal;
import com.suyang.incense.db.entity.deal.DealPhoto;
import com.suyang.incense.db.entity.deal.Gubun;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import springfox.documentation.annotations.ApiIgnore;

import javax.validation.Valid;

@Api(value = "판매 나눔 API", tags = {"Deal"})
@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
@RequestMapping("/deal")
public class DealController {

  private final DealService dealService;
  private final DealPhotoService dealPhotoService;
  private final DealCommentService dealCommentService;

  @ApiOperation(value = "나눔/판매 글 생성")
  @PostMapping(consumes = {"multipart/form-data"})
  public ResponseEntity<?> createDeal(
          @ModelAttribute @ApiParam(value = "나눔/판매 글 생성 정보", required = true) DealReq dealReq)
          throws IOException {

    //판매/나눔 글 생성
//    Deal deal = dealService.create(dealReq, memberId);
    Deal deal = dealService.create(dealReq, 1l);

    //이미지 넣기
    boolean imageExist = dealPhotoService.saveImage(deal.getId(), dealReq.getFiles());

    //알람 전송 : 나눔/판매글 id, 향수 id 전송

    return ResponseEntity.status(200).body("success");
  }

  @ApiOperation(value = "나눔/판매 글 수정")
  @PutMapping(path = "/{deal-id}", consumes = {"multipart/form-data"})
  public ResponseEntity<?> updateDeal(
          @PathVariable(value = "deal-id") Long dealId,
          @ModelAttribute @ApiParam(value = "나눔/판매 글 생성 정보", required = true) DealReq dealReq)
          throws IOException {

    //판매/나눔 글 정보 수정
//    Deal deal = dealService.update(dealReq, dealId, memberId);
    Deal deal = dealService.update(dealReq, dealId, 1l);

    //이미지 수정
    dealPhotoService.updateImage(deal.getId(), dealReq.getFiles());

    return ResponseEntity.status(200).body("success");
  }

  @ApiOperation(value = "나눔/판매 글 삭제")
  @DeleteMapping("/{deal-id}")
  public ResponseEntity<?> deleteDeal(@PathVariable(value = "deal-id") Long dealId) throws IOException {

//    dealService.delete(dealId, memberId);

    if (!dealService.delete(dealId, 1l)) {
      return ResponseEntity.status(404).body("유효하지 않은 사용자");
    }

    return ResponseEntity.status(200).body("success");
  }

  @ApiOperation(value = "나눔/판매 글 마감")
  @PutMapping("/close/{deal-id}")
  public ResponseEntity<?> closeDeal(@PathVariable(value = "deal-id") Long dealId) {

//    dealService.closeDeal(dealId, memberId);
    if(!dealService.closeDeal(dealId, 1l)){
      return ResponseEntity.status(404).body("유효하지 않은 사용자");
    }

    return ResponseEntity.status(200).body("success");
  }


  //원래는 Page<DealListRes> 반환해야 한다.
  @ApiOperation(value = "나눔/판매 글 리스트 조회")
  @GetMapping("")
  public ResponseEntity<List<DealListRes>> getAllDeals(
          @RequestParam(value = "gubun", required = false) String gubun,
          @RequestParam(value = "brands", required = false) List<Long> brands,
          @RequestParam(value = "scents", required = false) List<Long> scents,
          @RequestParam(value = "transaction", required = false) Integer transaction,
          @RequestParam(value = "end", required = false) Integer end,
          @PageableDefault(value = Integer.MAX_VALUE) Pageable pageable) {


    /* dummy */
    List<DealListRes> result = new ArrayList<>();
    DealListRes temp = new DealListRes(1l, "2023.03.20", "글 제목", 100, 10000, (byte)0, (byte)0, 1, "헤일리", "Chanel", "No.5", "향수 이미지 url");
    result.add(temp);

    return ResponseEntity.status(200).body(result);

  }

  //나눔/판매 글 상세 조회 컨트롤러
  @ApiOperation(value = "나눔/판매 글 상세 조회")
  @GetMapping("/{deal-id}")
  public ResponseEntity<DealDetailRes> getDeal(
          @PathVariable(value = "deal-id") Long dealId) {

    /* dummy */
    DealDetailRes result = new DealDetailRes(
            Gubun.SALE,
            "나눔/판매 글 제목",
            "나눔/판매 글 내용",
            "2023.03.21",
            (byte)0,
            (byte)0,
            "헤일리",
            "등급1",
            "등급 이미지 url",
            "Chanel",
            "No.5",
            "2023.01",
            10000,
            100
    );

    return ResponseEntity.status(200).body(result);
  }

  @ApiOperation(value = "나눔/판매 글 댓글 생성")
  @PostMapping("/comment/{deal-id}")
  public ResponseEntity<?> createDealComment(
          @PathVariable(value = "deal-id") Long dealId,
          @RequestBody @ApiParam(value = "나눔/판매 글 댓글 생성 정보", required = true) DealCommentReq dealCommentReq) {

//    dealCommentService.create(dealId, memberId, dealCommentReq);
    dealCommentService.create(dealId, 1l, dealCommentReq);

    return ResponseEntity.status(200).body("success");

  }

  @ApiOperation(value = "나눔/판매 댓글 수정")
  @PutMapping("/comment/{comment-id}")
  public ResponseEntity<?> updateDealComment(
          @PathVariable(value = "comment-id") Long commentId,
          @RequestBody @ApiParam(value = "나눔/판매 댓글 수정 정보", required = true) DealCommentReq dealCommentReq) {

//    dealCommentService.update(commentId, memberId, dealCommentReq);
    dealCommentService.update(commentId, 1l, dealCommentReq);

    return ResponseEntity.status(200).body("success");
  }

  @ApiOperation(value = "나눔/판매 댓글 삭제")
  @DeleteMapping("/comment/{comment-id}")
  public ResponseEntity<?> deleteDealComment(
          @PathVariable(value = "comment-id") Long commentId,
          @RequestBody Map<String, String> type) {

    String typeArg = type.get("type");

//    dealCommentService.delete(typeArg, commentId, memberId);
    dealCommentService.delete(typeArg, commentId, 1l);

    return ResponseEntity.status(200).body("success");
  }


}