package com.suyang.incense.api.service.deal;

import com.suyang.incense.db.entity.deal.Deal;
import com.suyang.incense.db.entity.member.Member;
import com.suyang.incense.db.entity.relation.MemberDealBookmark;
import com.suyang.incense.db.repository.deal.DealBookmarkRepository;
import com.suyang.incense.db.repository.deal.DealRepository;
import com.suyang.incense.db.repository.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class DealBookmarkServiceImpl implements DealBookmarkService {

    private final DealBookmarkRepository dealBookmarkRepository;
    private final DealRepository dealRepository;
    private final MemberRepository memberRepository;

    @Transactional
    public Boolean setBookmarkStatus(Long dealId, Long memberId) {

        Deal deal = dealRepository.findById(dealId).orElseThrow(IllegalArgumentException::new);
        Member member = memberRepository.findById(memberId).orElseThrow(IllegalArgumentException::new);

        MemberDealBookmark memberDealBookmark = dealBookmarkRepository.findByDealIdAndMemberId(dealId, memberId);

        if(memberDealBookmark == null){
            //북마크가 OFF인 경우 -> ON(등록) 해준다.
            MemberDealBookmark newBookmark = new MemberDealBookmark();
            newBookmark.setDeal(deal);
            newBookmark.setMember(member);

            dealBookmarkRepository.save(newBookmark);
            return true;
        } else{
            //북마크가 ON인 경우 -> OFF(해제) 해준다.
            dealBookmarkRepository.deleteById(memberDealBookmark.getId());
            return false;
        }
    }

    public Boolean getBookmarkStatus(Long dealId, Long memberId) {

        Deal deal = dealRepository.findById(dealId).orElseThrow(IllegalArgumentException::new);
        Member member = memberRepository.findById(memberId).orElseThrow(IllegalArgumentException::new);

        MemberDealBookmark memberDealBookmark = dealBookmarkRepository.findByDealIdAndMemberId(dealId, memberId);

        if(memberDealBookmark == null) return false;
        else return true;

    }
}
