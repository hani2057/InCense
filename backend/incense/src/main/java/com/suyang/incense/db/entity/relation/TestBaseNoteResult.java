package com.suyang.incense.db.entity.relation;

import com.suyang.incense.db.entity.note.BaseNote;
import com.suyang.incense.db.entity.note.MiddleNote;
import com.suyang.incense.db.entity.test.Test;
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
@Table(name = "test_base_note_result")
public class TestBaseNoteResult {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "test_base_note_result_id")
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "test_id")
  private Test test;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "base_note_id")
  private BaseNote baseNote;

  @NotNull
  private double weight;

}
