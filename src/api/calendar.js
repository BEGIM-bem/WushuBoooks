import { createAsyncThunk } from '@reduxjs/toolkit'
import API from '../utils/axiosConfig';
import { handleAlertDelete, handleAlertEdit, handleAlertPost } from './informingAlert';




export const getEventCalendar = createAsyncThunk(
    'calendar/getEventCalendar',
    async (_, { rejectWithValue }) => {
        try {

            const response = await API.get('/calendar');
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
)



export const createNewEventCalendar = createAsyncThunk(
    'calendar/createNewEventCalendar',
    async (data, { rejectWithValue, dispatch }) => {
        console.log("postApi")
        try {
            const response = await API.post('/calendar', data);

            return response.data

        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
)

export const editEventCalendar = createAsyncThunk(
    'calendar/editEventCalendar',
    async (data, { rejectWithValue, dispatch }) => {
        try {
            console.log("data: ", data)
            const response = await API.patch(`/calendar/${data.id}`, data);

            dispatch(getEventCalendar())

        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
)

export const deleteEventCalendar = createAsyncThunk(
    'calendar/deleteEventCalendar',
    async (id, { rejectWithValue, dispatch }) => {
        try {

            const response = await API.delete(`/calendar/${id}`);

            dispatch(getEventCalendar())


        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
)