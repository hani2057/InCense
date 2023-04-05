package com.suyang.incense.db.repository.deal;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.suyang.incense.api.request.deal.DealConditionReq;
import com.suyang.incense.api.response.deal.DealDetailRes;
import static com.suyang.incense.db.entity.deal.QDeal.deal;
import static com.suyang.incense.db.entity.member.QGrade.grade;
import static com.suyang.incense.db.entity.member.QMember.member;
import static com.suyang.incense.db.entity.perfume.QBrand.brand;
import static com.suyang.incense.db.entity.perfume.QPerfume.perfume;
import static com.suyang.incense.db.entity.relation.QPerfumeNote.perfumeNote;

import com.suyang.incense.api.response.deal.DealListRes;
import com.suyang.incense.api.response.member.mypage.DealRes;
import com.suyang.incense.db.entity.deal.Gubun;
import com.suyang.incense.db.entity.member.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.*;


@Repository
@RequiredArgsConstructor
public class DealCustomRepositoryImpl implements DealCustomRepository {

    private final DealCommentRepository dealCommentRepository;

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

    public Page<DealListRes> getAllDeals(DealConditionReq dealConditionReq, Pageable pageable) {

        List<DealListRes> result = jpaQueryFactory
                .select(
                        Projections.constructor(
                        DealListRes.class,
                        deal.id,
                        deal.gubun,
                        deal.createdDate,
                        deal.buyDate,
                        deal.title,
                        deal.volume,
                        deal.price,
                        deal.isDelivery,
                        deal.isClosed,
                        member.nickname,
                        brand.name,
                        perfume.name,
                        perfume.image
                        ))
                .from(deal)
                .innerJoin(member).on(deal.member.id.eq(member.id))
                .innerJoin(perfume).on(deal.perfume.id.eq(perfume.id))
                .innerJoin(perfumeNote).on(perfume.id.eq(perfumeNote.perfume.id))
                .innerJoin(brand).on(perfume.brand.id.eq(brand.id))
                .where(
                        eqGubun(dealConditionReq.getGubun()),
                        deliveryCheck(dealConditionReq.getTransaction()),
                        closeCheck(dealConditionReq.getClose()),
                        perfumeBrandCheck(dealConditionReq.getBrands()),
                        noteCheck(dealConditionReq.getScents())
                )
                .orderBy(deal.createdDate.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .distinct().fetch();

        Long count = getAllDealsCount(dealConditionReq);
        System.out.println("count................................................." + count);

        return new PageImpl<>(result, pageable, count);
    }

    //리스트 조회 시 paeable을 위해 개수 구하기
    private Long getAllDealsCount(DealConditionReq dealConditionReq){

        Long count = jpaQueryFactory
                .select(deal.countDistinct())
                .from(deal)
                .innerJoin(perfume).on(deal.perfume.id.eq(perfume.id))
                .innerJoin(perfumeNote).on(perfume.id.eq(perfumeNote.perfume.id))
                .where(
                        eqGubun(dealConditionReq.getGubun()),
                        deliveryCheck(dealConditionReq.getTransaction()),
                        closeCheck(dealConditionReq.getClose()),
                        perfumeBrandCheck(dealConditionReq.getBrands()),
                        noteCheck(dealConditionReq.getScents())
                )
                .fetchOne();

        return count;
    }

    //[나눔/판매] 확인
    private BooleanExpression eqGubun(Gubun gubun){
        if(gubun == null){
            return null;
        }
        return deal.gubun.eq(gubun);
    }

    //택배가능여부 확인
    private BooleanExpression deliveryCheck(List<Byte> transaction){
        if(transaction == null || transaction.size() == 0){
            return null;
        }
        return deal.isDelivery.in(transaction);
    }

    //마감여부 확인
    private BooleanExpression closeCheck(List<Byte> close){
        if(close == null || close.size() == 0) {
            return null;
        }
        return deal.isClosed.in(close);
    }

    //향수 브랜드 확인
    private BooleanExpression perfumeBrandCheck(List<Long> brands){
        if(brands == null || brands.size() == 0){
            return null;
        }

        boolean etc = false;
        Collections.sort(brands);
        if(brands.get(0) < 0) etc = true;

        List<Long> brandIds = new ArrayList<>();

        //Calvin Klein, BURBERRY, HUGO BOSS, Roberto Cavalli, DORALL COLLECTION, VERSACE, GUCCI
        Long[] populars = {54L, 24L, 90L, 141L, 137L, 118L, 35L};

        //'기타'가 포함된 경우
        if(etc){
            for(Long id : brands){
                for(int p = 0, len = populars.length; p<len; p++){
                    if(id.equals(populars[p])) {
                        populars[p] = -1L;
                        break;
                    }
                }
            }

            for(int p = 0, len = populars.length; p<len; p++){
                if(!populars[p].equals(-1L)){
                    brandIds.add(populars[p]);
                }
            }

            return perfume.brand.id.notIn(brandIds);

        } else{
            return perfume.brand.id.in(brands);
        }
    }

    //향수 노트 확인
    private BooleanExpression noteCheck(List<Long> scents){
        if(scents == null || scents.size() == 0){
            return null;
        }

        boolean etc = false;
        Collections.sort(scents);
        if(scents.get(0) < 0) etc = true;

        List<Long> scentIds = new ArrayList<>();

        //must, jasmine, amber, floral, sandalwood, vanilla, patchouli
        Long[] populars = {319L, 740L, 46L, 8L, 14L, 23L, 122L};


        //기타가 포함된 경우
        if(etc){
            for(Long id : scents){
                for(int p = 0, len = populars.length; p<len; p++){
                    if(id.equals(populars[p])) {
                        populars[p] = -1L;
                        break;
                    }
                }
            }

            for(int p = 0, len = populars.length; p<len; p++){
                if(!populars[p].equals(-1L)){
                    scentIds.add(populars[p]);
                }
            }

            return perfumeNote.note.id.notIn(scentIds);

        } else{
            return perfumeNote.note.id.in(scents);
        }
    }

    @Override
    public List<DealRes> getDealByMember(Member member) {
//        List<DealRes> result = jpaQueryFactory
//                .select(Projections.constructor(
//                        DealRes.class,
//                        deal.id,
//                        deal.gubun,
//                        deal.createdDate,
//                        deal.title,
//                        brand.name,
//                        perfume.name,
//                        perfume.image,
//                        deal.volume,
//                        deal.price,
//                        deal.isDelivery,
//                        deal.isClosed
//                ))
//                .from(deal, perfume, brand)
//                .where(deal.member.eq(member), deal.perfume.eq(perfume), perfume.brand.eq(brand))
//                .fetch();

        List<DealRes> result = jpaQueryFactory
                .select(Projections.constructor(
                        DealRes.class,
                        deal.id,
                        deal.gubun,
                        deal.createdDate,
                        deal.title,
                        deal.perfume.brand.name,
                        deal.perfume.name,
                        deal.perfume.image,
                        deal.volume,
                        deal.price,
                        deal.isDelivery,
                        deal.isClosed
                ))
                .from(deal)
                .where(deal.member.eq(member))
                .fetch();

        for (DealRes res : result) {
            res.setCommentCount(dealCommentRepository.getCommentCount(res.getDealId()));
        }

        return result;
    }
}
