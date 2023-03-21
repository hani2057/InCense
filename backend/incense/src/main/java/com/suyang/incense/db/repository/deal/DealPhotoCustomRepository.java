package com.suyang.incense.db.repository.deal;

import com.suyang.incense.api.response.deal.DealPhotoListRes;
import com.suyang.incense.db.entity.deal.DealPhoto;
import java.util.List;

public interface DealPhotoCustomRepository {

  List<DealPhotoListRes> findImagesByDealId(Long dealId);

}
