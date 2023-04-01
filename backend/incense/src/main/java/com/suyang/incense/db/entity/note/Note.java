package com.suyang.incense.db.entity.note;

import com.suyang.incense.db.entity.relation.PerfumeNote;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
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
@Table(name = "note")
public class Note {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "note_id")
  private Long id;

  @NotNull
  @Column(length = 100)
  private String name;

  @Enumerated(EnumType.STRING)
  private Type type;

  @OneToMany(mappedBy = "note")
  private List<PerfumeNote> perfumeNoteList = new ArrayList<>();

}
