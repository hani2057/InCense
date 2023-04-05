package com.suyang.incense.api.service.perfume;

import com.suyang.incense.api.request.perfume.PerfumeReq;
import com.suyang.incense.api.response.perfume.*;
import com.suyang.incense.db.entity.perfume.Perfume;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface PerfumeService {

    public List<Perfume> getPerfumeList(PerfumeReq perfumeReq,Pageable pageable);

    public Long getCount(PerfumeReq perfumeReq);

    public Perfume getPerfume(Long perfumeId);

    ResponseEntity<TasteSimilarityDto> getSimilarityDataOfMine(String path, Long memberId, Long perfumeId);

    ResponseEntity<SimilarPerfumeDto> getSimilarPerfumeList(String path, Long perfumeId);

    PerfumeSimpleRes getPerfumeNameAndBrand(Long perfumeId);

    SimilarPerfumeRes getSimilarPerfumeResData(Long perfumeId);

    PerfumeCategoryRes getPerfumeCategoryByMember(Long perfumdId, Authentication authentication);
}
