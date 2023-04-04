package com.suyang.incense.api.service.deal;

import com.querydsl.core.Tuple;
import com.suyang.incense.api.request.deal.DealCommentReq;
import com.suyang.incense.api.response.deal.DealCommentRes;
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

import java.util.List;

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

        System.out.println("부모 댓글 시퀀스 넘버..............................: "+parentId);

        if(parentId == null){

            DealComment dealComment = new DealComment();
            dealComment.setMember(member);
            dealComment.setDeal(deal);
            dealComment.setContent(dealCommentReq.getContent());
            dealComment.setIsSecret(dealCommentReq.getIsSecret());

            dealCommentRepository.save(dealComment);

        } else{     //대댓글

            System.out.println("대댓글 생성......................................");

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

    @Transactional
    public boolean update(Long commentId, Long memberId, DealCommentReq dealCommentReq) {

        if(dealCommentReq.getParentId() == null){
            DealComment dealComment = dealCommentRepository.findById(commentId).orElseThrow(IllegalArgumentException::new);

            if(dealComment.getMember().getId() != memberId){
                return false;
            }

            dealComment.setContent(dealCommentReq.getContent());
            dealComment.setIsSecret(dealCommentReq.getIsSecret());

        } else{
            CommentReply commentReply = commentReplyRepository.findById(commentId).orElseThrow(IllegalArgumentException::new);

            if(commentReply.getMember().getId() != memberId){
                return false;
            }

            commentReply.setContent(dealCommentReq.getContent());
        }
        return true;
    }

    @Transactional
    public boolean delete(String type, Long commentId, Long memberId) {

        if(type.equals("parent")){
            DealComment dealComment = dealCommentRepository.findById(commentId).orElseThrow(IllegalArgumentException::new);
            if(dealComment.getMember().getId() != memberId){
                return false;
            }
            dealCommentRepository.deleteById(commentId);

        } else if(type.equals("child")){
            CommentReply commentReply = commentReplyRepository.findById(commentId).orElseThrow(IllegalArgumentException::new);
            if(commentReply.getMember().getId() != memberId){
                return false;
            }
            commentReplyRepository.deleteById(commentId);
        }
        return true;
    }

    public List<DealCommentRes> getComments(Long dealId) {

        return dealCommentRepository.getComments(dealId);
    }
}
