// sanctionSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Charger depuis localStorage ou mettre par défaut
const initialState = {
  sanctions: JSON.parse(localStorage.getItem("sanctions")) || [
    {
      id: 1,
      name: "Wakhoub Gueye",
      email: "WakhoubGueye@gmail.com",
      motif: "Retards répétés",
      description: "Trois retards consécutifs constatés...",
      niveau: "Avertissement",
      date: "2024-09-25",
      statut: "Non lue",
    },
  ],
};

const sanctionSlice = createSlice({
  name: "sanction",
  initialState,
  reducers: {
    addSanction: (state, action) => {
      state.sanctions.push(action.payload);
      // Sauvegarde automatique
      localStorage.setItem("sanctions", JSON.stringify(state.sanctions));
    },
    deleteSanction: (state, action) => {
      state.sanctions = state.sanctions.filter((s) => s.id !== action.payload);
      localStorage.setItem("sanctions", JSON.stringify(state.sanctions));
    },
    updateSanction: (state, action) => {
      const index = state.sanctions.findIndex((s) => s.id === action.payload.id);
      if (index !== -1) {
        state.sanctions[index] = action.payload;
        localStorage.setItem("sanctions", JSON.stringify(state.sanctions));
      }
    },
  },
});

export const { addSanction, deleteSanction, updateSanction } =
  sanctionSlice.actions;
export default sanctionSlice.reducer;
