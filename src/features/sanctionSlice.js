// sanctionSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sanctions: [
    {
      id: 1,
      name: "Wakhoub Gueye",
      motif: "Retards répétés",
      description: "Trois retards consécutifs constatés...",
      niveau: "Avertissement",
      date: "2024-09-25",
      statut: "Non lue",
    },
    // Ajoute d'autres sanctions ici
  ],
};

const sanctionSlice = createSlice({
  name: "sanction",
  initialState,
  reducers: {
    addSanction: (state, action) => {
      state.sanctions.push(action.payload);
    },
  },
});

export const { addSanction } = sanctionSlice.actions;
export default sanctionSlice.reducer;
