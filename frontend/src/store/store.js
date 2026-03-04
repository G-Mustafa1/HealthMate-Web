import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../feature/authSlice";
import reportSlice from "../feature/reportSlice";
import vitalSlice from "../feature/vitalsSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        report: reportSlice,
        vital: vitalSlice
    },
});

export default store;