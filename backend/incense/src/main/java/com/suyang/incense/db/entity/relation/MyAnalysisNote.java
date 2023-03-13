package com.suyang.incense.db.entity.relation;

import com.suyang.incense.db.entity.analysis.MyAnalysis;
import com.suyang.incense.db.entity.note.Note;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "my_analysis_note")
public class MyAnalysisNote {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "my_analysis_note_id")
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "my_analysis_id")
  private MyAnalysis myAnalysis;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "note_id")
  private Note note;

  @NotNull
  private double weight;

}
