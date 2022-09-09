import { createAsyncThunk } from '@reduxjs/toolkit'
import API from '../utils/axiosConfig';





export const getNews = createAsyncThunk(
    'news/getNews',
    async function (_, { rejectWithValue }) {
        try {
            const response = await API.get('news')
            return response.data
        }
        catch (error) {
            return rejectWithValue(error.message)
        }

    })


export const createNew = createAsyncThunk(
    'news/createNew',
    async function (data, { rejectWithValue, dispatch }) {
        try {
            for (let [i, value] of data) {
                console.log("PP; ", value.name)
            }
            const response = await API.post('news', data)
            return response.data
        }
        catch (error) {

            return rejectWithValue(error.message)
        }

    })

export const getNewsId = createAsyncThunk(
    'news/getNewsId',

    async function ({ id, navigations }, { rejectWithValue }) {
        try {
            const response = await API.get(`news/get-by-id/${id}`)

            navigations('/moreNews')
            return response.data

        }
        catch (error) {
            return rejectWithValue(error.message)
        }

    })

export const deleteNew = createAsyncThunk(
    'news/deleteNew',
    async function (id, { rejectWithValue, dispatch }) {
        try {
            console.log("idNews: ", id)
            const response = await API.delete(`news/${id}`)

            dispatch(getNews())
            // return response.data


        }
        catch (error) {
            return rejectWithValue(error.message)
        }

    })


export const editNew = createAsyncThunk(
    'news/editNew',
    async function ({ id, data }, { rejectWithValue, dispatch }) {

        try {
            let userData = {};

            const response = await API.patch(`news/${id}`,
                data
            )

            dispatch(getNews())
        }
        catch (error) {
            return rejectWithValue(error.message)
        }

    })