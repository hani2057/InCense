package com.suyang.incense.db.entity.deal;

import com.suyang.incense.common.BaseTimeEntity;
import com.suyang.incense.db.entity.member.AlarmSend;
import com.suyang.incense.db.entity.member.Member;
import com.suyang.incense.db.entity.perfume.Perfume;
import com.suyang.incense.db.entity.relation.MemberDealBookmark;
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
@Table(name = "deal")
public class Deal extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "deal_id")
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "perfume_id")
    private Perfume perfume;

    @NotNull
    @Enumerated(EnumType.STRING)
    private Gubun gubun;

    @NotNull
    @Column(length = 100)
    private String title;

    @NotNull
    @ColumnDefault("0")
    private int price;

    @NotNull
    private String content;

    private int volume;

    @NotNull
    @ColumnDefault("0")
    private byte isDelivery;    // 0: 불가능, 1: 가능

    @NotNull
    @ColumnDefault("0")
    private byte isClosed;      // 0: false, 1: true

    private String buyDate;     //yyyy.mm

    @OneToMany(mappedBy = "deal", cascade = CascadeType.REMOVE)
    private List<DealPhoto> dealPhotoList = new ArrayList<>();

    @OneToMany(mappedBy = "deal", cascade = CascadeType.REMOVE)
    private List<DealComment> dealCommentList = new ArrayList<>();

    @OneToMany(mappedBy = "deal", cascade = CascadeType.REMOVE)
    private List<DealReport> dealReportList = new ArrayList<>();

    @OneToMany(mappedBy = "deal", cascade = CascadeType.REMOVE)
    private List<MemberDealBookmark> memberDealBookmarkList = new ArrayList<>();

    @OneToMany(mappedBy = "deal", cascade = CascadeType.REMOVE)
    private List<AlarmSend> alarmSendList = new ArrayList<>();

}
