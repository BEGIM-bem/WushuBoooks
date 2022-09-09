import { createAsyncThunk } from '@reduxjs/toolkit'
import API from '../utils/axiosConfig';

// Get event by id
export const getEventById = createAsyncThunk(
    'event/getEventById',
    async(id, { rejectWithValue }) => {
        try {
            const response = await API.get('/events/get-by-id/' + id);
            console.log(response.data);
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
)

// Delete event
export const deleteEvent = createAsyncThunk(
    'event/deleteEvent',
    async(id, { rejectWithValue }) => {
        try {
            const response = await API.delete('/events/' + id);
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
)

// Create event
export const createNewEvent = createAsyncThunk(
    'event/createNewEvent',
    async(data, { rejectWithValue }) => {
        try {
            const response = await API.post('/events', data);
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
)

// Set events list
export const setEventList = createAsyncThunk(
    'event/setEventList',
    async({ start, end }, { rejectWithValue }) => {
        try {
            const response = await API.get(`/events?start=${start}&end=${end==='' ? "2030-05-05" : end}`);
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response.data.messgae);
        }
    }
)