package com.suyang.incense.api.request.member.mypage;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("PerfumeRegisterReq")
public class PerfumeRegisterReq {

    @ApiModelProperty(name = "향수 카테고리 HAVE, HAD, WANT", example = "HAVE")
    private String category;
    @ApiModelProperty(name = "향수 ID", example = "1")
    Long perfumeId;
    @ApiModelProperty(name = "선호도 0.0 - 5.0 (0.5)", example = "3.5")
    private double preference;
    @ApiModelProperty(name = "후기", example = "My First Review")
    private String comment;

}
