package com.suyang.incense.db.entity.member;

import com.suyang.incense.common.BaseTimeEntity;
import com.suyang.incense.db.entity.deal.Deal;
import java.time.LocalDateTime;
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
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.springframework.data.annotation.CreatedDate;


@Getter
@Setter
@NoArgsConstructor
@DynamicInsert
@Entity
@Table(name = "alarm_send")
public class AlarmSend extends BaseTimeEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "alarm_send_id")
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "member_id")
  private Member member;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "deal_id")
  private Deal deal;

  @NotNull
  @Column(length = 200)
  private String message;

  @NotNull
  @ColumnDefault("0")
  private Byte isReceived;    // 0: 미수신, 1: 수신완료

  @NotNull
  @ColumnDefault("0")
  private Byte isDeleted;   // 0: false, 1: true

}
