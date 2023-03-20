package com.suyang.incense.api.service.deal;

import com.suyang.incense.api.request.deal.DealReq;
import com.suyang.incense.common.BaseTimeEntity;
import com.suyang.incense.db.entity.deal.Deal;
import com.suyang.incense.db.entity.deal.Gubun;
import com.suyang.incense.db.entity.member.Member;
import com.suyang.incense.db.entity.perfume.Perfume;
import com.suyang.incense.db.repository.deal.DealRepository;
import com.suyang.incense.db.repository.deal.MemberRepository;
import com.suyang.incense.db.repository.deal.PerfumeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class DealServiceImpl implements DealService  {

  private final DealRepository dealRepository;
  private final MemberRepository memberRepository;
  private final PerfumeRepository perfumeRepository;

  @Transactional
  public Deal create(DealReq dealReq, Long memberId) {

    //나눔판매 글 생성
//    Member member = memberRepository.findById(memberId);
//    Perfume perfume = perfumeRepository.findById(dealReq.getPerfumeId());

    Member member = memberRepository.findById(1l).orElseThrow();
    Perfume perfume = perfumeRepository.findById(1l).orElseThrow();

    Deal deal = new Deal();

    deal.setMember(member);
    deal.setPerfume(perfume);

    deal.setGubun(Gubun.valueOf(dealReq.getGubun()));
    deal.setTitle(dealReq.getTitle());
    deal.setContent(dealReq.getContent());
    deal.setPrice(dealReq.getPrice());
    deal.setVolume(dealReq.getVolume());
    deal.setIsDelivery(dealReq.getIsDelivery());
    deal.setIsClosed(dealReq.getIsClosed());
    deal.setBuyDate(dealReq.getBuyDate());

    dealRepository.save(deal);

    return deal;
  }

  @Transactional
  public Deal update(DealReq dealReq, Long dealId, Long memberId) {

//    Perfume perfume = perfumeRepository.findById(dealReq.getPerfumeId());
    Perfume perfume = perfumeRepository.findById(1l).orElseThrow();

    Deal deal = dealRepository.findById(dealId).orElseThrow(IllegalArgumentException::new);

    deal.setPerfume(perfume);
    deal.setGubun(Gubun.valueOf(dealReq.getGubun()));
    deal.setTitle(dealReq.getTitle());
    deal.setContent(dealReq.getContent());
    deal.setPrice(dealReq.getPrice());
    deal.setVolume(dealReq.getVolume());
    deal.setIsDelivery(dealReq.getIsDelivery());
    deal.setIsClosed(dealReq.getIsClosed());
    deal.setBuyDate(dealReq.getBuyDate());

    return deal;
  }

  @Transactional
  public boolean delete(Long dealId, Long memberId) {

    Deal deal = dealRepository.findById(dealId).orElseThrow(IllegalArgumentException::new);
    if(deal.getMember().getId() != memberId){
      return false;
    }
    dealRepository.deleteById(dealId);
    return true;
  }
}
