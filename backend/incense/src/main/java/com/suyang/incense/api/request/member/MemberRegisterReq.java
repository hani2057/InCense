package com.suyang.incense.api.request.member;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@ApiModel("MemberRegisterReq")
public class MemberRegisterReq {

    @ApiModelProperty(name = "이메일")
    private String email;

    @ApiModelProperty(name = "소셜 로그인 타입 (kakao / naver)", example = "kakao")
    private String type;

    @ApiModelProperty(name = "닉네임")
    private String nickname;

    @ApiModelProperty(name = "성별", example = "0: 남자, 1: 여자")
    private Byte gender;

    @ApiModelProperty(name = "생일", example = "1997-03-09")
    private LocalDate birth;

    @ApiModelProperty(name = "생일 공개 여부", example = "0: 비공개, 1: 공개")
    private byte birthOpen;

    @ApiModelProperty(name = "성별 공개 여부", example = "0: 비공개, 1: 공개")
    private byte genderOpen;

    @ApiModelProperty(name = "알람 수신 여부", example = "0: 수신안함, 1: 수신")
    private byte alarmOpen;

}
