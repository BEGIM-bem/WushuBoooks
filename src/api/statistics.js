import { createAsyncThunk } from '@reduxjs/toolkit'
import { array, AthleteStortsments } from './mock/index'
import API from '../utils/axiosConfig';


export const getClubsForStatistics = createAsyncThunk(
    'statistics/getClubsForStatistics',
    async function (_, { rejectWithValue }) {
        try {
            const response = await API.get('clubs')
            return response.data

        } catch (error) {
            return rejectWithValue(error.message)
        }

    })



export const getStatistics = createAsyncThunk(
    'statistics/getStatistics',
    async function (id, { rejectWithValue }) {
        try {
            const response = await API.get(`club-rating/rating-by-club/${id}`)

            console.log("resonseS: ", response.data)
            return response.data
        } catch (error) {
            return rejectWithValue(error.message)
        }

    })


export const getOfpStortsmentById = createAsyncThunk(
    'statistics/getOfpStortsmentById',
    async function (id, { rejectWithValue }) {
        try {
            const response = await API.get(`ofp/get-by-sportsman/${id}`)
            return response.data

        } catch (error) {

            return rejectWithValue(error.message)
        }

    })

export const getGenerateOfp = createAsyncThunk(
    'statistics/getGenerateOfp',
    async function (id, { rejectWithValue, dispatch }) {
        try {
            const response = await API.get('ofp')

            if (response.status >= 200 && response.status <= 299) {
                dispatch(getOfpStortsmentById(id))
            }

        } catch (error) {

            return rejectWithValue(error.message)
        }

    })


export const getGenerateAthlete = createAsyncThunk(
    'statistics/getGenerateAthlete',
    async function (id, { rejectWithValue, dispatch }) {
        try {
            const response = await API.get('achievement-rating')
            if (response.status >= 200 && response.status <= 299) {
                dispatch(getAthleteStortsmentById(id))
            }

        } catch (error) {
            return rejectWithValue(error.message)
        }
    })


export const getAthleteStortsmentById = createAsyncThunk(
    'statistics/getAthleteStortsmentById',
    async function (id, { rejectWithValue }) {
        try {

            const response = await API.get(`achievement-rating/get-by-sportsman/${id}`)

            return response.data

        } catch (error) {

            return rejectWithValue(error.message)
        }

    })
