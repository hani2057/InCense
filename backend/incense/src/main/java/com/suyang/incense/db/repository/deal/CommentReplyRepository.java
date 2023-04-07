package com.suyang.incense.db.repository.deal;

import com.suyang.incense.db.entity.deal.CommentReply;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentReplyRepository extends JpaRepository<CommentReply, Long> {
}
