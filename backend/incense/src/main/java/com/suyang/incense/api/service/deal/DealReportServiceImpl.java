package com.suyang.incense.api.service.deal;

import com.suyang.incense.api.request.deal.DealReportReq;
import com.suyang.incense.db.entity.deal.Deal;
import com.suyang.incense.db.entity.deal.DealReport;
import com.suyang.incense.db.entity.member.Member;
import com.suyang.incense.db.repository.deal.DealReportRepository;
import com.suyang.incense.db.repository.deal.DealRepository;
import com.suyang.incense.db.repository.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class DealReportServiceImpl implements DealReportService{

    private final MemberRepository memberRepository;
    private final DealRepository dealRepository;
    private final DealReportRepository dealReportRepository;

    @Transactional
    public void createReport(DealReportReq dealReportReq, Long memberId) {

        Member member = memberRepository.findById(memberId).orElseThrow(IllegalArgumentException::new);
        Deal deal = dealRepository.findById(dealReportReq.getDealId()).orElseThrow(IllegalArgumentException::new);

        DealReport dealReport = new DealReport();
        dealReport.setDeal(deal);
        dealReport.setMember(member);
        dealReport.setContent(dealReportReq.getContent());

        dealReportRepository.save(dealReport);
    }
}
