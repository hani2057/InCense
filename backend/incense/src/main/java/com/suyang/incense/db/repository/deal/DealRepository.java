package com.suyang.incense.db.repository.deal;

import com.suyang.incense.db.entity.deal.Deal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DealRepository extends JpaRepository <Deal, Long>, DealCustomRepository {

}
