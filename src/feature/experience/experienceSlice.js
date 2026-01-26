import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_BASE_URL, axiosInstance } from "../../components/APIConfig";

const initialState = {
  experienceData: [],
  status: "idle",
  error: null,
  experienceDetail: null,
  statusDetail: "idle"
};

export const fetchExperience = createAsyncThunk(
  'experiences/fetchExperience', async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`${API_BASE_URL}/experiences`);

      if(!res?.data?.data) {
        return thunkAPI.rejectWithValue("Experiences didn't contain any data!");
      }

      console.log("Experiences data - ", res?.data?.data);

      return res?.data?.data ?? [];
    } catch (error) {
      console.log('Error fetch experience data - ', error.response);
      const msg = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(msg);
    }
  }
)

export const fetchExperienceDetail = createAsyncThunk(
  'experiences/fetchExperienceDetail', async (id, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`${API_BASE_URL}/experiences/${id}`);

      if(!res?.data?.data) {
        return thunkAPI.rejectWithValue(`Experience with id:${id} is not found!`);
      }

      console.log("Experiences detail - ", res?.data?.data);
      
      return res?.data?.data ?? [];
    } catch (error) {
      console.log('Error fetch experience detail - ', error.response);
      const msg = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(msg);
    }
  }
)

export const createExperience = createAsyncThunk(
  'experiences/createExperience', async (formData, thunkAPI) => {
    try {
      const res = await axiosInstance.post(`${API_BASE_URL}/experiences`, formData, {
        headers: {"Content-Type": "multipart/form"}
      });

      if(!res?.data?.data) {
        return thunkAPI.rejectWithValue("Failed to create experience");
      }

      console.log("Experiences created - ", res?.data?.data);
      
      return res?.data?.data ?? [];
    } catch (error) {
      console.log('Error create experience - ', error.response);
      const msg = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(msg);
    }
  }
)

export const updateExperience = createAsyncThunk(
  'experiences/updateExperience', async ({ id, formData }, thunkAPI) => {
    try {
      const res = await axiosInstance.put(`${API_BASE_URL}/experiences/${id}`, formData);

      if(!res?.data?.data) {
        return thunkAPI.rejectWithValue("Failed to update experience");
      }

      console.log("Experiences updated - ", res?.data?.data);
      
      return res?.data?.data ?? [];
    } catch (error) {
      console.log('Error update experience - ', error.response);
      const msg = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(msg);
    }
  }
)

export const removeExperienceById = createAsyncThunk(
  'experiences/removeExperienceById', async (id, thunkAPI) => {
    try {
      const res = await axiosInstance.delete(`${API_BASE_URL}/experiences/${id}`);

      if (res.status === 200 || res.status === 204) return id;

      if (res?.data?.data) return id;

      return thunkAPI.rejectWithValue("Failed to delete experience!");
    } catch (error) {
      console.log('Error update experience - ', error.response);
      const msg = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(msg);
    }
  }
)

const experienceSlice = createSlice({
  name: "experiences",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExperience.pending, (state) => {
        state.error = null;
        state.status = "loading";
      })
      .addCase(fetchExperience.fulfilled, (state, action) => {
        state.error = null;
        state.status = "succeeded";
        state.experienceData = action.payload;
      })
      .addCase(fetchExperience.rejected, (state) => {
        state.status = "failed";
        state.error = "Unable to get experience data due to Internal Server Error!";
      })
      .addCase(fetchExperienceDetail.pending, (state) => {
        state.error = null;
        state.statusDetail = "loading";
      })
      .addCase(fetchExperienceDetail.fulfilled, (state, action) => {
        state.error = null;
        state.statusDetail = "succeeded";
        state.experienceDetail = action.payload;
      })
      .addCase(fetchExperienceDetail.rejected, (state) => {
        state.statusDetail = "failed";
        state.error = "Unable to get experience detail due to Internal Server Error!";
      })
      .addCase(createExperience.pending, (state) => {
        state.error = null;
        state.status = "loading";
      })
      .addCase(createExperience.fulfilled, (state, action) => {
        state.error = null;
        state.status = "succeeded";
        state.experienceData = [...state.experienceData, action.payload];
      })
      .addCase(createExperience.rejected, (state) => {
        state.status = "failed";
        state.error = "Unable to create experience due to Internal Server Error!";
      })
      .addCase(updateExperience.pending, (state) => {
        state.error = null;
        state.status = "loading";
      })
      .addCase(updateExperience.fulfilled, (state, action) => {
        state.error = null;
        state.status = "succeeded";
        const updated = action.payload;
        // Find experience data and update new data
        state.experienceData = state.experienceData.map((experience) => experience.id === updated.id ? updated : experience);
        // Update experince detail
        state.experienceDetail = updated;
      })
      .addCase(updateExperience.rejected, (state) => {
        state.status = "failed";
        state.error = "Unable to update experience due to Internal Server Error!";
      })
      .addCase(removeExperienceById.pending, (state) => {
        state.error = null;
        state.status = "loading";
      })
      .addCase(removeExperienceById.fulfilled, (state, action) => {
        state.error = null;
        state.status = "succeeded";
        // Storing delete item
        const deletedId = action.payload;
        // Filter data in redux store
        state.experienceData = state.experienceData.filter((experience) => experience.id !== deletedId);
        // Check if education detail id equal to deletedId
        if (state.experienceDetail?.id === deletedId) {
          state.experienceDetail = null;
        }
      })
      .addCase(removeExperienceById.rejected, (state) => {
        state.status = "failed";
        state.error = "Unable to remove experience due to Internal Server Error!";
      })
  }
});

export default experienceSlice.reducer;
export const selectExperience = state => state.experiences.experienceData;
export const selectExperienceStatus = state => state.experiences.status;
export const selectExperienceError = state => state.experiences.error;
export const selectExperienceDetail = state => state.experiences.experienceDetail;
export const selectExperienceDetailStatus = state => state.experiences.statusDetail;