package com.suyang.incense.common;

import com.suyang.incense.db.entity.deal.Deal;
import com.suyang.incense.db.entity.deal.DealPhoto;
import com.suyang.incense.db.repository.deal.DealRepository;
import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.suyang.incense.db.repository.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.util.ObjectUtils;
import org.springframework.web.multipart.MultipartFile;

@Component
@RequiredArgsConstructor
public class FileHandler {

  private final DealRepository dealRepository;
  private final MemberRepository memberRepository;

  public List<DealPhoto> parseDealImageInfo(Long dealId, List<MultipartFile> multipartFiles)
      throws IOException {

    Deal deal = dealRepository.findById(dealId).orElseThrow(IllegalArgumentException::new);

    //반환 할 파일 리스트
    List<DealPhoto> fileList = new ArrayList<>();

    //파일이 들어오지 않으면 즉시 반환
    if(multipartFiles == null || multipartFiles.isEmpty()){
      return fileList;
    }

    //파일 이름을 업로드 한 날짜로 바꾸어 저장
    SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMdd");
    String currentDate = simpleDateFormat.format(new Date());

    //프로젝트 폴더에 저장하기 위해 절대경로, 경로 설정
//    String absolutePath = new File("").getAbsolutePath() + "\\";
    String path = "/asset/images/deal/" + currentDate;
    File file = new File(path);

    //저장할 위치의 디렉토리가 존재하지 않는 경우
    if(!file.exists()){
      file.mkdirs();
    }

    //파일 처리 시작
    for(MultipartFile multipartFile : multipartFiles) {
      if(!multipartFile.isEmpty()){
        String contentType = multipartFile.getContentType();
        String originalFileExtension;

        //확장자명이 없으면 오류
        if(ObjectUtils.isEmpty(contentType)) break;
        else {
          if(contentType.contains("image/jpeg")) {
            originalFileExtension = ".jpg";
          } else if(contentType.contains("image/png")) {
            originalFileExtension = ".png";
          } else {
            break;
          }
        }

        //파일 저장
        String newFileName = Long.toString(System.nanoTime()) + originalFileExtension;
        DealPhoto dealPhoto = DealPhoto.builder()
            .deal(deal)
            .image("deal/" + currentDate + "/" + newFileName)
            .build();
        fileList.add(dealPhoto);

        //파일 저장 완료
        file = new File(path + "/" + newFileName);
        multipartFile.transferTo(file);
      }
    }

    return fileList;
  }

  public String parseProfileImageInfo(MultipartFile profile)
          throws IOException {

    //파일이 들어오지 않으면 즉시 반환
    if(profile.isEmpty()){
      return null;
    }

    //파일 이름을 업로드 한 날짜로 바꾸어 저장
    SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMdd");
    String currentDate = simpleDateFormat.format(new Date());

    //프로젝트 폴더에 저장하기 위해 절대경로, 경로 설정
//    String absolutePath = new File("").getAbsolutePath() + "\\";
    String path = "/asset/images/profile/" + currentDate;
    File file = new File(path);

    //저장할 위치의 디렉토리가 존재하지 않는 경우
    if(!file.exists()){
      file.mkdirs();
    }

    //파일 처리 시작
    String contentType = profile.getContentType();
    String originalFileExtension;

    //확장자명이 없으면 오류
    if(ObjectUtils.isEmpty(contentType)) return null;
    else {
      if(contentType.contains("image/jpeg")) {
        originalFileExtension = ".jpg";
      } else if(contentType.contains("image/png")) {
        originalFileExtension = ".png";
      } else {
        return null;
      }
    }

    //파일 저장
    String newFileName = System.nanoTime() + originalFileExtension;

    //파일 저장 완료
    file = new File(path + "/" + newFileName);
    profile.transferTo(file);

    return "profile/" + currentDate + "/" + newFileName;
  }
}
