package com.suyang.incense.db.repository.deal;

import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.suyang.incense.api.response.deal.DealPhotoListRes;
import com.suyang.incense.db.entity.deal.DealPhoto;
import java.util.List;

import com.suyang.incense.db.entity.deal.QDeal;
import com.suyang.incense.db.entity.deal.QDealPhoto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class DealPhotoCustomRepositoryImpl implements DealPhotoCustomRepository{

  private final JPAQueryFactory jpaQueryFactory;

  QDealPhoto qDealPhoto = QDealPhoto.dealPhoto;
  QDeal qDeal = QDeal.deal;

  public List<DealPhotoListRes> findImagesByDealId(Long dealId) {

    return jpaQueryFactory
            .select(Projections.constructor(DealPhotoListRes.class,
                    qDealPhoto.image
            ))
            .from(qDealPhoto)
            .where(eqDealId(dealId))
            .orderBy(qDealPhoto.image.asc())
            .fetch();
  }

  private BooleanExpression eqDealId(Long dealId) {
    if(dealId.equals(null)){
      return null;
    }
    return qDeal.id.eq(dealId);
  }
}
