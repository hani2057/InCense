package com.suyang.incense.api.request.deal;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("DealReportReq")
public class DealReportReq {

    @ApiModelProperty(name = "나눔/판매 글 시퀀스 넘버", example = "1")
    private Long dealId;

    @ApiModelProperty(name = "신고 사유", example = "광고성 글입니다")
    private String content;
}
