package com.suyang.incense.api.request.deal;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@ApiModel("DealCommentReq")
public class DealCommentReq {

    @ApiModelProperty(name = "댓글 내용", example = "댓글 내용 어쩌구 저쩌구")
    private String content;

    @ApiModelProperty(name = "비밀 댓글 여부] 0: 공개 1: 비밀댓글", example = "0")
    private byte isSecret;

    @ApiModelProperty(name = "대댓글 여부] 공백일 경우 일반 댓글", example = "")
    private Long parentId;
}
