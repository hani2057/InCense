package com.suyang.incense.db.repository.perfume;


import com.querydsl.core.Tuple;
import com.querydsl.core.types.Expression;
import com.querydsl.core.types.ExpressionUtils;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.NumberExpression;
import com.querydsl.core.types.dsl.NumberPath;
import com.querydsl.core.types.dsl.StringPath;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.JPQLQuery;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.suyang.incense.api.request.perfume.PerfumeReq;
import com.suyang.incense.api.request.perfume.PerfumeSort;

import static com.suyang.incense.db.entity.relation.QMemberPerfume.memberPerfume;
import static com.suyang.incense.db.entity.relation.QPerfumeNote.perfumeNote;
import com.suyang.incense.db.entity.deal.QDealComment;
import com.suyang.incense.db.entity.note.Note;
import static com.suyang.incense.db.entity.note.QNote.note;

import com.suyang.incense.db.entity.note.Type;
import com.suyang.incense.db.entity.perfume.Brand;
import com.suyang.incense.db.entity.perfume.Perfume;
import static com.suyang.incense.db.entity.perfume.QBrand.brand;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import static com.suyang.incense.db.entity.perfume.QPerfume.perfume;
import static com.suyang.incense.db.entity.review.QReview.review;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Repository
public class PerfumeCustomRepositoryImpl implements PerfumeCustomRepository {

    private final int PAGE_CNT=10;
    private final JPAQueryFactory jpaQueryFactory;


    @Override
    public List<Perfume> getPerfumeList(PerfumeReq perfumeReq) {
        List<Brand> brandList = null;
        List<Note> topNoteList = null;

        if(perfumeReq.getBrand()!=null){
            brandList = jpaQueryFactory.selectFrom(brand).where(brand.name.in(perfumeReq.getBrand())).fetch();
        }

        if(perfumeReq.getScent()!=null){
            topNoteList = jpaQueryFactory.selectFrom(note).where(note.name.in(perfumeReq.getScent()),note.type.eq(Type.valueOf("TOP"))).fetch();
        }



        PerfumeSort perfumeEnum = PerfumeSort.valueOf(perfumeReq.getSorted());

        OrderSpecifier orderSpecifier = null;
        Expression orders = null;
        StringPath orderPath = null ;


        switch(perfumeEnum){
            case RECENT:
                break;
            case COMMENT:
                orders = ExpressionUtils.as(JPAExpressions
                                .select(perfume.count())
                                .from(perfume)
                                .join(perfume.memberPerfumeList, memberPerfume)
                                .join(memberPerfume.review, review)
                        , "orders");
                orderPath = Expressions.stringPath("orders");
                orderSpecifier =  orderPath.desc();
                break;
            case POPULAR:
                orders = ExpressionUtils.as(JPAExpressions
                                .select(perfume.count())
                                .from(perfume)
                                .join(perfume.memberPerfumeList, memberPerfume)
                                .join(memberPerfume.review, review)
                        , "orders");
                orderPath = Expressions.stringPath("orders");
                orderSpecifier =  orderPath.desc();
                break;
        }

        List<Perfume> perfumeList = new ArrayList<>();


        List<Tuple> tuples = jpaQueryFactory.select(perfume,orders)
                .from(perfume)
                .leftJoin(perfume.brand,brand).fetchJoin()
                .leftJoin(perfume.perfumeNoteList,perfumeNote).fetchJoin()
                .leftJoin(perfumeNote.note,note).fetchJoin()
                .where(
                        brandList!=null?
                                perfume.brand.in(brandList):null,
                        topNoteList!=null?perfumeNote.note.in(topNoteList):null
                        ,
                        perfumeReq.getSearch() != null ?
                                perfume.name.like("%" + perfumeReq.getSearch() + "%")
                                        .or(perfume.brand.name.like("%" + perfumeReq.getSearch() + "%")) :
                                null,
                        perfumeReq.getConcentration()!=null?
                                perfume.concentration.in(perfumeReq.getConcentration()):null

                )
                .offset((perfumeReq.getPage() - 1) * PAGE_CNT)
                .limit(PAGE_CNT)
                .orderBy(orderSpecifier != null ?orderSpecifier:perfume.id.asc()) // orderSpecifier 변수가 null일 경우 id를 기준으로 오름차순 정렬
                .fetch();

        for(Tuple tuple: tuples){
            Perfume perfumeTemp = tuple.get(perfume);
            Long t = (Long)tuple.get(orders);
            System.out.println("reviewCount" +t);
            perfumeList.add(perfumeTemp);
        }

        return perfumeList;
    }

    @Override
    public Perfume getPerfume(Long perfumeId){
        Perfume perfume1 = jpaQueryFactory.selectFrom(perfume)
                .from(perfume)
                .leftJoin(perfume.brand,brand).fetchJoin()
                .leftJoin(perfume.perfumeNoteList,perfumeNote).fetchJoin()
                .leftJoin(perfumeNote.note,note).fetchJoin()
                .where(
                        perfume.id.eq(perfumeId)
                )
                .fetchOne();

        return perfume1;
    }
}



