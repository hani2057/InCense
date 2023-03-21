package com.suyang.incense.api.response.deal;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("DealPhotoListRes")
public class DealPhotoListRes {

    @ApiModelProperty(name = "나눔/판매 이미지 경로")
    private String image;

    public DealPhotoListRes(String image) {
        this.image = image;
    }
}
