import { createSlice } from "@reduxjs/toolkit";

export const alarmSlice = createSlice({
  name: "alarm",
  initialState: {
    alarmCount: 0,
    alarmList: [],
    alarmLen: 0,
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
    setAlarmLen: (state, { payload }) => {
      state.alarmLen = payload
    }
  },
});

export const selectAlarmCount = (state) => state.alarmSliceReducer.alarmCount;
export const selectAlarmList = (state) => state.alarmSliceReducer.alarmList;
export const selectAlarmLen = (state) => state.alarmSliceReducer.alarmLen;
export const alarmSliceReducer = alarmSlice.reducer;
export const { increaseAlarmCount, initAlarmCount, setAlarmList } =
  alarmSlice.actions;
