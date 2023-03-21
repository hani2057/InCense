package com.suyang.incense.db.repository.deal;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.suyang.incense.api.response.deal.DealDetailRes;
import static com.suyang.incense.db.entity.deal.QDeal.deal;
import static com.suyang.incense.db.entity.deal.QDealPhoto.dealPhoto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;


@Repository
@RequiredArgsConstructor
public class DealCustomRepositoryImpl implements DealCustomRepository {

    private final JPAQueryFactory jpaQueryFactory;

    public DealDetailRes findDealById(Long dealId) {

        return null;
    }
}
