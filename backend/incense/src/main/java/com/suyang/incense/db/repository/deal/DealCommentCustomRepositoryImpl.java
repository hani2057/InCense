package com.suyang.incense.db.repository.deal;

import com.querydsl.core.Tuple;
import com.querydsl.core.types.Expression;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.suyang.incense.api.response.deal.DealCommentRes;
import com.suyang.incense.api.response.deal.QDealCommentRes;
import com.suyang.incense.api.response.deal.QDealCommentRes_CommentReplyRes;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import static com.querydsl.core.group.GroupBy.groupBy;
import static com.querydsl.core.types.dsl.Expressions.list;
import static com.querydsl.core.types.dsl.Expressions.set;
import static com.suyang.incense.db.entity.deal.QCommentReply.commentReply;
import static com.suyang.incense.db.entity.deal.QDealComment.dealComment;
import static java.util.stream.Collectors.toList;

@Repository
@RequiredArgsConstructor
public class DealCommentCustomRepositoryImpl implements DealCommentCustomRepository{

    private final JPAQueryFactory jpaQueryFactory;

    public List<DealCommentRes> getComments() {

//        //원 댓글 시퀀스 넘버, 대댓글 dto
//        Map<Long, DealCommentRes> transform = jpaQueryFactory
//                .from(dealComment)
//                .join(commentReply).on(commentReply.dealComment.eq(dealComment))
//                .transform(groupBy(dealComment.id).as(new QDealCommentRes(
//                        (Expression<Long>) dealComment.id.as("commentId"),
//                        (Expression<String>) dealComment.member.nickname.as("writer"),
//                        (Expression<String>) dealComment.content.as("content"),
//                        (Expression<LocalDateTime>) dealComment.createdDate.as("createdDate"),
//                        (Expression<Byte>) dealComment.isSecret.as("isSecret"),
//                        (Expression<? extends Set<DealCommentRes.CommentReplyRes>>) set(new QDealCommentRes_CommentReplyRes(
//                                commentReply.dealComment.id.as("parentId"),
//                                commentReply.id.as("commentId"),
//                                commentReply.member.nickname.as("writer"),
//                                commentReply.content.as("content"),
//                                commentReply.createdDate.as("createdDate"),
//                                commentReply.isSecret.as("isSecret")
//                        ))
//                )));
//
//        return transform.keySet().stream()
//                .map(transform::get)
//                .collect(toList());
//
////        return transform.keySet().stream()
////                .map(transform::get)
////                .collect(toList());
//
////        List<DealCommentRes> resultMap = jpaQueryFactory
////                .selectFrom(dealComment)
////                .join(commentReply).on(commentReply.dealComment.eq(dealComment))
////                .transform(groupBy(dealComment.id)
////                        .list(
////                            Projections.constructor(DealCommentRes.class,
////                                    dealComment.id.as("commentId"),
////                                    dealComment.member.nickname.as("writer"),
////                                    dealComment.content.as("content"),
////                                    dealComment.createdDate.as("createdDate"),
////                                    dealComment.isSecret.as("isSecret"),
////                                    list(Projections.bean(DealCommentRes.CommentReplyRes.class,
////                                            commentReply.dealComment.id.as("parentId"),
////                                            commentReply.id.as("commentId"),
////                                            commentReply.member.nickname.as("writer"),
////                                            commentReply.content.as("content"),
////                                            commentReply.createdDate.as("createdDate"),
////                                            commentReply.isSecret.as("isSecret")
////                                    ))
////                            )
////                        )
////                );
////
////        return resultMap;
//
    }
}
