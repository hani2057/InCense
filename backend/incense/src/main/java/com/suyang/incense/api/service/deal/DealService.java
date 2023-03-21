package com.suyang.incense.api.service.deal;

import com.suyang.incense.api.request.deal.DealReq;
import com.suyang.incense.api.response.deal.DealDetailRes;
import com.suyang.incense.db.entity.deal.Deal;

import java.io.IOException;

public interface DealService {

  Deal create(DealReq dealReq, Long memberId);

  Deal update(DealReq dealReq, Long dealId, Long memberId);

  boolean delete(Long dealId, Long memberId) throws IOException;

  DealDetailRes getDeal(Long dealId);

}
