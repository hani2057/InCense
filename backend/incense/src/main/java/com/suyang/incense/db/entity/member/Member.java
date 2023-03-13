package com.suyang.incense.db.entity.member;


import com.suyang.incense.db.entity.analysis.MyAnalysis;
import com.suyang.incense.db.entity.chat.ChatMessage;
import com.suyang.incense.db.entity.chat.ChatRoom;
import com.suyang.incense.db.entity.deal.DealComment;
import com.suyang.incense.db.entity.deal.DealReport;
import com.suyang.incense.db.entity.relation.*;
import com.suyang.incense.db.entity.deal.Deal;
import com.suyang.incense.db.entity.test.Test;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

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
@Table(name = "member")
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;



    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "rank_id")
    private Rank rank;



    @OneToMany(mappedBy = "reportedMember")
    private List<MemberReport> memberReportedList = new ArrayList<>();


    @OneToMany(mappedBy = "member")
    private List<MemberReport> memberReportList = new ArrayList<>();

    @OneToMany(mappedBy="member")
    private List<ChatMessage> chatMessageList = new ArrayList<>();

    @OneToMany(mappedBy="member")
    private List<ChatRoom> chatRoomList = new ArrayList<>();


    @OneToMany(mappedBy="member")
    private List<DealReport> saleReportList = new ArrayList<>();

    @OneToMany(mappedBy="member")
    private List<DealComment> saleCommentList = new ArrayList<>();

    @OneToMany(mappedBy="member")
    private List<Deal> saleList = new ArrayList<>();
    @OneToMany(mappedBy="member")
    private List<DealReport> dealReportList = new ArrayList<>();


    @OneToMany(mappedBy="member")
    private List<DealComment> dealCommentList = new ArrayList<>();

    @OneToMany(mappedBy="member")
    private List<Deal> dealList = new ArrayList<>();


    @OneToMany(mappedBy="member")
    private List<MemberDealBookmark> memberDealBookMarkList = new ArrayList<>();

    @OneToMany(mappedBy="member")
    private List<MyAnalysis> myAnalysisList = new ArrayList<>();


    @OneToMany(mappedBy="member")
    private List<Test> testList = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<MemberPerfume> memberPerfumeList = new ArrayList<>();

    @NotNull
    @Column(length = 50)
    private String email;

    @NotNull
    @Column(length = 100)
    private String password;

    @NotNull
    @Column(length = 100)
    private String role;


    @NotNull
    @Column(length = 20)
    private String nickname;

    @NotNull
    private Byte gender;

    @NotNull
    private LocalDateTime birth;


    @Column(length = 2500)
    private String profile;


    @ColumnDefault("0")
    private int score;





}
