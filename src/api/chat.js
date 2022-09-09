import { createAsyncThunk } from '@reduxjs/toolkit'
import API from '../utils/axiosConfig';


export const getDialogs = createAsyncThunk(
    'chat/getDialogs',
    async function (_, { rejectWithValue }) {
        try {
            const response = await API.get('/users')
            return response.data.data
        }
        catch (error) {
            return rejectWithValue(error.response.data.message);
        }

    })




export const getCurrentDialogId = createAsyncThunk(
    'chat/getAllByDialogId',
    async function (id, { rejectWithValue }) {
        try {
            const response = await API.get(`/users${id}`)

        }
        catch (error) {
            return rejectWithValue(error.response.data.message);
        }

    })


