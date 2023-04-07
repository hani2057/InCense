package com.suyang.incense.api.request.deal;

import com.querydsl.core.annotations.QueryProjection;
import com.suyang.incense.db.entity.deal.Gubun;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@ApiModel("DealConditionReq")
public class DealConditionReq {

    @ApiModelProperty(name = "나눔 || 판매", example = "[1]")
    private Gubun gubun;

    @ApiModelProperty(name = "브랜드 선택", example = "[1]")
    private List<Long> brands;

    @ApiModelProperty(name = "노트 선택", example = "[1]")
    private List<Long> scents;

    @ApiModelProperty(name = "택배 || 직거래", example = "[0, 1]")
    private List<Byte> transaction;

    @ApiModelProperty(name = "마감 O || 마감 X", example = "[0, 1]")
    private List<Byte> close;

}
