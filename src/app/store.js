import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../feature/auth/authSlice";
import achievementReducer from "../feature/achievement/achievementSlice";
import blogReducer from "../feature/blog/blogSlice";

const store = configureStore({
  reducer: {
    auths: authReducer,
    achievements: achievementReducer,
    blogs: blogReducer,
  }
});

export default store;