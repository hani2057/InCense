package com.suyang.incense.db.entity.member;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@DynamicInsert
@Table(name = "grade_log")
public class GradeLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "grade_log_id")
    private Long id;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name ="member_id")
    private Member member;


    @ColumnDefault("0")
    private int score;


    @NotNull
    @Column(length = 100)
    private String reason;


    @NotNull
    private LocalDateTime createTime;

}
