package com.suyang.incense.api.request.member;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("MemberInfoModifyReq")
public class MemberInfoModifyReq {

    @ApiModelProperty(name = "닉네임")
    private String nickname;

    @ApiModelProperty(name = "성별 공개 여부")
    private byte birthOpen;

    @ApiModelProperty(name = "생년월일 공개 여부")
    private byte genderOpen;

    @ApiModelProperty(name = "알람 수신 여부")
    private byte alarmOpen;
}
