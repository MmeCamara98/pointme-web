// dailyPresenceSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dailyRecords: [
    {
      id: 1,
      name: "Wakhoubou Gueye",
      status: "Présent",
      arrival: "08:25",
      departure: "18:00",
      notes: "",
      image: "/images/wakhoubou.png",
    },
    // Tu peux ajouter d'autres stagiaires ici
  ],
};

const dailyPresenceSlice = createSlice({
  name: "dailyPresence",
  initialState,
  reducers: {
    updateRecord: (state, action) => {
      const index = state.dailyRecords.findIndex(r => r.id === action.payload.id);
      if (index !== -1) state.dailyRecords[index] = action.payload;
    },
  },
});

export const { updateRecord } = dailyPresenceSlice.actions;
export default dailyPresenceSlice.reducer;
