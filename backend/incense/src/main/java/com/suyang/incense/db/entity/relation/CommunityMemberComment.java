package com.suyang.incense.db.entity.relation;


import com.suyang.incense.db.entity.community.Community;
import com.suyang.incense.db.entity.member.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "community_member_comment")
public class CommunityMemberComment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "community_member_comment_id")
    private Long id;



    @ManyToOne
    @JoinColumn(name ="member_id")
    private Member member;



    @ManyToOne
    @JoinColumn(name = "community_id")
    private Community community;


    @NotNull
    private String content;


    @NotNull
    private LocalDateTime registerTime;
}
