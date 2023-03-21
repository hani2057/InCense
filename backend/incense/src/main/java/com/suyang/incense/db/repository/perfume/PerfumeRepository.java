package com.suyang.incense.db.repository.perfume;

import com.suyang.incense.db.entity.perfume.Perfume;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PerfumeRepository extends JpaRepository<Perfume,Long>,PerfumeCustomRepository{

}
