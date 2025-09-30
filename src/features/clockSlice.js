// clockSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  records: [
    {
      id: 1,
      name: "Wakhoub Gueye",
      time: "08:27",
      date: "2024-09-25",
      status:"A l'heure",
    },
    {
      id: 2,
      name: "Wakhoub Gueye",
      time: "08:50",
      date: "2024-09-25",
      status:"En retard",
    },
    {
      id: 3,
      name: "elmor seye ",
      time: "08:30",
      date: "2025-09-25",
      status:"A l'heure",
    },
     {
      id: 4,
      name: "Wakhoub Gueye",
      time: "08:50",
      date: "2024-09-25",
      status:"En retard",
    },
    
    
  ],
};

const clockSlice = createSlice({
  name: "clock",
  initialState,
  reducers: {},
});

export default clockSlice.reducer;
