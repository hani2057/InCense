package com.suyang.incense.api.response.member.mypage;

import com.querydsl.core.annotations.QueryProjection;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class PerfumeRes {

    @ApiModelProperty(name = "내 향수 ID")
    private Long myPerfumeId;
    @ApiModelProperty(name = "향수 ID")
    private Long perfumeId;
    @ApiModelProperty(name = "향수 브랜드 이름")
    private String brandName;
    @ApiModelProperty(name = "향수 이름")
    private String perfumeName;
    @ApiModelProperty(name = "향수 이미지 경로")
    private String image;
    @ApiModelProperty(name = "향수 알람 여부")
    private boolean alarm;
    @ApiModelProperty(name = "작성한 향수 평점")
    private double preference;
    @ApiModelProperty(name = "작성한 향수 후기")
    private String comment;

    @QueryProjection
    public PerfumeRes(Long myPerfumeId, Long perfumeId, String brandName, String perfumeName,
                      String image, double preference, String comment) {
        this.myPerfumeId = myPerfumeId;
        this.perfumeId = perfumeId;
        this.brandName = brandName;
        this.perfumeName = perfumeName;
        this.image = image;
        this.preference = preference;
        this.comment = comment;
    }

    @QueryProjection
    public PerfumeRes(Long myPerfumeId, Long perfumeId, String brandName, String perfumeName,
                      String image) {
        this.myPerfumeId = myPerfumeId;
        this.perfumeId = perfumeId;
        this.brandName = brandName;
        this.perfumeName = perfumeName;
        this.image = image;
    }
}
