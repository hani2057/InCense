package com.suyang.incense.db.entity.member;

import com.suyang.incense.db.entity.analysis.Taste;
import com.suyang.incense.db.entity.deal.CommentReply;
import com.suyang.incense.db.entity.deal.DealComment;
import com.suyang.incense.db.entity.deal.DealReport;
import com.suyang.incense.db.entity.relation.*;
import com.suyang.incense.db.entity.deal.Deal;
import com.suyang.incense.db.entity.review.Review;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import javax.persistence.*;

import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import javax.validation.constraints.NotNull;
import java.time.LocalDate;
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
    @JoinColumn(name = "grade_id", nullable = false)
    private Grade grade;

    @NotNull
    @Column(length = 50)
    private String email;


    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Role role;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private SocialType type;

    @NotNull
    @Column(length = 20)
    private String nickname;

    @NotNull
    private byte gender;        // 0: 남자, 1:여자

    @NotNull
    private LocalDate birth;

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

    @OneToMany(mappedBy = "member")
    private List<MemberPerfume> memberPerfumeList = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<MemberPerfumeAlarm> memberPerfumeAlarmList = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<Review> reviewList = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<Taste> tasteList = new ArrayList<>();

    @OneToMany(mappedBy ="member")
    private List<AlarmSend> alarmSendList = new ArrayList<>();
    @Builder
    public Member(Grade grade, String email, Role role, SocialType type, String nickname, Byte gender,
                  LocalDate birth, String profile, byte birthOpen, byte genderOpen) {
        this.grade = grade;
        this.email = email;
        this.role = role;
        this.type = type;
        this.nickname = nickname;
        this.gender = gender;
        this.birth = birth;
        this.profile = profile;
        this.birthOpen = birthOpen;
        this.genderOpen = genderOpen;
    }
}
