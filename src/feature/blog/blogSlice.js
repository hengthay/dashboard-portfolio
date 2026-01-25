import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_BASE_URL, axiosInstance } from "../../components/APIConfig";

const initialState = {
  blogsData: [],
  blogDetail: null,
  statusDetail: "idle",
  status: "idle",
  error: null,
};

export const fetchBlog = createAsyncThunk(
  "blogs/fetchBlog",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`${API_BASE_URL}/blogs`);

      if (!res?.data?.data) {
        return thunkAPI.rejectWithValue("Blogs is not contain any data!");
      }

      console.log("Blog data - ", res?.data?.data);

      return res?.data?.data ?? [];
    } catch (error) {
      console.log('get blog error response:', error.response); // Better debugging
      const msg =
        error?.response?.data?.message ||
        JSON.stringify(error?.response?.data?.errors || {}) ||
        "Fetch data failed";
      return thunkAPI.rejectWithValue(msg);
    }
  },
);

export const fetchBlogDetail = createAsyncThunk(
  'blogs/fetchBlogDetail', async (id, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`${API_BASE_URL}/blogs/${id}`);

      if (!res?.data?.data) {
        return thunkAPI.rejectWithValue(`Blog with id: ${id} is not found!`);
      }

      console.log("Blog Detail data - ", res?.data?.data);

      return res?.data?.data ?? [];
    } catch (error) {
      console.log('blog detail error response:', error.response); // Better debugging
      const msg =
        error?.response?.data?.message ||
        JSON.stringify(error?.response?.data?.errors || {}) ||
        "Fetch data details failed";
      return thunkAPI.rejectWithValue(msg);
    }
  }
)
export const createBlog = createAsyncThunk(
  'blogs/createBlog', async (formData, thunkAPI) => {
    try {
      const res = await axiosInstance.post(`${API_BASE_URL}/blogs`, formData, {
        headers: { 'Content-Type': "multipart/form-data" }
      });

      if (!res?.data?.data) {
        return thunkAPI.rejectWithValue('Blog is not able to create');
      }

      console.log("Blog updated - ", res?.data?.data);

      return res?.data?.data ?? [];
    } catch (error) {
      console.log('create error response:', error.response); // Better debugging
      const msg =
        error?.response?.data?.message ||
        JSON.stringify(error?.response?.data?.errors || {}) ||
        "Blog create failed";
      return thunkAPI.rejectWithValue(msg);
    }
  }
)
export const updateBlog = createAsyncThunk(
  'blogs/updateBlog',
  async ({ id, formData }, thunkAPI) => {
    try {

      const res = await axiosInstance.put(`${API_BASE_URL}/blogs/${id}`, formData, {
        withCredentials: true,
        headers: { 'Content-Type': "multipart/form-data" }
      });
      
      if (!res?.data?.data) {
        return thunkAPI.rejectWithValue('Blog is not able to update');
      }
      
      console.log("Blog updated - ", res?.data?.data);
      return res?.data?.data ?? [];
    } catch (error) {
      console.log('update error response:', error.response); // Better debugging
      const msg = error?.response?.data?.message || 
                  JSON.stringify(error?.response?.data?.errors || {}) || 
                  "Blog update failed";
      return thunkAPI.rejectWithValue(msg);
    }
  }
)

export const removeBlogById = createAsyncThunk(
  'blogs/removeBlogById', async (id, thunkAPI) => {
    try {
      const res = await axiosInstance.delete(`${API_BASE_URL}/blogs/${id}`);

      // ✅ Treat 200 or 204 as success (many APIs return no data for delete)
      if (res.status === 200 || res.status === 204) return id;

      // ✅ fallback if your API returns data.data
      if (res?.data?.data) return id;

      return thunkAPI.rejectWithValue("Failed to delete blog");
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        JSON.stringify(error?.response?.data?.errors || {}) ||
        "Blog create failed";
      return thunkAPI.rejectWithValue(msg);
    }
  }
)

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlog.pending, (state) => {
        state.error = null;
        state.status = "loading";
      })
      .addCase(fetchBlog.fulfilled, (state, action) => {
        state.error = null;
        state.status = "succeeded";
        state.blogsData = action.payload;
      })
      .addCase(fetchBlog.rejected, (state) => {
        state.error = "Unable to get blogs due to Internal Server!";
        state.status = "failed";
      })
      .addCase(fetchBlogDetail.pending, (state) => {
        state.error = null;
        state.statusDetail = "loading";
      })
      .addCase(fetchBlogDetail.fulfilled, (state, action) => {
        state.error = null;
        state.status = "succeeded";
        state.blogDetail = action.payload;
      })
      .addCase(fetchBlogDetail.rejected, (state) => {
        state.error = "Unable to get individual blogs due to Internal Server!";
        state.statusDetail = "failed";
      })
      .addCase(createBlog.pending, (state) => {
        state.error = null;
        state.status = "loading";
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.error = null;
        state.status = "succeeded";
        state.blogsData = [action.payload, ...state.blogsData];
      })
      .addCase(createBlog.rejected, (state) => {
        state.error = "Unable to create blogs due to Internal Server!";
        state.status = "failed";
      })
      .addCase(updateBlog.pending, (state) => {
        state.error = null;
        state.status = "loading";
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.error = null;
        state.status = "succeeded";
        const updated = action.payload;

        state.blogsData = state.blogsData.map((b) => b.id === updated.id ? updated : b);

        state.blogDetail = updated;
      })
      .addCase(updateBlog.rejected, (state) => {
        state.error = "Unable to update blogs due to Internal Server!";
        state.status = "failed";
      })
      .addCase(removeBlogById.pending, (state) => {
        state.error = null;
        state.status = "loading";
      })
      .addCase(removeBlogById.fulfilled, (state, action) => {
        state.error = null;
        state.status = "succeeded";
        const deletedId = action.payload;

        state.blogsData = state.blogsData.filter((b) => b.id !== deletedId);

        if(state.blogDetail?.id === deletedId) {
          state.blogDetail = null;
        }
      })
      .addCase(removeBlogById.rejected, (state) => {
        state.error = "Unable to delete blogs due to Internal Server!";
        state.status = "failed";
      })
  },
});

export default blogSlice.reducer;
export const selectBlog = state => state.blogs.blogsData;
export const selectBlogStatus = state => state.blogs.status;
export const selectBlogError = state => state.blogs.error;
export const selectBlogDetail = state => state.blogs.blogDetail;
export const selectBlogDetailStatus = state => state.blogs.statusDetail;