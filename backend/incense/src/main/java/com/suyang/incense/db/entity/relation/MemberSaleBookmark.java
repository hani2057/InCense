package com.suyang.incense.db.entity.relation;

import com.suyang.incense.db.entity.sale.Sale;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

public class MemberSaleBookmark {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_sale_bookmark_id")
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sale_id")
    private Sale sale;
}
