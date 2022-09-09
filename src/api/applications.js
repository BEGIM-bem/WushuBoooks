import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../utils/axiosConfig";

// Create application
export const createApplication = createAsyncThunk(
    'application/createApplication',
    async(data, { rejectWithValue }) => {
        try {
            const response = await API.post('/applications', data);
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
)

// Get applications by event
export const getApplications = createAsyncThunk(
    'application/getApplications',
    async(id, { rejectWithValue }) => {
        try {
            const response = await API.get('/applications/get-by-event/' + id);
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
)