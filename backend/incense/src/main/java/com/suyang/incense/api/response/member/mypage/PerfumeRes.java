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

    @QueryProjection
    public PerfumeRes(Long perfumeId, String brandName, String perfumeName, String image) {
        this.perfumeId = perfumeId;
        this.brandName = brandName;
        this.perfumeName = perfumeName;
        this.image = image;
    }
}
