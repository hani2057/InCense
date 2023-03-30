package com.suyang.incense.db.repository.perfume;

import com.suyang.incense.api.request.perfume.PerfumeReq;
import com.suyang.incense.api.response.perfume.PerfumeRes;
import com.suyang.incense.db.entity.perfume.Perfume;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface PerfumeCustomRepository {
    public List<Perfume> getPerfumeList(PerfumeReq perfumeReq,Pageable pageable);

    Long getCount(PerfumeReq perfumeReq);
}
