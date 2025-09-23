// traineeSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  trainees: [
    {
      name: "Samba Ndiaye",
      tauxPresence: 95,
      present: 20,
      retard: 1,
      absences: 0,
      image: "/images/samba.png",
    },
    {
      name: "Awa Diop",
      tauxPresence: 88,
      present: 18,
      retard: 2,
      absences: 2,
      image: "/images/awa.png",
    },
    {
      name: "Mamadou Ba",
      tauxPresence: 75,
      present: 15,
      retard: 4,
      absences: 3,
      image: "/images/mamadou.png",
    },
  ],
};

const traineeSlice = createSlice({
  name: "trainee",
  initialState,
  reducers: {
    addTrainee: (state, action) => {
      state.trainees.push(action.payload);
    },
  },
});

export const { addTrainee } = traineeSlice.actions;
export default traineeSlice.reducer;
