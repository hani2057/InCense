package com.suyang.incense.db.entity.note;

import com.suyang.incense.db.entity.relation.MyAnalysisBaseNote;
import com.suyang.incense.db.entity.relation.PerfumeBaseNote;
import com.suyang.incense.db.entity.relation.TestBaseNoteResult;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
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
@Table(name = "base_note")
public class BaseNote {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "base_note_id")
  private Long id;

  @NotNull
  @Column(length = 30)
  private String name;

  @OneToMany(mappedBy = "baseNote")
  private List<PerfumeBaseNote> perfumeBaseNoteList = new ArrayList<>();

  @OneToMany(mappedBy = "baseNote")
  private List<TestBaseNoteResult> testBaseNoteResultList = new ArrayList<>();

  @OneToMany(mappedBy = "baseNote")
  private List<MyAnalysisBaseNote> myAnalysisBaseNoteList = new ArrayList<>();
}
