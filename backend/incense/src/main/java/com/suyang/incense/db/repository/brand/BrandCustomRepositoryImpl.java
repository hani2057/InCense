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
        List<Brand> brands = jpaQueryFactory.select(brand)
                .from(brand)
                .leftJoin(brand.perfumeList,perfume)
                .orderBy(brand.id.count().desc())
                .groupBy(brand)
                .offset(0)
                .limit(6)
                .fetch();


        return brands;
    }

    @Override
    public List<Brand> getNotInBrandList(List<Long> brandList){
        List<Brand> brands = jpaQueryFactory.select(brand)
                .from(brand)
                .leftJoin(brand.perfumeList,perfume)
                .where(brand.id.notIn(brandList))
                .orderBy(brand.id.count().desc())
                .groupBy(brand)
                .fetch();
        return brands;
    }



}
