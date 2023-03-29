package com.suyang.incense.db.repository.deal;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.suyang.incense.db.entity.relation.MemberDealBookmark;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import static com.suyang.incense.db.entity.relation.QMemberDealBookmark.memberDealBookmark;

@Repository
@RequiredArgsConstructor
public class DealBookmarkCustomRepositoryImpl implements DealBookmarkCustomRepository{

    private final JPAQueryFactory jpaQueryFactory;

    public MemberDealBookmark findByDealIdAndMemberId(Long dealId, Long memberId) {

        return jpaQueryFactory
                .selectFrom(memberDealBookmark)
                .where(
                        memberDealBookmark.deal.id.eq(dealId)
                                .and(memberDealBookmark.member.id.eq(memberId))
                )
                .fetchOne();
    }
}
