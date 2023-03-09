package com.suyang.incense.db.entity.community;

import com.suyang.incense.db.entity.member.Member;
import com.suyang.incense.db.entity.relation.CommunityMemberComment;
import com.suyang.incense.db.entity.relation.MemberCommunityGood;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "community")
public class Community {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "community_id")
    private Long id;



    @OneToMany(mappedBy = "community")
    private List<MemberCommunityGood> memberCommunityGoodList = new ArrayList<>();


    @OneToMany(mappedBy = "community")
    private List<CommunityPhoto> communityPhotoList = new ArrayList<>();


    @OneToMany(mappedBy = "community")
    private List<CommunityMemberComment> communtiyMemberCommentList = new ArrayList<>();


    @ManyToOne(fetch =FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @NotNull
    @Column(length = 100)
    private String title;

    @NotNull
    private String content;


    @NotNull
    private LocalDateTime registerTime;


    @ColumnDefault("0")
    private int good;


}
