import { createSlice } from "@reduxjs/toolkit";

export const alarmSlice = createSlice({
  name: "alarm",
  initialState: {
    alarmCount: 0,
    alarmList: [],
  },
  reducers: {
    increaseAlarmCount: (state, { payload }) => {
      state.alarmCount++;
    },
    initAlarmCount: (state, { payload }) => {
      state.alarmCount = 0;
    },
    setAlarmList: (state, { payload }) => {
      state.alarmList = [...payload];
    },
  },
});

export const selectAlarmList = (state) => state.alarmSliceReducer.alarmList;
export const alarmSliceReducer = alarmSlice.reducer;
export const { increaseAlarmCount, initAlarmCount, setAlarmList } =
  alarmSlice.actions;
