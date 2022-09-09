import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../utils/axiosConfig";

export const approveUser = createAsyncThunk(
    'users/approveUser',
    async({ id, data }, { rejectWithValue }) => {
        try {
            const response = await API.patch(`/users/${id}`, data);
            return {...response.data, status: response.status };
        } catch (e) {
            return rejectWithValue(e.respones.data.message);
        }
    }
)

export const setNewUser = createAsyncThunk(
    'users/setNewUser',
    async(data, { rejectWithValue }) => {
        try {
            data['link'] = process.env.REACT_APP_HOST + '/login/create-password';
            const response = await API.post('/users/referral', data);
            console.log(response.data);
            return response.data;
        } catch (e) {
            return rejectWithValue(e.respones.data.message);
        }
    }
)

export const setUsersList = createAsyncThunk(
    'users/setUsersList',
    async function({ role, status = '' }, { rejectWithValue }) {
        try {
            let response = await API.get(`/users/get-role-status?role=${role}&status=${status}`);
            return {
                data: response.data,
                role: role === '' ? (status === '' ? 'users' : 'pending') : role
            };
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
);

export const deleteUser = createAsyncThunk(
    'users/deletUsers',
    async(id, { rejectWithValue }) => {
        try {
            const response = await API.delete(`/users/${id}`);
            console.log(response.data);
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
);