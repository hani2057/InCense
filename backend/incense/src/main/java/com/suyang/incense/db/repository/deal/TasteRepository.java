package com.suyang.incense.db.repository.deal;

import com.suyang.incense.db.entity.analysis.Taste;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TasteRepository extends JpaRepository<Taste, Long>, TasteCustomRepository {


}
