package com.suyang.incense.api.controller;

import com.suyang.incense.api.request.deal.DealReq;
import com.suyang.incense.api.response.deal.DealDetailRes;
import com.suyang.incense.api.response.deal.DealListRes;
import com.suyang.incense.api.service.deal.DealPhotoService;
import com.suyang.incense.api.service.deal.DealService;
import com.suyang.incense.db.entity.deal.Deal;
import com.suyang.incense.db.entity.deal.DealPhoto;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import springfox.documentation.annotations.ApiIgnore;

@Api(value = "판매 나눔 API", tags = {"Deal"})
@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
@RequestMapping("/api/deal")
public class DealController {

  private final DealService dealService;
  private final DealPhotoService dealPhotoService;

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

  //////////////////////////////////////////이미지 조회 컨트롤러/////////////////////////////////


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


    List<DealListRes> result = new ArrayList<>();
    DealListRes temp = new DealListRes(1l, "2023.03.20", "글 제목", 100, 10000, (byte)0, (byte)0, 1, "헤일리", "Chanel", "No.5");
    result.add(temp);

    return ResponseEntity.status(200).body(result);

  }

  //나눔/판매 글 상세 조회 컨트롤러
  @ApiOperation(value = "나눔/판매 글 상세 조회")
  @GetMapping("/{deal-id}")
  public ResponseEntity<DealDetailRes> getDeal(
          @PathVariable(value = "deal-id") Long dealId) {

    DealDetailRes result = new DealDetailRes();

    return ResponseEntity.status(200).body(result);

  }
}