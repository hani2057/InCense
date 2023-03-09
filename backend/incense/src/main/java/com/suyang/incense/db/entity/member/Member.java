package com.suyang.incense.db.entity.member;


import com.suyang.incense.db.entity.analysis.MyAnalysis;
import com.suyang.incense.db.entity.chat.ChatMessage;
import com.suyang.incense.db.entity.chat.ChatRoom;
import com.suyang.incense.db.entity.community.Community;
import com.suyang.incense.db.entity.relation.*;
import com.suyang.incense.db.entity.sale.Sale;
import com.suyang.incense.db.entity.sale.SaleComment;
import com.suyang.incense.db.entity.sale.SaleReport;
import com.suyang.incense.db.entity.share.Share;
import com.suyang.incense.db.entity.share.ShareComment;
import com.suyang.incense.db.entity.share.ShareReport;
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


    @OneToMany(mappedBy ="member")
    private List<MemberCommunityGood> memberCommunityGoodList = new ArrayList<>();


    @OneToMany(mappedBy = "member")
    private List<Community> communityList = new ArrayList<>();


    @OneToMany(mappedBy = "member")
    private List<CommunityMemberComment> communityMemberCommentList = new ArrayList<>();


    @OneToMany(mappedBy="member")
    private List<ChatMessage> chatMessageList = new ArrayList<>();

    @OneToMany(mappedBy="member")
    private List<ChatRoom> chatRoomList = new ArrayList<>();


    @OneToMany(mappedBy="member")
    private List<SaleReport> saleReportList = new ArrayList<>();

    @OneToMany(mappedBy="member")
    private List<SaleComment> saleCommentList = new ArrayList<>();

    @OneToMany(mappedBy="member")
    private List<Sale> saleList = new ArrayList<>();
    @OneToMany(mappedBy="member")
    private List<MemberSaleBookmark> memberSaleBookMarkList = new ArrayList<>();
    @OneToMany(mappedBy="member")
    private List<ShareReport> shareReportList = new ArrayList<>();


    @OneToMany(mappedBy="member")
    private List<ShareComment> shareCommentList = new ArrayList<>();

    @OneToMany(mappedBy="member")
    private List<Share> shareList = new ArrayList<>();


    @OneToMany(mappedBy="member")
    private List<MemberShareBookmark> memberShareBookMarkList = new ArrayList<>();

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
