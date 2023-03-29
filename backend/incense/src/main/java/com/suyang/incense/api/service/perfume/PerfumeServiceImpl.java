package com.suyang.incense.api.service.perfume;


import com.suyang.incense.api.request.perfume.PerfumeReq;
import com.suyang.incense.db.entity.perfume.Perfume;
import com.suyang.incense.db.repository.perfume.PerfumeCustomRepository;
import com.suyang.incense.db.repository.perfume.PerfumeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class PerfumeServiceImpl implements PerfumeService{


    private final PerfumeRepository perfumeRepository;

    @Override
    public List<Perfume> getPerfumeList(PerfumeReq perfumeReq) {
        return perfumeRepository.getPerfumeList(perfumeReq);
    }

    @Override
    public Perfume getPerfume(Long perfumeId){
          return  perfumeRepository.findById(perfumeId).get();
    }
}
