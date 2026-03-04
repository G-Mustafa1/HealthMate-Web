import { api } from "@/api/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Add/upload a report
export const addReport = createAsyncThunk(
  "report/addReport",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/report/add-report", formData, {
        withCredentials: true,
      });
      return data.report;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);

// Get all reports
export const getReports = createAsyncThunk(
  "report/getReports",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/report/all-reports", {
        withCredentials: true,
      });
      return data.reports;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);

// Get single report
export const getSingleReport = createAsyncThunk(
  "report/getSingleReport",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/report/single-report/${id}`, {
        withCredentials: true,
      });
      return data.report;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Report not found");
    }
  }
);

// Delete a report
export const deleteReport = createAsyncThunk(
  "report/deleteReport",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.delete(`/report/delete-report/${id}`, {
        withCredentials: true,
      });
      return data.report;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to delete report");
    }
  }
);

const reportSlice = createSlice({
  name: "report",
  initialState: {
    reports: [],
    singleReport: null,
    loading: false,
    error: null,
    success: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Add report
      .addCase(addReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addReport.fulfilled, (state, action) => {
        state.loading = false;
        state.reports.unshift(action.payload);
      })
      .addCase(addReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get all reports
      .addCase(getReports.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getReports.fulfilled, (state, action) => {
        state.loading = false;
        state.reports = action.payload;
        state.success = action.payload.message;
      })
      .addCase(getReports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get single report
      .addCase(getSingleReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSingleReport.fulfilled, (state, action) => {
        state.loading = false;
        state.singleReport = action.payload;
      })
      .addCase(getSingleReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete report
      .addCase(deleteReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteReport.fulfilled, (state, action) => {
        state.loading = false;
        state.reports = state.reports.filter(
          (report) => report._id !== action.payload._id
        );
      })
      .addCase(deleteReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default reportSlice.reducer;