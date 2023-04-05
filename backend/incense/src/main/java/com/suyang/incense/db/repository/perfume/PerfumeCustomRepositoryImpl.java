package com.suyang.incense.db.repository.perfume;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.*;;
import com.querydsl.core.util.StringUtils;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.suyang.incense.api.request.perfume.PerfumeReq;
import com.suyang.incense.api.request.perfume.PerfumeSort;
import com.suyang.incense.api.response.perfume.PerfumeRes;
import com.suyang.incense.api.response.perfume.PerfumeSimpleRes;
import com.suyang.incense.api.response.perfume.SimilarPerfumeRes;
import com.suyang.incense.db.entity.perfume.Perfume;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.suyang.incense.db.entity.note.QNote.note;
import static com.suyang.incense.db.entity.perfume.QBrand.brand;
import static com.suyang.incense.db.entity.perfume.QPerfume.perfume;
import static com.suyang.incense.db.entity.relation.QMemberPerfume.memberPerfume;
import static com.suyang.incense.db.entity.relation.QPerfumeNote.perfumeNote;

@RequiredArgsConstructor
@Repository
public class PerfumeCustomRepositoryImpl implements PerfumeCustomRepository {


    private final JPAQueryFactory jpaQueryFactory;


    @Override
    public List<Perfume> getPerfumeList(PerfumeReq perfumeReq, Pageable pageable) {

        List<Perfume> perfumeList = null;

        perfumeList =  jpaQueryFactory.select(perfume)
                .from(perfume)
                .leftJoin(perfume.memberPerfumeList,memberPerfume)
                .leftJoin(perfume.perfumeNoteList,perfumeNote)
                .leftJoin(perfumeNote.note,note)
                .leftJoin(perfume.brand,brand)
                .where(
                        eqSearch(perfumeReq),
                        eqBrandList(perfumeReq),
                        eqConcentrationList(perfumeReq),
                        eqTopNoteList(perfumeReq)
                )
                .groupBy(perfume.id)
                .orderBy(
                    orders(perfumeReq)
                )
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        return perfumeList;
    }
    @Override
    public Long getCount(PerfumeReq perfumeReq) {
        JPAQuery<Long> countQuery =  jpaQueryFactory.select(perfume.id.countDistinct())
                .from(perfume)
                .leftJoin(perfume.memberPerfumeList,memberPerfume)
                .leftJoin(perfume.perfumeNoteList,perfumeNote)
                .leftJoin(perfumeNote.note,note)
                .leftJoin(perfume.brand,brand)
                .where(
                        eqSearch(perfumeReq),
                        eqBrandList(perfumeReq),
                        eqConcentrationList(perfumeReq),
                        eqTopNoteList(perfumeReq)
                );

        return countQuery.fetchOne();
    }

    public PerfumeSimpleRes findPerfumeNameAndBrandByPerfumeId(Long perfumeId) {

        return jpaQueryFactory.select(
                Projections.constructor(PerfumeSimpleRes.class,
                        perfume.name,
                        brand.name,
                        perfume.image
                        ))
                .from(perfume)
                .innerJoin(perfume.brand, brand)
                .where(perfume.id.eq(perfumeId))
                .fetchFirst();
    }

    public SimilarPerfumeRes getSimilarPerfumeResData(Long perfumeId) {

        return jpaQueryFactory.select(
                Projections.constructor(SimilarPerfumeRes.class,
                        perfume.id,
                        perfume.name,
                        brand.name,
                        perfume.image))
                .from(perfume)
                .innerJoin(perfume.brand, brand)
                .where(perfume.id.eq(perfumeId))
                .fetchOne();

    }

    public BooleanExpression eqSearch(PerfumeReq perfumeReq){
        if(StringUtils.isNullOrEmpty(perfumeReq.getSearch())){
            return null;
        }

        return   perfume.name.upper().like("%" + perfumeReq.getSearch().toUpperCase() + "%")
                .or(perfume.brand.name.upper().like("%" + perfumeReq.getSearch().toUpperCase()+ "%"));
    }

    public BooleanExpression eqBrandList(PerfumeReq perfumeReq) {
        if(perfumeReq.getBrand()==null || perfumeReq.getBrand().size()==0){
            return null;
        }
        return  perfume.brand.id.in(perfumeReq.getBrand());
    }

    public BooleanExpression eqConcentrationList(PerfumeReq perfumeReq){
        if(perfumeReq.getConcentration()==null || perfumeReq.getConcentration().size()==0){
            return null;
        }

        return  perfume.concentration.in(perfumeReq.getConcentration());
    }

    public BooleanExpression eqTopNoteList(PerfumeReq perfumeReq){
        if(perfumeReq.getScent()==null || perfumeReq.getScent().size()==0){
            return null;
        }

        return note.id.in(perfumeReq.getScent());

    }


    public OrderSpecifier  orders(PerfumeReq perfumeReq){

        PerfumeSort perfumeEnum = null;
        OrderSpecifier orderSpecifier = null;

        if(perfumeReq.getSorted()==null){
            perfumeEnum = PerfumeSort.COMMON;
        }
        else{
            try{
                perfumeEnum = PerfumeSort.valueOf(perfumeReq.getSorted());
            }
            catch (Exception e){
                perfumeEnum = PerfumeSort.COMMON;
            }

        }

        switch(perfumeEnum){
            case COMMON:
                orderSpecifier =  perfume.id.asc();
                break;
            case COMMENT:
                orderSpecifier = perfume.commentCnt.desc();
                break;
            case POPULAR:
                orderSpecifier = perfume.popularCnt.desc();
                break;
            default:
                break;
        }

        return orderSpecifier;

    }

}



