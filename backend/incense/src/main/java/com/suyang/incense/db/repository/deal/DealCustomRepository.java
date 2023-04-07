package com.suyang.incense.db.repository.deal;

import com.suyang.incense.api.request.deal.DealConditionReq;
import com.suyang.incense.api.response.deal.DealDetailRes;
import com.suyang.incense.api.response.deal.DealListRes;
import com.suyang.incense.api.response.member.mypage.DealRes;
import com.suyang.incense.db.entity.member.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface DealCustomRepository {

    DealDetailRes findDealById(Long dealId);

    Page<DealListRes> getAllDeals(DealConditionReq dealConditionReq, Pageable pageable);

    List<DealRes> getDealByMember(Member member);

}
