package com.suyang.incense.db.repository.deal;

import com.suyang.incense.db.entity.deal.DealPhoto;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class DealPhotoCustomRepositoryImpl implements DealPhotoCustomRepository{

  @Override
  public List<DealPhoto> findAllByDealId(Long DealId) {
    return null;
  }
}
