package com.suyang.incense.db.repository.brand;

import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.suyang.incense.db.entity.perfume.Brand;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.suyang.incense.db.entity.perfume.QBrand.brand;
import static com.suyang.incense.db.entity.perfume.QPerfume.perfume;


@RequiredArgsConstructor
@Repository
public class BrandCustomRepositoryImpl implements BrandCustomRepository{


    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<Brand> getBrandList(){
        List<Tuple> tuples = jpaQueryFactory.select(brand,brand.id.count())
                .from(brand)
                .leftJoin(brand.perfumeList,perfume)
                .orderBy(brand.id.count().desc())
                .groupBy(brand)
                .fetch();

        return null;
    }



}
