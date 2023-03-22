package com.suyang.incense.api.service.deal;

import com.suyang.incense.api.request.deal.DealCommentReq;
import com.suyang.incense.db.entity.deal.CommentReply;
import com.suyang.incense.db.entity.deal.Deal;
import com.suyang.incense.db.entity.deal.DealComment;
import com.suyang.incense.db.entity.member.Member;
import com.suyang.incense.db.repository.deal.CommentReplyRepository;
import com.suyang.incense.db.repository.deal.DealCommentRepository;
import com.suyang.incense.db.repository.deal.DealRepository;
import com.suyang.incense.db.repository.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class DealCommentServiceImpl  implements DealCommentService {

    private final DealCommentRepository dealCommentRepository;
    private final CommentReplyRepository commentReplyRepository;
    private final MemberRepository memberRepository;
    private final DealRepository dealRepository;

    @Transactional
    public void create(Long dealId, Long memberId, DealCommentReq dealCommentReq) {

        Member member = memberRepository.findById(memberId).orElseThrow(IllegalArgumentException::new);
        Deal deal = dealRepository.findById(dealId).orElseThrow(IllegalArgumentException::new);

        Long parentId = dealCommentReq.getParentId();
        if(parentId == null){

            DealComment dealComment = new DealComment();
            dealComment.setMember(member);
            dealComment.setDeal(deal);
            dealComment.setContent(dealCommentReq.getContent());
            dealComment.setIsSecret(dealCommentReq.getIsSecret());

            dealCommentRepository.save(dealComment);
        } else{     //대댓글

            DealComment parentComment = dealCommentRepository.findById(dealCommentReq.getParentId()).orElseThrow(IllegalArgumentException::new);

            CommentReply commentReply = new CommentReply();
            commentReply.setDealComment(parentComment);
            commentReply.setMember(member);
            commentReply.setContent(dealCommentReq.getContent());
            commentReply.setIsSecret(dealCommentReq.getIsSecret());

            //부모 댓글이 비밀댓글인 경우, 무조건 대댓글도 비밀댓글이 되도록 설정한다.
            if(parentComment.getIsSecret() == 1 && dealCommentReq.getIsSecret() == 0){
                commentReply.setIsSecret((byte)1);
            }

            commentReplyRepository.save(commentReply);

        }

    }
}
