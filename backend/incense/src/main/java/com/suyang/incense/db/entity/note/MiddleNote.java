package com.suyang.incense.db.entity.note;

import com.suyang.incense.db.entity.relation.MyAnalysisMiddleNote;
import com.suyang.incense.db.entity.relation.PerfumeMiddleNote;
import com.suyang.incense.db.entity.relation.TestMiddleNoteResult;
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
@Table(name = "middle_note")
public class MiddleNote {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "middle_note_id")
  private Long id;

  @NotNull
  @Column(length = 30)
  private String name;

  @OneToMany(mappedBy = "middleNote")
  private List<PerfumeMiddleNote> perfumeMiddleNoteList = new ArrayList<>();

  @OneToMany(mappedBy = "middleNote")
  private List<TestMiddleNoteResult> testMiddleNoteResultList = new ArrayList<>();

  @OneToMany(mappedBy = "middleNote")
  private List<MyAnalysisMiddleNote> myAnalysisMiddleNoteList = new ArrayList<>();
}
