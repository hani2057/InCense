package com.suyang.incense.db.repository.deal;

import com.querydsl.core.Tuple;
import com.suyang.incense.api.response.deal.DealCommentRes;
import com.suyang.incense.db.entity.deal.DealComment;

import java.util.List;

public interface DealCommentCustomRepository {

    List<DealCommentRes> getComments(Long dealId);

    int getCommentCount(Long dealId);

}
