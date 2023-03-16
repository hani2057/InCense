package com.suyang.incense.api.controller;

import com.suyang.incense.api.request.deal.DealReq;
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
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
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
      throws URISyntaxException, IOException {

    //판매/나눔 글 생성
//    Deal deal = dealService.create(dealReq, memberId, dealReq.getPerfumeId());
    Deal deal = dealService.create(dealReq, 1l, dealReq.getPerfumeId());

    //이미지 넣기
    boolean imageExist = dealPhotoService.saveImage(deal.getId(), dealReq.getFiles());

    if(imageExist){
      URI uriLocation = new URI("/deal/"+ deal.getId());
//      return ResponseEntity.created(uriLocation).body("{}");
    }

    //알람 전송 : 글의 향수를 알람 처리한 유저 리스트와 글 시퀀스넘버를 매개변수로 넘긴다.

    return (ResponseEntity<?>) ResponseEntity.status(HttpStatus.OK);
  }

}
