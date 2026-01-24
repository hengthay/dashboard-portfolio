import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../feature/auth/authSlice";
import achievementReducer from "../feature/achievement/achievementSlice";
import blogReducer from "../feature/blog/blogSlice";
import certificateReducer from "../feature/certificate/certificateSlice";

const store = configureStore({
  reducer: {
    auths: authReducer,
    achievements: achievementReducer,
    blogs: blogReducer,
    certificates: certificateReducer,
  }
});

export default store;