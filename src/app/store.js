import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../feature/auth/authSlice";
import achievementReducer from "../feature/achievement/achievementSlice";

const store = configureStore({
  reducer: {
    auths: authReducer,
    achievements: achievementReducer,
  }
});

export default store;