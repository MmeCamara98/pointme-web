// clockSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  records: [
    {
      id: 1,
      name: "Wakhoub Gueye",
      time: "08:27",
      date: "2024-09-25",
      status: "À l'heure",
    },
    {
      id: 2,
      name: "Wakhoub Gueye",
      time: "08:50",
      date: "2024-09-25",
      status: "En retard",
    },
    // Ajoute d'autres pointages ici
  ],
};

const clockSlice = createSlice({
  name: "clock",
  initialState,
  reducers: {},
});

export default clockSlice.reducer;
