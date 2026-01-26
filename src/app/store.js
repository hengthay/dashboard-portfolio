import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../feature/auth/authSlice";
import achievementReducer from "../feature/achievement/achievementSlice";
import blogReducer from "../feature/blog/blogSlice";
import certificateReducer from "../feature/certificate/certificateSlice";
import educationReducer from "../feature/education/educationSlice";
import experienceReducer from "../feature/experience/experienceSlice";


const store = configureStore({
  reducer: {
    auths: authReducer,
    achievements: achievementReducer,
    blogs: blogReducer,
    certificates: certificateReducer,
    educations: educationReducer,
    experiences: experienceReducer,
  }
});

export default store;