package com.suyang.incense.db.entity.analysis;

import com.suyang.incense.db.entity.relation.MyAnalysisBaseNote;
import com.suyang.incense.db.entity.relation.MyAnalysisMiddleNote;
import com.suyang.incense.db.entity.relation.MyAnalysisPerfume;
import com.suyang.incense.db.entity.relation.MyAnalysisTopNote;
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
public class MyAnalysis {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "my_analysis_id")
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "member_id")
  private Member member;

  @NotNull
  private LocalDateTime updateTime;

  @OneToMany(mappedBy = "myAnalysis")
  private List<MyAnalysisPerfume> myAnalysisPerfumeList = new ArrayList<>();

  @OneToMany(mappedBy = "myAnalysis")
  private List<MyAnalysisTopNote> myAnalysisTopNoteList = new ArrayList<>();

  @OneToMany(mappedBy = "myAnalysis")
  private List<MyAnalysisMiddleNote> myAnalysisMiddleNoteList = new ArrayList<>();

  @OneToMany(mappedBy = "myAnalysis")
  private List<MyAnalysisBaseNote> myAnalysisBaseNoteList = new ArrayList<>();

}
