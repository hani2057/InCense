package com.suyang.incense.api.response.deal;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("DealListRes")
public class DealListRes {

    @ApiModelProperty(name = "나눔/판매 글 시퀀스 넘버", example = "1")
    private Long dealId;

    @ApiModelProperty(name = "나눔/판매 글 작성일", example = "2023.03.20")
    private String createdDate;

    @ApiModelProperty(name = "나눔/판매 글 제목", example = "00향수 판매합니다.")
    private String title;

    @ApiModelProperty(name = "향수 용량", example = "100")
    private int volume;

    @ApiModelProperty(name = "향수 가격", example = "10000")
    private int price;

    @ApiModelProperty(name = "배달 여부: 0 불가 1 가능", example = "0")
    private byte isDelivery;

    @ApiModelProperty(name = "마감 여부", example = "0 마감전 1 마감완료")
    private byte isClosed;

    @ApiModelProperty(name = "댓글 수", example = "1")
    private int commentCount;

    @ApiModelProperty(name = "나눔/판매 글 작성자 닉네임", example = "헤일리")
    private String nickName;

    @ApiModelProperty(name = "나눔/판매 글 향수 브랜드", example = "Chanel")
    private String perfumeBrand;

    @ApiModelProperty(name = "나눔/판매 글 향수 이름", example = "No.5")
    private String perfumeName;

    @ApiModelProperty(name = "향수 이미지", example = "")
    private String perfumeImage;


    public DealListRes() {}

    public DealListRes(Long dealId, String createdDate, String title, int volume, int price, byte isDelivery, byte isClosed, int commentCount, String nickName, String perfumeBrand, String perfumeName, String perfumeImage) {
        this.dealId = dealId;
        this.createdDate = createdDate;
        this.title = title;
        this.volume = volume;
        this.price = price;
        this.isDelivery = isDelivery;
        this.isClosed = isClosed;
        this.commentCount = commentCount;
        this.nickName = nickName;
        this.perfumeBrand = perfumeBrand;
        this.perfumeName = perfumeName;
        this.perfumeImage = perfumeImage;
    }
}
