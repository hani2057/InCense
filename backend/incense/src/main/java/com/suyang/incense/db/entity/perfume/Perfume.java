package com.suyang.incense.db.entity.perfume;

import com.suyang.incense.db.entity.relation.MemberPerfume;
import com.suyang.incense.db.entity.relation.MemberPerfumeAlarm;
import com.suyang.incense.db.entity.relation.MyAnalysisPerfume;
import com.suyang.incense.db.entity.relation.PerfumeNote;
import com.suyang.incense.db.entity.relation.TestPerfumeResult;
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
@Table(name = "perfume")
public class Perfume {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "perfume_id")
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "brand_id")
  private Brand brand;

  @NotNull
  @Column(length = 100)
  private String name;
  @NotNull
  private double price;
  @NotNull
  private int volume;
  @NotNull
  private Byte gender;    //0: 남자, 1:여자, 2:양성, 3:어린이
  @NotNull
  private double rating;  //엑셀 데이터 평점

  @NotNull
  private String concentration;
  @Column(length = 2500)
  private String image;


  @OneToMany(mappedBy = "perfume")
  private List<TestPerfumeResult> testPerfumeResultList = new ArrayList<>();

  @OneToMany(mappedBy = "perfume")
  private List<MemberPerfume> memberPerfumeList = new ArrayList<>();

  @OneToMany(mappedBy = "perfume")
  private List<MemberPerfumeAlarm> memberPerfumeAlarmList = new ArrayList<>();

  @OneToMany(mappedBy = "perfume")
  private List<PerfumeNote> perfumeNoteList = new ArrayList<>();

  @OneToMany(mappedBy = "perfume")
  private List<MyAnalysisPerfume> myAnalysisPerfumeList = new ArrayList<>();
}
