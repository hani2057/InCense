package com.suyang.incense.db.entity.analysis;

import com.suyang.incense.common.BaseTimeEntity;
import com.suyang.incense.db.entity.member.Member;
import com.suyang.incense.db.entity.relation.MyAnalysisNote;
import com.suyang.incense.db.entity.relation.MyAnalysisPerfume;
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

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "my_analysis")
public class MyAnalysis extends BaseTimeEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "my_analysis_id")
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "member_id")
  private Member member;

  @OneToMany(mappedBy = "myAnalysis")
  private List<MyAnalysisPerfume> myAnalysisPerfumeList = new ArrayList<>();

  @OneToMany(mappedBy = "myAnalysis")
  private List<MyAnalysisNote> myAnalysisTopNoteList = new ArrayList<>();

}
