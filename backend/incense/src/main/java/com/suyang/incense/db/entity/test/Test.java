package com.suyang.incense.db.entity.test;

import com.suyang.incense.db.entity.member.Member;
import com.suyang.incense.db.entity.relation.TestBaseNoteResult;
import com.suyang.incense.db.entity.relation.TestMiddleNoteResult;
import com.suyang.incense.db.entity.relation.TestPerfumeResult;
import com.suyang.incense.db.entity.relation.TestTopNoteResult;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "test")
public class Test {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "test_id")
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "member_id")
  private Member member;

  @NotNull
  @CreatedDate
  private LocalDateTime testDate;

  @OneToMany(mappedBy = "test")
  private List<TestPerfumeResult> testPerfumeResultList = new ArrayList<>();

  @OneToMany(mappedBy = "test")
  private List<TestTopNoteResult> testTopNoteResultList = new ArrayList<>();

  @OneToMany(mappedBy = "test")
  private List<TestMiddleNoteResult> testMiddleNoteResultList = new ArrayList<>();

  @OneToMany(mappedBy = "test")
  private List<TestBaseNoteResult> testBaseNoteResultList = new ArrayList<>();
}
