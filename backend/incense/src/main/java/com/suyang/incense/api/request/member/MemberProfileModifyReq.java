package com.suyang.incense.api.request.member;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@ApiModel("MemberProfileModifyReq")
public class MemberProfileModifyReq {

    @ApiModelProperty(name = "프로필 이미지")
    private MultipartFile image;
}
