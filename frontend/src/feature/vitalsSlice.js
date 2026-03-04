import { api } from "@/api/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Add a vital
export const addVital = createAsyncThunk(
  "vitals/addVital",
  async (vitalData, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/vitals/add-vitial", vitalData, {
        withCredentials: true,
      });
      return data.vitals;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to add vital");
    }
  }
);

// Get all vitals
export const getVitals = createAsyncThunk(
  "vitals/getVitals",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/vitals/all-vitals", {
        withCredentials: true,
      });
      return data.vitals;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch vitals");
    }
  }
);

// Delete a vital
export const deleteVital = createAsyncThunk(
  "vitals/deleteVital",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.delete(`/vitals/delete/${id}`, {
        withCredentials: true,
      });
      return data.vital;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to delete vital");
    }
  }
);

const vitalsSlice = createSlice({
  name: "vitals",
  initialState: {
    vitals: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Add vital
      .addCase(addVital.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addVital.fulfilled, (state, action) => {
        state.loading = false;
        state.vitals.unshift(action.payload);
      })
      .addCase(addVital.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get vitals
      .addCase(getVitals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getVitals.fulfilled, (state, action) => {
        state.loading = false;
        state.vitals = action.payload;
      })
      .addCase(getVitals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete vital
      .addCase(deleteVital.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteVital.fulfilled, (state, action) => {
        state.loading = false;
        state.vitals = state.vitals.filter(
          (vital) => vital._id !== action.payload._id
        );
      })
      .addCase(deleteVital.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default vitalsSlice.reducer;