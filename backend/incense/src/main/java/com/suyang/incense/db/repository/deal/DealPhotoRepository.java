package com.suyang.incense.db.repository.deal;

import com.suyang.incense.db.entity.deal.DealPhoto;
import java.util.List;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DealPhotoRepository extends CrudRepository<DealPhoto, Long>, DealPhotoCustomRepository {

  DealPhoto save(DealPhoto dealPhoto);

  void deleteAllByDealId(Long dealId);
}
