import { createSlice } from "@reduxjs/toolkit";

export const alarmSlice = createSlice({
  name: "alarm",
  initialState: {
    alarmCount: 0,
  },
  reducers: {
    increaseAlarmCount: (state, { payload }) => {
      console.log("setIsAlarm reducer");
      state.alarmCount++;
    },
    initAlarmCount: (state, { payload }) => {
      state.alarmCount = 0;
    },
  },
});

export const alarmSliceReducer = alarmSlice.reducer;
export const alarmActions = alarmSlice.actions;
