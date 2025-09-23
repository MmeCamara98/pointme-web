// src/store/features/dashboardSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  total: 0,
  presents: 0,
  late: 0,
  trainees: [], // ✅ c'est ici qu'on garde trainees
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setDashboard: (state, action) => {
      return { ...state, ...action.payload };
    },
    addTrainee: (state, action) => {
      state.trainees.push(action.payload);
      state.total += 1;
    },
  },
});

export const { setDashboard, addTrainee } = dashboardSlice.actions;
export default dashboardSlice.reducer;
