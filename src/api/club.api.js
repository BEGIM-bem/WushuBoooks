import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../utils/axiosConfig";

// Get sportsman by id
export const getSportsmanById = createAsyncThunk(
    'club/getSportsmanById',
    async(id, { rejectWithValue }) => {
        try {
            const response = await API.get('/sportsmen/get-by-id/' + id);
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
)

// Add sportsman
export const addSportsmanApi = createAsyncThunk(
    'club/addSportsman',
    async(data, { rejectWithValue }) => {
        try {
            const response = await API.post('/sportsmen', data);
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
)

// Delete club by id
export const deleteClub = createAsyncThunk(
    'club/deleteClub',
    async(id, { rejectedWithValue }) => {
        try {
            const response = await API.delete('/clubs/' + id);
            return response.data;
        } catch (e) {
            return rejectedWithValue(e.response.data.message);
        }
    }
)

// Get club by id
export const getClubById = createAsyncThunk(
    'club/getClubById',
    async(id, { rejectedWithValue }) => {
        try {
            const response = await API.get('/clubs/get-by-id/' + id);
            return response.data;
        } catch (e) {
            return rejectedWithValue(e.response.data.message);
        }
    }
)

// Get all clubs
export const getAllClubs = createAsyncThunk(
    'club/getAllClubs',
    async(_, { rejectedWithValue }) => {
        try {
            const response = await API.get('/clubs');
            return response.data;
        } catch (e) {
            return rejectedWithValue(e.response.data.message);
        }
    }
)

// Create new club
export const createClub = createAsyncThunk(
    'club/createClub',
    async(data, { rejectedWithValue }) => {
        try {
            const response = await API.post('/clubs', data);
            console.log(response.data);
            return response.data;
        } catch (e) {
            return rejectedWithValue(e.response.data.message);
        }
    }
)