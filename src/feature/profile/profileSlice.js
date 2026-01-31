import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_BASE_URL, axiosInstance } from "../../components/APIConfig";

const initialState = {
  profileData: [],
  status: "idle",
  error: null,
  profileDetail: null,
  statusDetail: "idle",
};

export const fetchProfile = createAsyncThunk(
  'profiles/fetchProfile', async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`${API_BASE_URL}/profiles`);

      if(!res?.data?.data) return thunkAPI.rejectWithValue('Profile did not contain any data!');

      // console.log('Profile Data - ', res?.data?.data);

      return res?.data?.data ?? [];
    } catch (error) {
      console.log('Error to fetch profile data - ', error.response);
      const msg = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

export const fetchProfileDetail = createAsyncThunk(
  'profiles/fetchProfileDetail', async (id, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`${API_BASE_URL}/profiles/${id}`);

      if(!res?.data?.data) return thunkAPI.rejectWithValue(`Profile with id:${id} is not found!`);

      // console.log('Profile Detail - ', res?.data?.data);

      return res?.data?.data ?? [];
    } catch (error) {
      console.log('Error to fetch profile detail - ', error.response);
      const msg = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

export const createProfile = createAsyncThunk(
  'profiles/createProfile', async (formData, thunkAPI) => {
    try {
      const res = await axiosInstance.post(`${API_BASE_URL}/profiles/`, formData, {
        headers: { "Content-Type" : "multipart/form"}
      });

      if(!res?.data?.data) return thunkAPI.rejectWithValue('Failed to create profile!');

      // console.log('Profile created - ', res?.data?.data);

      return res?.data?.data ?? [];
    } catch (error) {
      console.log('Error to create profile - ', error.response);
      const msg = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

export const updateProfile = createAsyncThunk(
  'profiles/updateProfile', async ({ id, formData }, thunkAPI) => {
    try {
      const res = await axiosInstance.put(`${API_BASE_URL}/profiles/${id}`, formData, {
        headers: { "Content-Type" : "multipart/form"}
      });

      if(!res?.data?.data) return thunkAPI.rejectWithValue('Failed to update profile!');

      // console.log('Profile updated - ', res?.data?.data);

      return res?.data?.data ?? [];
    } catch (error) {
      console.log('Error to update profile - ', error.response);
      const msg = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

export const removeProfileById = createAsyncThunk(
  'profiles/removeProfileById', async (id, thunkAPI) => {
    try {
      const res = await axiosInstance.delete(`${API_BASE_URL}/profiles/${id}`);

      if (res.status === 200 || res.status === 204) return id;

      if (res?.data?.data) return id;

      return thunkAPI.rejectWithValue("Failed to remove profile!");
    } catch (error) {
      console.log('Error to update profile - ', error.response);
      const msg = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

const profileSlice = createSlice({
  name: "profiles",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.error = null;
        state.status = "loading";
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.error = null;
        state.status = "succeeded";
        state.profileData = action.payload;
      })
      .addCase(fetchProfile.rejected, (state) => {
        state.error = "Unable to fetch profile due to Internal Server Error!";
        state.status = "failed";
      })
      .addCase(fetchProfileDetail.pending, (state) => {
        state.error = null;
        state.statusDetail = "loading";
      })
      .addCase(fetchProfileDetail.fulfilled, (state, action) => {
        state.error = null;
        state.statusDetail = "succeeded";
        state.profileDetail = action.payload;
      })
      .addCase(fetchProfileDetail.rejected, (state) => {
        state.error = "Unable to fetch profile due to Internal Server Error!";
        state.statusDetail = "failed";
      })
      .addCase(createProfile.pending, (state) => {
        state.error = null;
        state.status = "loading";
      })
      .addCase(createProfile.fulfilled, (state, action) => {
        state.error = null;
        state.status = "succeeded";
        state.profileData = [...state.profileData , action.payload];
      })
      .addCase(createProfile.rejected, (state) => {
        state.error = "Unable to create profile due to Internal Server Error!";
        state.status = "failed";
      })
      .addCase(updateProfile.pending, (state) => {
        state.error = null;
        state.status = "loading";
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.error = null;
        state.status = "succeeded";
        const updated = action.payload;

        state.profileData = state.profileData.map((profile) => profile.id === updated.id ? updated : profile);
        
        state.profileDetail = updated;
      })
      .addCase(updateProfile.rejected, (state) => {
        state.error = "Unable to update profile due to Internal Server Error!";
        state.status = "failed";
      })
      .addCase(removeProfileById.pending, (state) => {
        state.error = null;
        state.status = "loading";
      })
      .addCase(removeProfileById.fulfilled, (state, action) => {
        state.error = null;
        state.status = "succeeded";
        const deletedId = action.payload;

        state.profileData = state.profileData.filter((profile) => profile.id !== deletedId);

        if (state.profileDetail?.id === deletedId) {
          state.profileDetail = null;
        }
      })
      .addCase(removeProfileById.rejected, (state) => {
        state.error = "Unable to remove profile due to Internal Server Error!";
        state.status = "failed";
      })
      
  }
});

export default profileSlice.reducer;
export const selectProfile = state => state.profiles.profileData;
export const selectProfileStatus = state => state.profiles.status;
export const selectProfileError = state => state.profiles.error;
export const selectProfileDetail = state => state.profiles.profileDetail;
export const selectProfileDetailStatus = state => state.profiles.statusDetail;