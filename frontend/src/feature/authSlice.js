import { api } from "@/api/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const login = createAsyncThunk(
    "auth/login",
    async (credentials, { rejectWithValue }) => {
        try {
            const { data } = await api.post("/auth/login", credentials, {
                withCredentials: true,
            });
            return data;
        } catch (err) {
            return rejectWithValue(err.response?.data || "Something went wrong");
        }
    }
);

export const register = createAsyncThunk(
    "auth/register",
    async (credentials, { rejectWithValue }) => {
        try {
            const { data } = await api.post("/auth/signup", credentials, {
                withCredentials: true,
            });
            return data;
        } catch (err) {
            return rejectWithValue(err.response?.data || "Something went wrong");
        }
    }
);

export const logout = createAsyncThunk(
    "auth/logout",
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.post("/auth/logout", {}, { withCredentials: true });
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || "Something went wrong");
        }
    }
);

export const checkAuth = createAsyncThunk(
    "auth/checkAuth",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await api.get("/auth/user", { withCredentials: true });
            console.log('checkAuth');
            console.log(data);
            return data;
        } catch (err) {
            return rejectWithValue(err.response?.data || "Not authenticated");
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        token: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || null;
            })

            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                // state.user = action.payload.user;

            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || null;
            })
            .addCase(logout.pending, (state) => {
                state.loading = true;

            })
            .addCase(logout.fulfilled, (state) => {
                state.loading = false;
                state.user = null;

            })
            .addCase(logout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(checkAuth.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                state.error = null;
            });
    },
});

export default authSlice.reducer;