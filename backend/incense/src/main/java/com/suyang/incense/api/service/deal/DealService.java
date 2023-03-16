package com.suyang.incense.api.service.deal;

import com.suyang.incense.api.request.deal.DealReq;
import com.suyang.incense.db.entity.deal.Deal;

public interface DealService {

  Deal create(DealReq dealReq, Long memberId, Long perfumeId);

}
