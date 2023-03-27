package com.suyang.incense.db.repository.deal;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.suyang.incense.api.response.deal.DealDetailRes;
import static com.suyang.incense.db.entity.deal.QDeal.deal;
import static com.suyang.incense.db.entity.deal.QDealPhoto.dealPhoto;
import static com.suyang.incense.db.entity.member.QGrade.grade;
import static com.suyang.incense.db.entity.member.QMember.member;
import static com.suyang.incense.db.entity.perfume.QBrand.brand;
import static com.suyang.incense.db.entity.perfume.QPerfume.perfume;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;


@Repository
@RequiredArgsConstructor
public class DealCustomRepositoryImpl implements DealCustomRepository {

    private final JPAQueryFactory jpaQueryFactory;

    public DealDetailRes findDealById(Long dealId) {
        DealDetailRes result = jpaQueryFactory
                .select(Projections.constructor(
                        DealDetailRes.class,
                        deal.gubun,
                        deal.title,
                        deal.content,
                        deal.createdDate,
                        deal.isDelivery,
                        deal.isClosed,
                        member.nickname,
                        grade.name,
                        grade.image,
                        brand.name,
                        perfume.name,
                        deal.buyDate,
                        deal.price,
                        deal.volume
                ))
                .from(deal)
                .innerJoin(member).on(deal.member.eq(member))
                .innerJoin(grade).on(member.grade.eq(grade))
                .innerJoin(perfume).on(deal.perfume.eq(perfume))
                .innerJoin(brand).on(perfume.brand.eq(brand))
                .where(deal.id.eq(dealId))
                .fetchOne();

        return result;
    }
}
