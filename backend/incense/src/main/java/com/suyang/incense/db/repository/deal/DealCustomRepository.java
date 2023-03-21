package com.suyang.incense.db.repository.deal;

import com.suyang.incense.api.response.deal.DealDetailRes;

public interface DealCustomRepository {

    DealDetailRes findDealById(Long dealId);

}
