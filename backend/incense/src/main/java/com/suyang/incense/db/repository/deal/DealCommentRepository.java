package com.suyang.incense.db.repository.deal;

import com.suyang.incense.db.entity.deal.DealComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DealCommentRepository extends JpaRepository<DealComment, Long>, DealCommentCustomRepository {


}
