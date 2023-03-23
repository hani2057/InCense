package com.suyang.incense.api.service.deal;

import com.querydsl.core.Tuple;
import com.suyang.incense.api.request.deal.DealCommentReq;
import com.suyang.incense.api.response.deal.DealCommentRes;

import java.util.List;

public interface DealCommentService {

    void create(Long dealId, Long memberId, DealCommentReq dealCommentReq);

    boolean update(Long commentId, Long memberId, DealCommentReq dealCommentReq);

    boolean delete(String type, Long commentId, Long memberId);

    List<DealCommentRes> getComments(Long dealId);
}
