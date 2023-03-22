package com.suyang.incense.api.service.deal;

import com.suyang.incense.api.request.deal.DealCommentReq;

public interface DealCommentService {

    void create(Long dealId, Long memberId, DealCommentReq dealCommentReq);

    boolean update(Long commentId, Long memberId, DealCommentReq dealCommentReq);

    boolean delete(String type, Long commentId, Long memberId);
}
