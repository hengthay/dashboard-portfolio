import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_BASE_URL, axiosInstance } from "../../components/APIConfig";

const initialState = {
  educationData: [],
  status: "idle",
  error: null,
  educationDetail: null,
  statusDetail: "idle"
};

export const fetchEducation = createAsyncThunk(
  'educations/fetchEducation', async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`${API_BASE_URL}/educations`);

      if(!res?.data?.data) {
        return thunkAPI.rejectWithValue('Education is not contain any data');
      }

      console.log('Education data - ', res?.data?.data);

      return res?.data?.data ?? [];
    } catch (error) {
      console.log('Education fetch data error - ', error.response);
      const msg = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(msg);
    }
  }
)

export const fetchEducationDetail = createAsyncThunk(
  'educations/fetchEducationDetail', async (id, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`${API_BASE_URL}/educations/${id}`);

      if(!res?.data?.data) {
        return thunkAPI.rejectWithValue(`Education with id:${id} is not found!`);
      }

      console.log('Education detail data - ', res?.data?.data);

      return res?.data?.data ?? [];
    } catch (error) {
      console.log('Education fetch detail error - ', error.response);
      const msg = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(msg);
    }
  }
)

export const createEducation = createAsyncThunk(
  "educations/createEducation", async (formData, thunkAPI) => {
    try {
      const res = await axiosInstance.post(`${API_BASE_URL}/educations`, formData, {
        headers: { "Content-Type" : "multipart/form-data"}
      });

      if(!res?.data?.data) {
        return thunkAPI.rejectWithValue('Failed to create education');
      }

      console.log('Education created data - ', res?.data?.data);

      return res?.data?.data ?? [];
    } catch (error) {
      console.log('Education create error - ', error.response);
      const msg = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(msg);
    }
  }
)

export const updateEducation = createAsyncThunk(
  "educations/updateEducation", async ({ id, formData }, thunkAPI) => {
    try {
      const res = await axiosInstance.put(`${API_BASE_URL}/educations/${id}`, formData);

      if(!res?.data?.data) {
        return thunkAPI.rejectWithValue('Failed to create education');
      }

      console.log('Education updated data - ', res?.data?.data);

      return res?.data?.data ?? [];
    } catch (error) {
      console.log('Education update error - ', error.response);
      const msg = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(msg);
    }
  }
)

export const removeEducationById = createAsyncThunk(
  'educations/removeEducationById', async (id, thunkAPI) => {
    try {
      const res = await axiosInstance.delete(`${API_BASE_URL}/educations/${id}`);

      if (res.status === 200 || res.status === 204) return id;

      if (res?.data?.data) return id;

      return thunkAPI.rejectWithValue("Failed to remove education");
    } catch (error) {
      console.log('Education remove error - ', error.response);
      const msg = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(msg);
    }
  }
)

const educationSlice = createSlice({
  name: "educations",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEducation.pending, (state) => {
        state.error = null;
        state.status = "loading";
      })
      .addCase(fetchEducation.fulfilled, (state, action) => {
        state.error = null;
        state.status = "succeeded";
        state.educationData = action.payload;
      })
      .addCase(fetchEducation.rejected, (state) => {
        state.error = "Unable to get educations data due to Internal Server Error!";
        state.status = "failed";
      })
      .addCase(fetchEducationDetail.pending, (state) => {
        state.error = null;
        state.statusDetail = "loading";
      })
      .addCase(fetchEducationDetail.fulfilled, (state, action) => {
        state.error = null;
        state.statusDetail = "succeeded";
        state.educationDetail = action.payload;
      })
      .addCase(fetchEducationDetail.rejected, (state) => {
        state.error = "Unable to get educations detail data due to Internal Server Error!";
        state.statusDetail = "failed";
      })
      .addCase(createEducation.pending, (state) => {
        state.error = null;
        state.status = "loading";
      })
      .addCase(createEducation.fulfilled, (state, action) => {
        state.error = null;
        state.status = "succeeded";
        state.educationData = [...state.educationData, action.payload];
      })
      .addCase(createEducation.rejected, (state) => {
        state.error = "Unable to create educations data due to Internal Server Error!";
        state.status = "failed";
      })
      .addCase(updateEducation.pending, (state) => {
        state.error = null;
        state.status = "loading";
      })
      .addCase(updateEducation.fulfilled, (state, action) => {
        state.error = null;
        state.status = "succeeded";
        const updated = action.payload;
        // Update data in redux store
        state.educationData = state.educationData.map((education) => education.id === updated.id ? updated : education);
        // Update data detail
        state.educationDetail = updated;
      })
      .addCase(updateEducation.rejected, (state) => {
        state.error = "Unable to create educations data due to Internal Server Error!";
        state.status = "failed";
      })
      .addCase(removeEducationById.pending, (state) => {
        state.error = null;
        state.status = "loading";
      })
      .addCase(removeEducationById.fulfilled, (state, action) => {
        state.error = null;
        state.status = "succeeded";
        // Storing delete item
        const deletedId = action.payload;
        // Filter data in redux store
        state.educationData = state.educationData.filter((education) => education.id !== deletedId);
        // Check if education detail id equal to deletedId
        if(state.educationDetail?.id === deletedId) {
          state.educationDetail = null;
        }
      })
      .addCase(removeEducationById.rejected, (state) => {
        state.error = "Unable to remove educations data due to Internal Server Error!";
        state.status = "failed";
      })
  }
})

export default educationSlice.reducer;
export const selectEducation = state => state.educations.educationData;
export const selectEducationStatus = state => state.educations.status;
export const selectEducationError = state => state.educations.error;
export const selectEducationDetail = state => state.educations.educationDetail;
export const selectEducationDetailStatus = state => state.educations.statusDetail;