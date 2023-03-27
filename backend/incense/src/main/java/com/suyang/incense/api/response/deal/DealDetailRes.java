package com.suyang.incense.api.response.deal;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.suyang.incense.db.entity.deal.Gubun;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ApiModel("DealDetailRes")
public class DealDetailRes {

    //글 관련 정보
    @ApiModelProperty(name = "나눔/판매 구분자: {SALE, SHARE}", example = "SALE")
    private Gubun gubun;
    @ApiModelProperty(name = "나눔/판매 글 제목", example = "글 제목")
    private String title;
    @ApiModelProperty(name = "나눔/판매 글 내용", example = "글 내용")
    private String content;
    @ApiModelProperty(name = "나눔/판매 글 작성일", example = "2023.02.01")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime createdDate;
    @ApiModelProperty(name = "배달 가능 여부: 0 불가능, 1 가능", example = "0")
    private byte isDelivery;
    @ApiModelProperty(name = "판매/나눔 마감 여부: 0 판매/나눔중, 1 마감", example = "0")
    private byte isClosed;
    @ApiModelProperty(name = "나눔/판매 향수 가격", example = "10000")
    private int price;
    @ApiModelProperty(name = "나눔/판매 향수 용량", example = "100")
    private int volume;
    @ApiModelProperty(name = "나눔/판매 향수 구매일", example = "2023.02")
    private String buyDate;



    //작성자 관련 정보
    @ApiModelProperty(name = "작성자 닉네임", example = "헤일리")
    private String nickname;
    @ApiModelProperty(name = "작성자 등급", example = "1")
    private String gradeName;
    @ApiModelProperty(name = "작성자 등급 이미지", example = "")
    private String gradeImage;


    //향수 관련 정보
    @ApiModelProperty(name = "나눔/판매 향수 브랜드", example = "Chanel")
    private String perfumeBrand;
    @ApiModelProperty(name = "나눔/판매 향수 이름", example = "No.5")
    private String perfumeName;


    //나눔/판매 글 이미지 정보
    @ApiModelProperty(name = "나눔/판매 이미지 정보(url)", example = "")
    private List<String> imageInfo = new ArrayList<>();


    public DealDetailRes() {}

    public DealDetailRes(Gubun gubun, String title, String content, LocalDateTime createdDate, byte isDelivery, byte isClosed, String nickname, String gradeName, String gradeImage, String perfumeBrand, String perfumeName, String buyDate, int price, int volume) {
        this.gubun = gubun;
        this.title = title;
        this.content = content;
        this.createdDate = createdDate;
        this.isDelivery = isDelivery;
        this.isClosed = isClosed;
        this.nickname = nickname;
        this.gradeName = gradeName;
        this.gradeImage = gradeImage;
        this.perfumeBrand = perfumeBrand;
        this.perfumeName = perfumeName;
        this.buyDate = buyDate;
        this.price = price;
        this.volume = volume;
    }
}
