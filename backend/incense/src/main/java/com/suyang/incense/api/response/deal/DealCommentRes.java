package com.suyang.incense.api.response.deal;

import com.querydsl.core.annotations.QueryProjection;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.*;

@Getter
@Setter
@Builder
@ApiModel("DealCommentRes")
public class DealCommentRes {

    @ApiModelProperty(name = "나눔/판매 댓글 시퀀스 넘버", example = "1")
    private Long commentId;

    @ApiModelProperty(name = "나눔/판매 댓글 작성자 닉네임", example = "헤일리")
    private String writer;

    @ApiModelProperty(name = "나눔/판매 댓글 내용", example = "댓글 내용 ...")
    private String content;

    @ApiModelProperty(name = "나눔/판매 댓글 작성일자", example = "2023.03.23 11:09")
    private LocalDateTime createdDate;

    @ApiModelProperty(name = "나눔/판매 댓글 비밀 여부] 0: 공개 1: 비공개", example = "0")
    private byte isSecret;

    @ApiModelProperty(name = "나눔/판매 대댓글 리스트", example = "")
    @Builder.Default
    private Set<CommentReplyRes> children = new HashSet<>();

    public DealCommentRes() {
    }

    @QueryProjection
    public DealCommentRes(Long commentId, String writer, String content, LocalDateTime createdDate, byte isSecret, Set<CommentReplyRes> children) {
        this.commentId = commentId;
        this.writer = writer;
        this.content = content;
        this.createdDate = createdDate;
        this.isSecret = isSecret;
        this.children = children;
    }

    @Getter
    @Setter
    @Builder
    @ApiModel("CommentReplyRes")
    public static class CommentReplyRes {

        @ApiModelProperty(name = "나눔/판매 부모 댓글 시퀀스 넘버", example = "1")
        private Long parentId;

        @ApiModelProperty(name = "나눔/판매 대댓글 시퀀스 넘버", example = "1")
        private Long commentId;

        @ApiModelProperty(name = "나눔/판매 대댓글 작성자", example = "대댓글 작성자 닉네임")
        private String writer;

        @ApiModelProperty(name = "나눔/판매 대댓글 내용", example = "대댓글 내용.........")
        private String content;

        @ApiModelProperty(name = "나눔/판매 대댓글 작성일자", example = "2023.03.23 13:21")
        private LocalDateTime createdDate;

        @ApiModelProperty(name = "나눔/판매 대댓글 비밀 여부] 0: 공개 1: 비공개", example = "1")
        private byte isSecret;

        private CommentReplyRes() {}

        @QueryProjection
        public CommentReplyRes(Long parentId, Long commentId, String writer, String content, LocalDateTime createdDate, byte isSecret) {
            this.parentId = parentId;
            this.commentId = commentId;
            this.writer = writer;
            this.content = content;
            this.createdDate = createdDate;
            this.isSecret = isSecret;
        }
    }

}