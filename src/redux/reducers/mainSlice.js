import { createSlice } from '@reduxjs/toolkit'
import { getLastEvent, getNewEvent } from '../../api/main'
import moment from 'moment';

export const toolkitSlice = createSlice({
    name: 'main',
    initialState: {
        lastEvents: [],
        newsEvents: [],
        status: {
            getLastEventStatus: null,
            getNewsEventStatus: null
        },

        error: {
            getLastEventError: null,
            getNewsEventError: null
        }
    },

    extraReducers: {
        [getNewEvent.pending]: (state) => {
            state.status.getNewsEventStatus = 'loading';
            state.error.getNewsEventError = null
        },

        [getNewEvent.fulfilled]: (state, action) => {
            state.status.getNewsEventStatus = 'resolved';
            state.newsEvents = action.payload
        },
        [getNewEvent.rejected]: (state, action) => {
            state.status.getNewsEventStatus = 'rejected';
            state.error.getNewsEventError = action.payload
        },

        [getLastEvent.pending]: (state) => {
            state.status.getLastEventStatus = 'loading';
            state.error.getLastEventError = null
        },
        [getLastEvent.fulfilled]: (state, action) => {
            state.status.getLastEventStatus = 'resolved';
            state.lastEvents = action.payload



        },
        [getLastEvent.rejected]: (state, action) => {
            state.status.getLastEventStatus = 'rejected';
            state.error.getLastEventError = action.payload
        },

    }


})


export default toolkitSlice.reducer
