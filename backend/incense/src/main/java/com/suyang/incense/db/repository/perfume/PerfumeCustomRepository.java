package com.suyang.incense.db.repository.perfume;

import com.suyang.incense.api.request.perfume.PerfumeReq;
import com.suyang.incense.db.entity.perfume.Perfume;

import java.util.List;

public interface PerfumeCustomRepository {
    public List<Perfume> getPerfumeList(PerfumeReq perfumeReq);
    public Perfume getPerfume(Long perfumeId);
}
