import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_BASE_URL, axiosInstance } from "../../components/APIConfig";

const initialState = {
  projectsData: [],
  status: "idle",
  error: null,
  projectDetail: null,
  statusDetail: "idle"
};

export const fetchProject = createAsyncThunk(
  "projects/fetchProject", async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`${API_BASE_URL}/projects`);

      if(!res?.data?.data) {
        return thunkAPI.rejectWithValue('Project did not contain any data!');
      }

      console.log('Project Data - ', res?.data?.data);

      return res?.data?.data ?? [];
    } catch (error) {
      console.log("Error to fetch project data - ", error.response);
      const msg = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(msg);
    }
  }
)

export const fetchProjectDetail = createAsyncThunk(
  "projects/fetchProjectDetail", async (id, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`${API_BASE_URL}/projects/${id}`);

      if(!res?.data?.data) {
        return thunkAPI.rejectWithValue(`Project with id:${id} is not found!`);
      }

      console.log('Project Detail - ', res?.data?.data);

      return res?.data?.data ?? [];
    } catch (error) {
      console.log("Error to fetch project detail - ", error.response);
      const msg = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(msg);
    }
  }
)

export const createProject = createAsyncThunk(
  "projects/createProject", async (formData, thunkAPI) => {
    try {
      const res = await axiosInstance.post(`${API_BASE_URL}/projects`, formData, {
        headers: { "Content-Type" : "multipart/form"}
      });

      if(!res?.data?.data) {
        return thunkAPI.rejectWithValue('Failed to create project');
      }

      console.log('Project created - ', res?.data?.data);

      return res?.data?.data ?? [];
    } catch (error) {
      console.log("Error to create project - ", error.response);
      const msg = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(msg);
    }
  }
)

export const updateProject = createAsyncThunk(
  "projects/updateProject", async ({ id, formData }, thunkAPI) => {
    try {
      const res = await axiosInstance.put(`${API_BASE_URL}/projects/${id}`, formData, {
        headers: {"Content-Type": "multipart/form"}
      });

      if(!res?.data?.data) {
        return thunkAPI.rejectWithValue('Failed to update project');
      }

      console.log('Project updated - ', res?.data?.data);

      return res?.data?.data ?? [];
    } catch (error) {
      console.log("Error to update project - ", error.response);
      const msg = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(msg);
    }
  }
)

export const removeProjectById = createAsyncThunk(
  "projects/removeProjectById", async (id, thunkAPI) => {
    try {
      const res = await axiosInstance.delete(`${API_BASE_URL}/projects/${id}`);

      if (res.status === 200 || res.status === 204) return id;

      if (res?.data?.data) return id;

      return thunkAPI.rejectWithValue("Failed to delete project!");
    } catch (error) {
      console.log("Error to update project - ", error.response);
      const msg = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(msg);
    }
  }
)

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProject.pending, (state) => {
        state.error = null;
        state.status = "loading";
      })
      .addCase(fetchProject.fulfilled, (state, action) => {
        state.error = null;
        state.status = "succeeded";
        state.projectsData = action.payload;
      })
      .addCase(fetchProject.rejected, (state) => {
        state.error = "Unable to get projects data due to Internal Server Error!";
        state.status = "failed";
      })
      .addCase(fetchProjectDetail.pending, (state) => {
        state.error = null;
        state.statusDetail = "loading";
      })
      .addCase(fetchProjectDetail.fulfilled, (state, action) => {
        state.error = null;
        state.statusDetail = "succeeded";
        state.projectDetail = action.payload;
      })
      .addCase(fetchProjectDetail.rejected, (state) => {
        state.error = "Unable to get projects detail due to Internal Server Error!";
        state.statusDetail = "failed";
      })
      .addCase(createProject.pending, (state) => {
        state.error = null;
        state.status = "loading";
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.error = null;
        state.status = "succeeded";
        state.projectsData = [...state.projectsData, action.payload];
      })
      .addCase(createProject.rejected, (state) => {
        state.error = "Unable to create projects due to Internal Server Error!";
        state.status = "failed";
      })
      .addCase(updateProject.pending, (state) => {
        state.error = null;
        state.status = "loading";
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.error = null;
        state.status = "succeeded";
        const updated = action.payload;

        state.projectsData = state.projectsData.map((project) => project.id === updated.id ? updated : project);

        state.projectDetail = updated;
      })
      .addCase(updateProject.rejected, (state) => {
        state.error = "Unable to update projects due to Internal Server Error!";
        state.status = "failed";
      })
      .addCase(removeProjectById.pending, (state) => {
        state.error = null;
        state.status = "loading";
      })
      .addCase(removeProjectById.fulfilled, (state, action) => {
        state.error = null;
        state.status = "succeeded";
        const deletedId = action.payload;

        state.projectsData = state.projectsData.filter((project) => project.id !== deletedId);

        if (state.projectDetail?.id === deletedId) {
          state.projectDetail = null;
        }
      })
      .addCase(removeProjectById.rejected, (state) => {
        state.error = "Unable to remove projects due to Internal Server Error!";
        state.status = "failed";
      })
  }
});

export default projectSlice.reducer;
export const selectProject = state => state.projects.projectsData;
export const selectProjectStatus = state => state.projects.status;
export const selectProjectError = state => state.projects.error;
export const selectProjectDetail = state => state.projects.projectDetail;
export const selectProjectDetailStatus = state => state.projects.statusDetail;