import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../utils/axiosConfig";

// Reject protocol
export const rejectProtocol = createAsyncThunk(
    'protocol/reject',
    async({ id, data, comment }, { rejectWithValue, dispatch }) => {
        try {
            const response = await new Promise((res, rej) => {
                setTimeout(() => {
                    if (localStorage.getItem('accepted-protocols')) {
                        let arr = JSON.parse(localStorage.getItem('accepted-protocols'));
                        arr = [...arr, { eventId: id, data: null }]
                        localStorage.setItem('accepted-protocols', JSON.stringify(arr));
                    } else {
                        localStorage.setItem('accepted-protocols', JSON.stringify([{ eventId: id, data, comment }]))
                    }
                    res({ data: 'Success!' })
                }, 1500);
            })
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
)

// Accept protocol
export const approveProtocol = createAsyncThunk(
    'protocol/approveProtocol',
    async({ id, data }, { rejectWithValue, dispatch }) => {
        try {
            const response = await new Promise((res, rej) => {
                setTimeout(() => {
                    if (localStorage.getItem('accepted-protocols')) {
                        let arr = JSON.parse(localStorage.getItem('accepted-protocols'));
                        arr = [...arr, { eventId: id, data }]
                        localStorage.setItem('accepted-protocols', JSON.stringify(arr));
                    } else {
                        localStorage.setItem('accepted-protocols', JSON.stringify([{ eventId: id, data }]))
                    }
                    res({ data: 'Success!' })
                }, 1500);
            })
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
)


// Update protocol by event
export const updateProtocolByEvent = createAsyncThunk(
    'protocol/updateProtocolByEvent',
    async({ id, data }, { rejectWithValue, dispatch }) => {
        try {
            const response = await API.patch('/subgroups/' + id, data);
            return {...response.data, status: response.status };
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
)

// Form protocol by event
export const formProtocolByEvent = createAsyncThunk(
    'protocol/formProtocolByEvent',
    async(id, { rejectWithValue, dispatch }) => {
        try {
            const response = await API.get('/subgroups/' + id).then(() => dispatch(getProtocolByEvent(id)));
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
);

// Get protocols by event
export const getProtocolByEvent = createAsyncThunk(
    'protocol/getProtocolByEvent',
    async(id, { rejectWithValue }) => {
        try {
            const response = await API.get('/subgroups/get-by-event/' + id);
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
);