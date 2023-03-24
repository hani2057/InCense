package com.suyang.incense.api.response.deal;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.querydsl.core.annotations.QueryProjection;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@ApiModel("CommentReplyRes")
public class CommentReplyRes {

    @ApiModelProperty(name = "나눔/판매 대댓글 시퀀스 넘버", example = "1")
    private Long commentId;

    @ApiModelProperty(name = "나눔/판매 부모 댓글 시퀀스 넘버", example = "1")
    private Long parentId;

    @ApiModelProperty(name = "나눔/판매 대댓글 작성자", example = "대댓글 작성자 닉네임")
    private String writer;

    @ApiModelProperty(name = "나눔/판매 대댓글 내용", example = "대댓글 내용.........")
    private String content;

    @ApiModelProperty(name = "나눔/판매 대댓글 작성일자", example = "2023.03.23 13:21")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime createdDate;

    @ApiModelProperty(name = "나눔/판매 대댓글 비밀 여부] 0: 공개 1: 비공개", example = "1")
    private Byte isSecret;

    @QueryProjection
    public CommentReplyRes(Long commentId, Long parentId, String writer, String content, LocalDateTime createdDate, Byte isSecret) {
        this.commentId = commentId;
        this.parentId = parentId;
        this.writer = writer;
        this.content = content;
        this.createdDate = createdDate;
        this.isSecret = isSecret;
    }

}
