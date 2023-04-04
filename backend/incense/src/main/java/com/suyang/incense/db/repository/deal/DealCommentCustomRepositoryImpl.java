package com.suyang.incense.db.repository.deal;

import com.querydsl.core.Tuple;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.suyang.incense.api.response.deal.CommentReplyRes;
import com.suyang.incense.api.response.deal.DealCommentRes;
import com.suyang.incense.db.entity.deal.DealComment;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.*;

import static com.suyang.incense.db.entity.deal.QCommentReply.commentReply;
import static com.suyang.incense.db.entity.deal.QDealComment.dealComment;
import static com.suyang.incense.db.entity.member.QMember.member;

@Repository
@RequiredArgsConstructor
public class DealCommentCustomRepositoryImpl implements DealCommentCustomRepository{

    private final JPAQueryFactory jpaQueryFactory;

    public List<DealCommentRes> getComments(Long dealId) {

        List<DealCommentRes> comments = jpaQueryFactory
                .select(Projections.constructor(
                        DealCommentRes.class,
                        dealComment.id,
                        dealComment.member.nickname,
                        dealComment.content,
                        dealComment.createdDate,
                        dealComment.isSecret
                ))
                .from(dealComment)
                .innerJoin(member).on(dealComment.member.id.eq(member.id))
                .where(dealComment.deal.id.eq(dealId))
                .orderBy(dealComment.id.asc())
                .fetch();

        List<CommentReplyRes> replyComments = jpaQueryFactory
                .select(Projections.constructor(
                        CommentReplyRes.class,
                        commentReply.id,
                        commentReply.dealComment.id,
                        commentReply.member.nickname,
                        commentReply.content,
                        commentReply.createdDate,
                        commentReply.isSecret
                ))
                .from(commentReply)
                .innerJoin(dealComment).on(commentReply.dealComment.eq(dealComment))
                .innerJoin(member).on(commentReply.member.eq(member))
                .orderBy(commentReply.dealComment.id.asc())
                .orderBy(commentReply.id.asc())
                .fetch();

        Map<Long, DealCommentRes> resultMap = new HashMap<>();

        for(DealCommentRes comment : comments){
            Long commentId = comment.getCommentId();
            resultMap.put(commentId, comment);
        }

        //resultMap을 순회하면서 key(commentId)에 해당하는 대댓글을 list에 add해준다.
        resultMap.entrySet().stream().forEach(entry -> {
            Long commentId = entry.getKey();
            List<CommentReplyRes> children = entry.getValue().getChildren();
            if(children == null) children = new ArrayList<>();
            boolean history = false;
            for(CommentReplyRes replyComment : replyComments){
                if(commentId == replyComment.getParentId()){
                    history = true;
                    children.add(replyComment);
                } else {
                    if(history) break;
                }
            }
        });

        List<DealCommentRes> result = new ArrayList<>();
        resultMap.entrySet().stream().forEach(entry -> {
            DealCommentRes dealCommentRes = entry.getValue();
            result.add(dealCommentRes);
        });

        return result;
    }

    public int getCommentCount(Long dealId) {

        Long commentCount = jpaQueryFactory
                .select(dealComment.count())
                .from(dealComment)
                .where(dealComment.deal.id.eq(dealId)).fetchOne();

        Long replyCount = jpaQueryFactory
                .select(commentReply.count())
                .from(commentReply)
                .innerJoin(dealComment).on(commentReply.dealComment.eq(dealComment))
                .where(dealComment.id.eq(dealId))
                .fetchOne();

        int comments = Optional.ofNullable(commentCount).orElse(0L).intValue();
        int replys = Optional.ofNullable(replyCount).orElse(0L).intValue();

        return comments + replys;

    }


}
