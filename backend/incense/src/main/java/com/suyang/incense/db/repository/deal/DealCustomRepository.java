package com.suyang.incense.db.repository.deal;

import com.suyang.incense.api.request.deal.DealConditionReq;
import com.suyang.incense.api.response.deal.DealDetailRes;
import com.suyang.incense.api.response.deal.DealListRes;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface DealCustomRepository {

    DealDetailRes findDealById(Long dealId);

    Page<DealListRes> getAllDeals(DealConditionReq dealConditionReq, Pageable pageable);

}
