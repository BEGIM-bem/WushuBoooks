import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../utils/axiosConfig";


// Add standard
export const addStandard = createAsyncThunk(
    'sportsman/addStandard',
    async(data, { rejectWithValue }) => {
        alert(data);
        try {
            const response = await API.post('/standards', data);
            console.log(response.data);
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
)

// Get sportsman standards
export const getSportsmanStandards = createAsyncThunk(
    'sportsman/getSportsmanStandards',
    async(id, { rejectWithValue }) => {
        try {
            const response = await API.get('/standards/get-by-sportsman/' + id);
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
)

// Get sportsman achievement
export const getSportsmanAchievements = createAsyncThunk(
    'sportsman/getSportsmanAchievement',
    async(id, { rejectWithValue }) => {
        try {
            const response = await API.get('/achievements/get-by-sportsman/' + id);
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
)