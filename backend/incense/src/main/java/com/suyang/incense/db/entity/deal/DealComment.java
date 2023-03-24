package com.suyang.incense.db.entity.deal;

import com.suyang.incense.common.BaseTimeEntity;
import com.suyang.incense.db.entity.member.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
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
@Table(name = "deal_comment")
public class DealComment extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "deal_comment_id")
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "deal_id")
    private Deal deal;

    @NotNull
    private String content;

    @NotNull
    @ColumnDefault("0")
    private Byte isSecret;    // 0: 불가능, 1: 가능

    @OneToMany(mappedBy = "dealComment", cascade = CascadeType.REMOVE)
    private List<CommentReply> commentReplyList = new ArrayList<>();
}
