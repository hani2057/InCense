package com.suyang.incense.api.request.deal;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import java.util.List;
import javax.print.attribute.standard.MediaSize.NA;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@ApiModel("DealReq")
public class DealReq {

  @ApiModelProperty(name = "향수 시퀀스 넘버", example = "1")
  private Long perfumeId;

  @ApiModelProperty(name = "나눔/판매 구분자: {SALE, SHARE}", example = "SALE")
  private String gubun;

  @ApiModelProperty(name = "나눔/판매 글 제목", example = "글 제목")
  private String title;

  @ApiModelProperty(name = "나눔/판매 글 내용", example = "글 내용")
  private String content;

  @ApiModelProperty(name = "판매 가격", example = "0")
  private int price;

  @ApiModelProperty(name = "판매 용량", example = "100")
  private int volume;

  @ApiModelProperty(name = "배달 가능 여부: 0 불가능, 1 가능", example = "0")
  private byte isDelivery;

  @ApiModelProperty(name = "판매/나눔 마감 여부: 0 판매/나눔중, 1 마감", example = "0")
  private byte isClosed;

  @ApiModelProperty(name = "향수 구매일", example = "2023.01")
  private String buyDate;

  @ApiModelProperty(name = "판매/나눔 이미지")
  private List<MultipartFile> files;


}
