package com.suyang.incense.db.repository.perfume;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@RequiredArgsConstructor
@Repository
public class PerfumeCustomRepositoryImpl implements PerfumeCustomRepository {

    private final JPAQueryFactory jpaQueryFactory;



}
