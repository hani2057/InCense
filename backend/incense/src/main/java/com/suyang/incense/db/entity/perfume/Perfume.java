package com.suyang.incense.db.entity.perfume;

import com.suyang.incense.db.entity.relation.TestPerfumeResult;
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
@Table(name = "perfume")
public class Perfume {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "perfume_id")
  private Long id;

  @NotNull
  @Column(length = 100)
  private String name;

  @NotNull
  @Column(length = 100)
  private String brand;
  @NotNull
  private double price;
  @NotNull
  private int volume;
  @NotNull
  private Byte gender;    //0: 남자, 1:여자, 2:양성, 3:어린이
  @NotNull
  private double rating;  //엑셀 데이터 평점
  private String image;

  @OneToMany(mappedBy = "perfume")
  private List<TestPerfumeResult> testPerfumeResultList = new ArrayList<>();


}
