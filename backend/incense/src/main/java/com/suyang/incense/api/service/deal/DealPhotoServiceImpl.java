package com.suyang.incense.api.service.deal;

import com.suyang.incense.common.FileHandler;
import com.suyang.incense.db.entity.deal.Deal;
import com.suyang.incense.db.entity.deal.DealPhoto;
import com.suyang.incense.db.repository.deal.DealPhotoRepository;
import com.suyang.incense.db.repository.deal.DealRepository;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class DealPhotoServiceImpl implements DealPhotoService{

  private final DealRepository dealRepository;
  private final DealPhotoRepository dealPhotoRepository;
  private final FileHandler fileHandler;

  @Transactional
  public boolean saveImage(Long dealId, List<MultipartFile> multipartFiles) throws IOException {

    Deal deal = dealRepository.findById(dealId).orElseThrow(IllegalArgumentException::new);

    List<DealPhoto> dealPhotoList = fileHandler.parseDealImageInfo(dealId, multipartFiles);

    if(!dealPhotoList.isEmpty()){
      List<DealPhoto> photoBeans = new ArrayList<>();
      for(DealPhoto dealPhoto : dealPhotoList){
        photoBeans.add(dealPhotoRepository.save(dealPhoto));
      }
      deal.setDealPhotoList(photoBeans);
    }

    return true;
  }

  @Transactional
  public boolean updateImage(Long dealId, List<MultipartFile> multipartFiles) throws IOException {

    //기존 이미지 모두 삭제
    dealPhotoRepository.deleteAllByDealId(dealId);

    //이미지 새로 등록
    saveImage(dealId, multipartFiles);

    return true;
  }

}
