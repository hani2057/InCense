package com.suyang.incense.api.service.deal;

import com.suyang.incense.api.request.deal.DealReportReq;

public interface DealReportService {

    void createReport(DealReportReq dealReportReq, Long memberId);
}
