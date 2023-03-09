package com.suyang.incense.db.entity.relation;


import com.suyang.incense.db.entity.member.Member;
import com.suyang.incense.db.entity.share.Share;
import javax.persistence.*;
import javax.validation.constraints.NotNull;

public class MemberShareBookmark {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_share_bookmark_id")
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "share_id")
    private Share share;
}
