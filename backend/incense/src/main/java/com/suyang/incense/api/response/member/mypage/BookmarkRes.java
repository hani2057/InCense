package com.suyang.incense.api.response.member.mypage;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.querydsl.core.annotations.QueryProjection;
import com.suyang.incense.db.entity.deal.Gubun;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class BookmarkRes {

    @ApiModelProperty(name = "나눔/판매 ID")
    private Long dealId;
    @ApiModelProperty(name = "나눔/판매 (SALE, SHARE)")
    private Gubun gubun;
    @ApiModelProperty(name = "글 작성자")
    private String nickname;
    @ApiModelProperty(name = "글 작성 날짜")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    private LocalDateTime date;
    @ApiModelProperty(name = "글 제목")
    private String title;
    @ApiModelProperty(name = "향수 브랜드")
    private String perfumeBrandName;
    @ApiModelProperty(name = "향수 이름")
    private String perfumeName;
    @ApiModelProperty(name = "향수 이미지")
    private String image;
    @ApiModelProperty(name = "용량")
    private int volume;
    @ApiModelProperty(name = "가격")
    private int price;
    @ApiModelProperty(name = "택배")
    private byte isDelivery;
    @ApiModelProperty(name = "마감")
    private byte isClosed;
    @ApiModelProperty(name = "댓글 수")
    private int commentCount;

    @QueryProjection
    public BookmarkRes(Long dealId, Gubun gubun, String nickname, LocalDateTime date, String title,
                       String perfumeBrandName, String perfumeName, String image, int volume,
                       int price, byte isDelivery, byte isClosed) {
        this.dealId = dealId;
        this.gubun = gubun;
        this.nickname = nickname;
        this.date = date;
        this.title = title;
        this.perfumeBrandName = perfumeBrandName;
        this.perfumeName = perfumeName;
        this.image = image;
        this.volume = volume;
        this.price = price;
        this.isDelivery = isDelivery;
        this.isClosed = isClosed;
    }
}
