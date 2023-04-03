package com.suyang.incense.db.repository.deal;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import static com.suyang.incense.db.entity.analysis.QTaste.taste;

@Repository
@RequiredArgsConstructor
public class TasteCustomRepositoryImpl implements TasteCustomRepository{

    private final JPAQueryFactory jpaQueryFactory;

    public String getPreferenceByMemberId(Long memberId) {

        return jpaQueryFactory
                .select(taste.preference)
                .from(taste)
                .where(taste.member.id.eq(memberId))
                .orderBy(taste.createdDate.desc())
                .fetchFirst();
    }
}
