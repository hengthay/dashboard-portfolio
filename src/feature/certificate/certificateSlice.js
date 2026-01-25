import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_BASE_URL, axiosInstance } from "../../components/APIConfig";

const initialState = {
  certificateData: [],
  status: "idle",
  error: null,
  certificateDetail: null,
  statusDetail: "idle",
};

export const fetchCertificate = createAsyncThunk(
  "certificates/fetchCertificate",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`${API_BASE_URL}/certificates`);

      if (!res?.data?.data) {
        return thunkAPI.rejectWithValue(
          "Certificate did not contain any data!",
        );
      }

      console.log("Certificate - ", res?.data?.data);

      return res?.data?.data ?? [];
    } catch (error) {
      console.log("Certificate fetch data error - ", error.response);
      const msg = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(msg);
    }
  },
);

export const fetchCertificateDetail = createAsyncThunk(
  "certificates/fetchCertificateDetail",
  async (id, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`${API_BASE_URL}/certificates/${id}`);

      if (!res?.data?.data) {
        return thunkAPI.rejectWithValue(
          `Certificate with id:${id} is not found!`,
        );
      }

      console.log("Certificate detail - ", res?.data?.data);

      return res?.data?.data ?? [];
    } catch (error) {
      console.log("Certificate fetch detail error - ", error.response);
      const msg = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(msg);
    }
  },
);

export const createCertificate = createAsyncThunk(
  "certificates/createCertificate",
  async (formData, thunkAPI) => {
    try {
      const res = await axiosInstance.post(
        `${API_BASE_URL}/certificates`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      if (!res?.data?.data) {
        return thunkAPI.rejectWithValue("Failed to create certificate");
      }

      console.log("Certificate created - ", res?.data?.data);

      return res?.data?.data ?? [];
    } catch (error) {
      console.log("Certificate create error - ", error.response);
      const msg = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(msg);
    }
  },
);

export const updateCertificate = createAsyncThunk(
  "certificates/updateCertificate",
  async ({ id, formData }, thunkAPI) => {
    try {
      const res = await axiosInstance.put(
        `${API_BASE_URL}/certificates/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      if (!res?.data?.data) {
        return thunkAPI.rejectWithValue("Failed to update certificate");
      }

      console.log("Certificate updated - ", res?.data?.data);

      return res?.data?.data ?? [];
    } catch (error) {
      console.log("Certificate update error - ", error.response);
      const msg = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(msg);
    }
  },
);

export const removeCertificateById = createAsyncThunk(
  "certificates/removeCertificateById",
  async (id, thunkAPI) => {
    try {
      const res = await axiosInstance.delete(
        `${API_BASE_URL}/certificates/${id}`);

      // ✅ Treat 200 or 204 as success (many APIs return no data for delete)
      if (res.status === 200 || res.status === 204) return id;

      // ✅ fallback if your API returns data.data
      if (res?.data?.data) return id;

      return thunkAPI.rejectWithValue("Failed to delete certificate");
    } catch (error) {
      console.log("Certificate remove error - ", error.response);
      const msg = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(msg);
    }
  },
);

const certificateSlice = createSlice({
  name: "certificates",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCertificate.pending, (state) => {
        state.error = null;
        state.status = "loading";
      })
      .addCase(fetchCertificate.fulfilled, (state, action) => {
        state.error = null;
        state.status = "succeeded";
        state.certificateData = action.payload;
      })
      .addCase(fetchCertificate.rejected, (state) => {
        state.error =
          "Unable to get certificate data due to Internal Server Error!";
        state.status = "failed";
      })
      .addCase(fetchCertificateDetail.pending, (state) => {
        state.error = null;
        state.statusDetail = "loading";
      })
      .addCase(fetchCertificateDetail.fulfilled, (state, action) => {
        state.error = null;
        state.statusDetail = "succeeded";
        state.certificateDetail = action.payload;
      })
      .addCase(fetchCertificateDetail.rejected, (state) => {
        state.error =
          "Unable to get individual certificate data due to Internal Server Error!";
        state.statusDetail = "failed";
      })
      .addCase(createCertificate.pending, (state) => {
        state.error = null;
        state.status = "loading";
      })
      .addCase(createCertificate.fulfilled, (state, action) => {
        state.error = null;
        state.status = "succeeded";
        state.certificateData = [...state.certificateData, action.payload];
      })
      .addCase(createCertificate.rejected, (state) => {
        state.error =
          "Unable to create certificate data due to Internal Server Error!";
        state.status = "failed";
      })
      .addCase(updateCertificate.pending, (state) => {
        state.error = null;
        state.status = "loading";
      })
      .addCase(updateCertificate.fulfilled, (state, action) => {
        state.error = null;
        state.status = "succeeded";
        const updated = action.payload;

        state.certificateData = state.certificateData.map((c) => c.id === updated.id ? updated : c);

        state.certificateDetail = updated;
      })
      .addCase(updateCertificate.rejected, (state) => {
        state.error =
          "Unable to update certificate data due to Internal Server Error!";
        state.status = "failed";
      })
      .addCase(removeCertificateById.pending, (state) => {
        state.error = null;
        state.status = "loading";
      })
      .addCase(removeCertificateById.fulfilled, (state, action) => {
        state.error = null;
        state.status = "succeeded";
        const deletedId = action.payload;

        state.certificateData = state.certificateData.filter((c) => c.id !== deletedId);

        if(state.certificateDetail?.id === deletedId) {
          state.certificateDetail = null;
        }
      })
      .addCase(removeCertificateById.rejected, (state) => {
        state.error =
          "Unable to delete certificate data due to Internal Server Error!";
        state.status = "failed";
      })
  },
});

export default certificateSlice.reducer;
export const selectCertificate = (state) => state.certificates.certificateData;
export const selectCertificateStatus = (state) => state.certificates.status;
export const selectCertificateError = (state) => state.certificates.error;
export const selectCertificateDetail = (state) =>
  state.certificates.certificateDetail;
export const selectCertificateDetailStatus = (state) =>
  state.certificates.statusDetail;
