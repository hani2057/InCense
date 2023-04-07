package com.suyang.incense.db.repository.taste;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.suyang.incense.db.repository.taste.TasteCustomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import static com.suyang.incense.db.entity.analysis.QTaste.taste;

@Repository
@RequiredArgsConstructor
public class TasteCustomRepositoryImpl implements TasteCustomRepository {

    private final JPAQueryFactory jpaQueryFactory;

    public String getPreferenceByMemberId(Long memberId) {

        return jpaQueryFactory
                .select(taste.preference)
                .from(taste)
                .where(taste.member.id.eq(memberId))
                .orderBy(taste.createdDate.desc())
                .fetchFirst();
    }

    public Long getTestCount(Long memberId) {
        return jpaQueryFactory
                .select(taste.count())
                .from(taste)
                .where(taste.member.id.eq(memberId))
                .fetchOne();
    }
}
