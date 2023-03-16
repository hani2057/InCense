package com.suyang.incense.db.entity.member;

import com.suyang.incense.db.entity.analysis.MyAnalysis;
import com.suyang.incense.db.entity.deal.CommentReply;
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
    @JoinColumn(name = "grade_id")
    private Grade grade;

    @NotNull
    @Column(length = 50)
    private String email;

    @NotNull
    @Column(length = 100)
    private String password;

    @NotNull
    @Column(length = 50)
    private String role;

    @NotNull
    @Column(length = 20)
    private String nickname;

    @NotNull
    private Byte gender;        // 0: 남자, 1:여자

    @NotNull
    private LocalDateTime birth;

    @Column(length = 2500)
    private String profile;

    @ColumnDefault("0")
    private int score;

    @ColumnDefault("1")
    private byte birthOpen;     // 0: 비공개, 1: 공개

    @ColumnDefault("1")
    private byte genderOpen;    // 0: 비공개, 1: 공개

    @ColumnDefault("1")
    private byte alarmOpen;     // 0: 수신안함, 1: 수신


    @OneToMany(mappedBy ="member")
    private List<GradeLog> gradeLogList = new ArrayList<>();

    @OneToMany(mappedBy = "reportedMember")
    private List<MemberReport> memberReportedList = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<MemberReport> memberReportList = new ArrayList<>();

    @OneToMany(mappedBy="member")
    private List<DealComment> dealCommentList = new ArrayList<>();

    @OneToMany(mappedBy="member")
    private List<CommentReply> commentReplyList = new ArrayList<>();

    @OneToMany(mappedBy="member")
    private List<Deal> dealList = new ArrayList<>();

    @OneToMany(mappedBy="member")
    private List<MemberDealBookmark> memberDealBookMarkList = new ArrayList<>();

    @OneToMany(mappedBy="member")
    private List<DealReport> dealReportList = new ArrayList<>();

    @OneToMany(mappedBy="member")
    private List<MyAnalysis> myAnalysisList = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<MemberPerfume> memberPerfumeList = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<MemberPerfumeAlarm> memberPerfumeAlarmList = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<Test> testList = new ArrayList<>();

}
