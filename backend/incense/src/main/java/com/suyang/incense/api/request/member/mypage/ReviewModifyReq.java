package com.suyang.incense.api.request.member.mypage;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("ReviewModifyReq")
public class ReviewModifyReq {

    @ApiModelProperty(name = "후기 ID", example = "1")
    private Long reviewId;
    @ApiModelProperty(name = "후기", example = "마음이 바꼈어요 향 좋은듯")
    private String comment;
    @ApiModelProperty(name = "평점", example = "3.5")
    private double preference;
}
