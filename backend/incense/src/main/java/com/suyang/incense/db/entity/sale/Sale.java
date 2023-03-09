package com.suyang.incense.db.entity.sale;

import com.suyang.incense.db.entity.relation.MemberSaleBookmark;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@DynamicInsert
@Table(name = "sale")
public class Sale {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sale_id")
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @NotNull
    @Column(length = 100)
    private String title;

    @NotNull
    @Column(length = 100)
    private String name;

    @NotNull
    @Column(length = 100)
    private String brand;

    @NotNull
    private int price;

    @NotNull
    private String content;

    @NotNull
    @CreatedDate
    @LastModifiedDate
    private LocalDateTime registerTime;

    private int volume;

    @NotNull
    @ColumnDefault("0")
    private byte isDelivery;    // 0: 불가능, 1: 가능

    @NotNull
    @ColumnDefault("0")
    private byte isClosed;      // 0: false, 1: true

    @OneToMany(mappedBy = "sale")
    private List<MemberSaleBookmark> memberSaleBookmarkList = new ArrayList<>();

    @OneToMany(mappedBy = "sale")
    private List<SalePhoto> salePhotoList = new ArrayList<>();

    @OneToMany(mappedBy = "sale")
    private List<SaleComment> saleCommentList = new ArrayList<>();

    @OneToMany(mappedBy = "sale")
    private List<SaleReport> saleReportList = new ArrayList<>();

    @OneToMany(mappedBy = "sale")
    private List<ChatRoom> chatRoomList = new ArrayList<>();
}
