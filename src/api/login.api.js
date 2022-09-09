import { createAsyncThunk } from '@reduxjs/toolkit'
import API from '../utils/axiosConfig';
import jwtDecode from 'jwt-decode';

export const setProfile = createAsyncThunk(
    'profile/setStatus',
    async(id, { rejectWithValue }) => {
        try {
            const response = await API.get(`/users/get-by-id/${id}`);
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
)

export const setConfirmStatus = createAsyncThunk(
    'profile/setConfirmStatus',
    async(id, { rejectWithValue }) => {
        try {
            const response = await API.patch(`/users/update-registered-status/${id}`);
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
)

export const setNewPassword = createAsyncThunk(
    'profile/setNewPassword',
    async(data, { rejectWithValue }) => {
        try {
            const response = await API.patch('/users/addPassword', data);
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
)

export const checkToken = createAsyncThunk(
    'profile/checkToken',
    async(data, { rejectWithValue }) => {
        try {
            const response = await API.get(`/users/check-valid?id=${data.userId}&tmp=${data.token}`);
            return response.data;
        } catch (e) {
            return rejectWithValue(e.reseponse.data.message);
        }
    }
)

export const setUpdatePassword = createAsyncThunk(
    'profile/setUpdatePassword',
    async(data, { rejectWithValue }) => {
        try {
            const response = await API.patch(`/users/profile-change-password`, data);
            console.log(response.data);
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
)

export const setUpdateUser = createAsyncThunk(
    'profile/updateUser',
    async(data, { rejectWithValue }) => {
        try {
            const response = await API.patch(`/users/${data.id}`, data.data);
            const { tmp, status, password, experience, category, rank, appointment_date, ...rest } = response.data;
            return rest;
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
)

export const setLogin = createAsyncThunk(
    'profilt/setLogin',
    async function(data, { rejectWithValue }) {
        try {
            const response = await API.post('/auth/login', data);
            localStorage.setItem('jwt-token', response.data.token);
            localStorage.setItem('jwt-user', JSON.stringify(jwtDecode(response.data.token)));
            return jwtDecode(response.data.token);
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
);

export const setSignup = createAsyncThunk(
    'profile/setSignup',
    async function(data, { rejectWithValue }) {
        try {
            data['link'] = process.env.REACT_APP_HOST + '/login/confirm-account';
            const response = await API.post('/users/independent', data);
            if (response.status === 201) return response.data;
            throw new Error('Some thing went wrong!');
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
)

export const setForgotPassword = createAsyncThunk(
    'profile/setForgotPassword',
    async function(data, { rejectWithValue }) {
        try {
            data['link'] = process.env.REACT_APP_HOST + '/login/reset-password';
            const response = await API.patch(`/users/forgot-password`, data);
            if (response.status === 200) return response.data;
            throw new Error('Something went wrong!');
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
)