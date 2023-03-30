package com.suyang.incense.api.service.alarm;

import com.suyang.incense.db.entity.deal.Deal;

public interface AlarmService {

    public void sendAlarmToAllMembers( Deal deal);
}
