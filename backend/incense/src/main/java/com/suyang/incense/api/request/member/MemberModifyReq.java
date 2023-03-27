package com.suyang.incense.api.request.member;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@ApiModel("MemberModifyReq")
public class MemberModifyReq {

    @ApiModelProperty(name = "프로필 이미지")
    private MultipartFile image;

    @ApiModelProperty(name = "닉네임")
    private String nickname;

    @ApiModelProperty(name = "성별 공개 여부")
    private byte birthOpen;

    @ApiModelProperty(name = "생년월일 공개 여부")
    private byte genderOpen;

    @ApiModelProperty(name = "알람 수신 여부")
    private byte alarmOpen;
}
