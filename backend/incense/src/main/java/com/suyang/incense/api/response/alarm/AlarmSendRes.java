package com.suyang.incense.api.response.alarm;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class AlarmSendRes {

  private Long dealId;
  private String perfumeName;
  private String dealTitle;

}
