package com.suyang.incense.db.repository.perfume;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.suyang.incense.api.request.perfume.PerfumeReq;
import com.suyang.incense.api.request.perfume.PerfumeSort;
import com.suyang.incense.db.entity.deal.QDealComment;
import com.suyang.incense.db.entity.note.Note;
import static com.suyang.incense.db.entity.note.QNote.note;
import com.suyang.incense.db.entity.perfume.Brand;
import com.suyang.incense.db.entity.perfume.Perfume;
import static com.suyang.incense.db.entity.perfume.QBrand.brand;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import static com.suyang.incense.db.entity.perfume.QPerfume.perfume;
import java.util.List;

@RequiredArgsConstructor
@Repository
public class PerfumeCustomRepositoryImpl implements PerfumeCustomRepository {

    private final int PAGE_CNT=10;
    private final JPAQueryFactory jpaQueryFactory;


    @Override
    public List<Perfume> getPerfumeList(PerfumeReq perfumeReq) {
        List<Brand> brandList = jpaQueryFactory.selectFrom(brand).where(brand.name.in(perfumeReq.getBrand())).fetch();
        List<Note> noteList = jpaQueryFactory.selectFrom(note).where().fetch();


        OrderSpecifier orderSpecifier =brand.id.desc();

        PerfumeSort perfumeEnum = PerfumeSort.valueOf(perfumeReq.getSorted());

        switch(perfumeEnum){
            case RECENT:
                break;
            case COMMENT:
                break;
            case POPULAR:
                break;
        }


        List<Perfume> perfumeList = jpaQueryFactory.selectFrom(perfume)
                .leftJoin(brand).fetchJoin()
                .leftJoin(note).fetchJoin()
//                .where(
//                        perfume.brand.in(brandList),
//                        perfumeReq.getSearch() != null ?
//                                perfume.name.like("%" + perfumeReq.getSearch() + "%")
//                                        .or(perfume.brand.name.like("%" + perfumeReq.getSearch() + "%")) :
//                                null,
//                        perfume.concentration.in(perfumeReq.getConcentration())
//                )
//                .offset((perfumeReq.getPage() - 1) * PAGE_CNT)
//                .limit(PAGE_CNT)
//                .orderBy(orderSpecifier != null ? orderSpecifier: perfume.id.asc()) // orderSpecifier 변수가 null일 경우 id를 기준으로 오름차순 정렬
                .fetch();

//        List<Perfume> perfumeList = jpaQueryFactory.selectFrom(perfume).leftJoin(brand).fetchJoin().leftJoin(note).fetchJoin().where(
//                perfume.brand.in(brandList),
//                perfumeReq.getSearch()!=null? perfume.name.like("%"+perfumeReq.getSearch()+"%")
//                        .or(perfume.brand.name.like("%"+perfumeReq.getSearch()+"%")):null,perfume.concentration.in(perfumeReq.getConcentration()))
//                .offset((perfumeReq.getPage()-1)*PAGE_CNT).limit(PAGE_CNT).orderBy(orderSpecifier).fetch();
        return perfumeList;
    }
}
