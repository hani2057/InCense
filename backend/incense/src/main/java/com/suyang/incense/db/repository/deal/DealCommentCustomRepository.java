package com.suyang.incense.db.repository.deal;

import com.querydsl.core.Tuple;
import com.suyang.incense.api.response.deal.DealCommentRes;

import java.util.List;

public interface DealCommentCustomRepository {

    List<DealCommentRes> getComments();
}
