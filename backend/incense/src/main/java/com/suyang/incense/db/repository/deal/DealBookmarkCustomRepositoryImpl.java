package com.suyang.incense.db.repository.deal;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.suyang.incense.api.response.member.mypage.BookmarkRes;
import com.suyang.incense.db.entity.relation.MemberDealBookmark;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.suyang.incense.db.entity.deal.QDeal.deal;
import static com.suyang.incense.db.entity.relation.QMemberDealBookmark.memberDealBookmark;

@Repository
@RequiredArgsConstructor
public class DealBookmarkCustomRepositoryImpl implements DealBookmarkCustomRepository{

    private final DealCommentRepository dealCommentRepository;

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

    @Override
    public List<BookmarkRes> getBookmarkByMember(Long memberId) {

        List<BookmarkRes> result = jpaQueryFactory
                .select(Projections.constructor(
                        BookmarkRes.class,
                        deal.id,
                        deal.gubun,
                        deal.member.nickname,
                        deal.createdDate,
                        deal.title,
                        deal.perfume.brand.name,
                        deal.perfume.name,
                        deal.perfume.image,
                        deal.volume,
                        deal.price,
                        deal.isDelivery,
                        deal.isClosed
                )).distinct()
                .from(deal, memberDealBookmark)
                .where(memberDealBookmark.member.id.eq(memberId),
                        deal.eq(memberDealBookmark.deal))
                .fetch();

        for (BookmarkRes res : result) {
            res.setCommentCount(dealCommentRepository.getCommentCount(res.getDealId()));
        }

        return result;
    }
}
