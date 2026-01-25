import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_BASE_URL, axiosInstance } from "../../components/APIConfig";

const initialState = {
  achievementData: [],
  achievementDetail: null,
  status: "idle",
  statusDetail: "idle",
  error: null,
};

export const fetchAchievement = createAsyncThunk(
  "achievements/fetchAchievement",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`${API_BASE_URL}/achievements`, {
        withCredentials: true,
      });

      if (!res?.data?.data) {
        return thunkAPI.rejectWithValue("Achievement is not exist!");
      }

      // console.log("achievements - ", res?.data?.data);
      return res?.data?.data ?? [];
    } catch (error) {
      console.log("Unable to get achievements - ", error);
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const createAchievement = createAsyncThunk(
  "achievements/createAchievement",
  async (payload, thunkAPI) => {
    try {
      const res = await axiosInstance.post(
        `${API_BASE_URL}/achievements`,
        payload,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      if (!res?.data?.data) {
        return thunkAPI.rejectWithValue("Failed to create new achievements");
      }

      return res?.data?.data ?? [];
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        JSON.stringify(error?.response?.data?.errors || {}) ||
        "Create failed";
      return thunkAPI.rejectWithValue(msg);
    }
  },
);

export const updateAchievement = createAsyncThunk(
  "achievements/updateAchievement",
  async ({ id, formData }, thunkAPI) => {
    try {
      console.log("formdata in redux: ", formData);
      const res = await axiosInstance.put(
        `${API_BASE_URL}/achievements/${id}`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      if (!res?.data?.data) {
        return thunkAPI.rejectWithValue("Failed to updated new achievements");
      }

      return res?.data?.data ?? [];
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        JSON.stringify(error?.response?.data?.errors || {}) ||
        "Create failed";
      console.log(msg);
      return thunkAPI.rejectWithValue(msg);
    }
  },
);

export const fetchAchievementDetail = createAsyncThunk(
  "achievements/fetchAchievementDetail",
  async (id, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`${API_BASE_URL}/achievements/${id}`);

      if (!res?.data?.data) {
        return thunkAPI.rejectWithValue("Failed to get achievement details");
      }

      // console.log('Individual Achievement - ', res?.data?.data);

      return res?.data?.data ?? [];
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        JSON.stringify(error?.response?.data?.errors || {}) ||
        "Update failed";
      console.log(msg);
      return thunkAPI.rejectWithValue(msg);
    }
  },
);

export const removeAchievementById = createAsyncThunk(
  "achievements/removeAchievementById",
  async (id, thunkAPI) => {
    try {
      const res = await axiosInstance.delete(
        `${API_BASE_URL}/achievements/${id}`,
      );

      // ✅ Treat 200 or 204 as success (many APIs return no data for delete)
      if (res.status === 200 || res.status === 204) return id;

      // ✅ fallback if your API returns data.data
      if (res?.data?.data) return id;

      return thunkAPI.rejectWithValue("Failed to delete achievement");
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        JSON.stringify(error?.response?.data?.errors || {}) ||
        "Deleted failed";
      console.log(msg);
      return thunkAPI.rejectWithValue(msg);
    }
  },
);

const achievementSlice = createSlice({
  name: "achievements",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAchievement.pending, (state) => {
        state.error = null;
        state.status = "loading";
      })
      .addCase(fetchAchievement.fulfilled, (state, action) => {
        state.error = null;
        state.status = "succeeded";
        state.achievementData = action.payload;
      })
      .addCase(fetchAchievement.rejected, (state) => {
        state.error = "Unable to get achievemnts due to Internal Server!";
        state.status = "failed";
      })
      .addCase(createAchievement.pending, (state) => {
        state.error = null;
        state.status = "loading";
      })
      .addCase(createAchievement.fulfilled, (state, action) => {
        state.error = null;
        state.status = "succeeded";
        state.achievementData = [action.payload, ...state.achievementData];
      })
      .addCase(createAchievement.rejected, (state) => {
        state.error = "Unable to get achievemnts due to Internal Server!";
        state.status = "failed";
      })
      .addCase(updateAchievement.pending, (state) => {
        state.error = null;
        state.status = "loading";
      })
      .addCase(updateAchievement.fulfilled, (state, action) => {
        state.error = null;
        state.status = "succeeded";
        const updated = action.payload;
        state.achievementData = state.achievementData.map((a) =>
          a.id === updated.id ? updated : a,
        );
        state.achievementDetail = updated;
      })
      .addCase(updateAchievement.rejected, (state) => {
        state.error = "Unable to update achievemnts due to Internal Server!";
        state.status = "failed";
      })
      .addCase(fetchAchievementDetail.pending, (state) => {
        state.error = null;
        state.statusDetail = "loading";
      })
      .addCase(fetchAchievementDetail.fulfilled, (state, action) => {
        state.error = null;
        state.statusDetail = "succeeded";
        state.achievementDetail = action.payload;
      })
      .addCase(fetchAchievementDetail.rejected, (state) => {
        state.error =
          "Unable to get individual achievemnts due to Internal Server!";
        state.statusDetail = "failed";
      })
      .addCase(removeAchievementById.pending, (state) => {
        state.error = null;
        state.status = "loading";
      })
      .addCase(removeAchievementById.fulfilled, (state, action) => {
        state.error = null;
        state.status = "succeeded";
        const deletedId = action.payload;

        state.achievementData = state.achievementData.filter(
          (a) => a.id !== deletedId,
        );

        // ✅ if detail is the deleted one, clear it
        if (state.achievementDetail?.id === deletedId) {
          state.achievementDetail = null;
        }
      })
      .addCase(removeAchievementById.rejected, (state) => {
        state.error =
          "Unable to get individual achievemnts due to Internal Server!";
        state.status = "failed";
      });
  },
});

export default achievementSlice.reducer;
export const selectAchievement = (state) => state.achievements.achievementData;
export const selectAchievementStatus = (state) => state.achievements.status;
export const selectAchievementError = (state) => state.achievements.error;
export const selectAchievementStatusDetail = (state) =>
  state.achievements.statusDetail;
export const selectAchievementDetail = (state) =>
  state.achievements.achievementDetail;
