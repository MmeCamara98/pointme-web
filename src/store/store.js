import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import dashboardReducer from "../features/dashboardSlice";
import traineeReducer from "../features/traineesSlice";
import dailyPresenceReducer from "../features/dailyPresenceSlice";
import sanctionReducer from "../features/sanctionSlice";
import clockReducer from "../features/clockSlice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    trainee: traineeReducer, // 👈 clé = "trainee"
    dailyPresence: dailyPresenceReducer,
     sanction: sanctionReducer,
     clock: clockReducer,
  },
     middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

