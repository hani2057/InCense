package com.suyang.incense.api.response.member.mypage;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ReviewRes {

    @ApiModelProperty(name = "향수 ID")
    private Long perfumeId;
    @ApiModelProperty(name = "후기 ID")
    private Long reviewId;
    @ApiModelProperty(name = "향수 브랜드 이름")
    private String brandName;
    @ApiModelProperty(name = "향수 이름")
    private String perfumeName;
    @ApiModelProperty(name = "향수 이미지")
    private String perfumeImage;
    @ApiModelProperty(name = "작성한 평점")
    private double preference;
    @ApiModelProperty(name = "작성한 후기")
    private String comment;
    @ApiModelProperty(name = "후기 작성 시간")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    private LocalDateTime time;

//    @QueryProjection
    public ReviewRes(Long perfumeId, Long reviewId, String brandName, String perfumeName,
                     String perfumeImage, double preference, String comment, LocalDateTime time) {
        this.perfumeId = perfumeId;
        this.reviewId = reviewId;
        this.brandName = brandName;
        this.perfumeName = perfumeName;
        this.perfumeImage = perfumeImage;
        this.preference = preference;
        this.comment = comment;
        this.time = time;
    }
}
