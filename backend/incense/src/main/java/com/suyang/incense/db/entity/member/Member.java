package com.suyang.incense.db.entity.member;


import com.suyang.incense.db.entity.community.Community;
import com.suyang.incense.db.entity.relation.MemberCommunityGood;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.springframework.boot.context.properties.bind.DefaultValue;

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
    private List<Rank> rankList = new ArrayList<>();



    @OneToMany(mappedBy = "reportedMember")
    private List<MemberReport> memberReportedList = new ArrayList<>();


    @OneToMany(mappedBy = "member")
    private List<MemberReport> memberReportList = new ArrayList<>();


    @OneToMany(mappedBy ="member")
    private List<MemberCommunityGood> memberCommunityGoodList = new ArrayList<>();


    @OneToMany(mappedBy = "member")
    private List<Community> communityList = new ArrayList<>();



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
