import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { API_BASE_URL, axiosInstance } from "../../components/APIConfig";

const initialState = {
  skillsData: [],
  status: "idle",
  error: null,
  skillDetail: null,
  statusDetail: "idle",
};

export const fetchSkill = createAsyncThunk(
  'skills/fetchSkill', async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`${API_BASE_URL}/skills`);

      if (!res?.data?.data) {
        return thunkAPI.rejectWithValue('Skill is not contain any data!');
      }

      // console.log('Skill Data - ', res?.data?.data);
      
      return res?.data?.data ?? [];
    } catch (error) {
      console.log('Error to fetch skill - ', error.response);
      const msg = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(msg);
    }
  }
)

export const fetchSkillDetail = createAsyncThunk(
  'skills/fetchSkillDetail', async (id, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`${API_BASE_URL}/skills/${id}`);

      if (!res?.data?.data) {
        return thunkAPI.rejectWithValue(`Skill with id:${id} is not found!`);
      }

      // console.log('Skill Detail - ', res?.data?.data);

      return res?.data?.data ?? [];
    } catch (error) {
      console.log('Error to fetch skill detail - ', error.response);
      const msg = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(msg);
    }
  }
)

export const createSkill = createAsyncThunk(
  'skills/createSkill', async (formData, thunkAPI) => {
    try {
      const res = await axiosInstance.post(`${API_BASE_URL}/skills`, formData, {
        headers: { "Content-Type": "multipart/form" }
      });

      if (!res?.data?.data) {
        return thunkAPI.rejectWithValue('Failed to create skill');
      }

      // console.log('Skill created - ', res?.data?.data);

      return res?.data?.data ?? [];
    } catch (error) {
      console.log('Error to create skill - ', error.response);
      const msg = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(msg);
    }
  }
)

export const updateSkill = createAsyncThunk(
  'skills/updateSkill', async ({ id, formData }, thunkAPI) => {
    try {
      const res = await axiosInstance.put(`${API_BASE_URL}/skills/${id}`, formData, {
        headers: { "Content-Type": "multipart/form" }
      });

      if (!res?.data?.data) {
        return thunkAPI.rejectWithValue('Failed to update skill');
      }

      // console.log('Skill updated - ', res?.data?.data);

      return res?.data?.data ?? [];
    } catch (error) {
      console.log('Error to update skill - ', error.response);
      const msg = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(msg);
    }
  }
)
export const removeSkillById = createAsyncThunk(
  'skills/removeSkillById', async (id, thunkAPI) => {
    try {
      const res = await axiosInstance.delete(`${API_BASE_URL}/skills/${id}`);

      if (res.status === 200 || res.status === 204) return id;

      if (res?.data?.data) return id;

      return thunkAPI.rejectWithValue("Failed to remove skill");
    } catch (error) {
      console.log('Error to remove skill - ', error.response);
      const msg = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(msg);
    }
  }
)

const skillSlice = createSlice({
  name: "skills",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkill.pending, (state) => {
        state.error = null;
        state.status = "loading";
      })
      .addCase(fetchSkill.fulfilled, (state, action) => {
        state.error = null;
        state.status = "succeeded";
        state.skillsData = action.payload;
      })
      .addCase(fetchSkill.rejected, (state) => {
        state.error = "Unable to fetch skill due to Internal Server Error!";
        state.status = "failed";
      })
      .addCase(fetchSkillDetail.pending, (state) => {
        state.error = null;
        state.statusDetail = "loading";
      })
      .addCase(fetchSkillDetail.fulfilled, (state, action) => {
        state.error = null;
        state.statusDetail = "succeeded";
        state.skillDetail = action.payload;
      })
      .addCase(fetchSkillDetail.rejected, (state) => {
        state.error = "Unable to fetch skill detail due to Internal Server Error!";
        state.statusDetail = "failed";
      })
      .addCase(createSkill.pending, (state) => {
        state.error = null;
        state.status = "loading";
      })
      .addCase(createSkill.fulfilled, (state, action) => {
        state.error = null;
        state.status = "succeeded";
        state.skillsData = [...state.skillsData , action.payload];
      })
      .addCase(createSkill.rejected, (state) => {
        state.error = "Unable to create skill due to Internal Server Error!";
        state.status = "failed";
      })
      .addCase(updateSkill.pending, (state) => {
        state.error = null;
        state.status = "loading";
      })
      .addCase(updateSkill.fulfilled, (state, action) => {
        state.error = null;
        state.status = "succeeded";
        const updated = action.payload;

        state.skillsData = state.skillsData.map((skill) => skill.id === updated.id ? updated : skill);

        state.skillDetail = updated;
      })
      .addCase(updateSkill.rejected, (state) => {
        state.error = "Unable to update skill due to Internal Server Error!";
        state.status = "failed";
      })
      .addCase(removeSkillById.pending, (state) => {
        state.error = null;
        state.status = "loading";
      })
      .addCase(removeSkillById.fulfilled, (state, action) => {
        state.error = null;
        state.status = "succeeded";
        const deletedId = action.payload;

        state.skillsData = state.skillsData.filter((skill) => skill.id !== deletedId);

        if (state.skillDetail?.id === deletedId) {
          state.skillDetail = null;
        }
      })
      .addCase(removeSkillById.rejected, (state) => {
        state.error = "Unable to remove skill due to Internal Server Error!";
        state.status = "failed";
      })
  }
});

export default skillSlice.reducer;
export const selectSkills = state => state.skills.skillsData;
export const selectSkillStatus = state => state.skills.status;
export const selectSkillError = state => state.skills.error;
export const selectSkillDetail = state => state.skills.skillDetail;
export const selectSkillDetailStatus = state => state.skills.statusDetail;