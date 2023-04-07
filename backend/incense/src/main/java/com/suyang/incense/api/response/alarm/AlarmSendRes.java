package com.suyang.incense.api.response.alarm;

import com.suyang.incense.db.entity.deal.Deal;
import com.suyang.incense.db.entity.member.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Builder
@Getter
@Setter
public class AlarmSendRes {


  private Long id;

  private Long memberId;

  private Long dealId;

  private String perfumeName;

  private String dealTitle;

  private String brandName;

  private Byte isReceived;    // 0: 미수신, 1: 수신완료

  private long createAt;
}
