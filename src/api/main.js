import { createAsyncThunk } from '@reduxjs/toolkit'
import API from '../utils/axiosConfig';



export const getNewEvent = createAsyncThunk(
    'main/getNewEvent',
    async function (_, { rejectWithValue }) {
        try {
            const response = await API.get(`events/by-date?start=${new Date()}`)


            return response.data

        } catch (error) {
            return rejectWithValue(error.message)
        }

    })

export const getLastEvent = createAsyncThunk(
    'main/getLastEvent',
    async function (_, { rejectWithValue }) {
        try {
            const response = await API.get(`events/by-date?end=${new Date()}`)
            return response.data

        } catch (error) {
            return rejectWithValue(error.message)
        }

    })

