package com.suyang.incense.api.service.deal;

import com.suyang.incense.api.request.deal.DealReq;
import com.suyang.incense.api.response.deal.DealDetailRes;
import com.suyang.incense.common.BaseTimeEntity;
import com.suyang.incense.db.entity.deal.Deal;
import com.suyang.incense.db.entity.deal.Gubun;
import com.suyang.incense.db.entity.member.Member;
import com.suyang.incense.db.entity.perfume.Perfume;
import com.suyang.incense.db.repository.deal.DealRepository;
import com.suyang.incense.db.repository.deal.MemberRepository;
import com.suyang.incense.db.repository.perfume.PerfumeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class DealServiceImpl implements DealService  {

  private final DealRepository dealRepository;
  private final MemberRepository memberRepository;
  private final PerfumeRepository perfumeRepository;
  private final DealPhotoService dealPhotoService;

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
  public boolean delete(Long dealId, Long memberId) throws IOException {

    Deal deal = dealRepository.findById(dealId).orElseThrow(IllegalArgumentException::new);
    if(deal.getMember().getId() != memberId){
      return false;
    }

    dealPhotoService.deleteServerImage(dealId);     //서버에서 이미지 삭제
    dealRepository.deleteById(dealId);              //DB에서 이미지 삭제

    return true;
  }

  public DealDetailRes getDeal(Long dealId) {

    DealDetailRes deal = dealRepository.findDealById(dealId);
    return deal;
  }

  @Transactional
  public boolean closeDeal(Long dealId, Long memberId) {

    Deal deal = dealRepository.findById(dealId).orElseThrow(IllegalArgumentException::new);
    if(deal.getMember().getId() != memberId) {
      return false;
    }

    if(deal.getIsClosed() == 1){
      System.out.println("이미 마감 된 글...............................");
      return false;
    }

    deal.setIsClosed((byte)1);
    return true;
  }
}
