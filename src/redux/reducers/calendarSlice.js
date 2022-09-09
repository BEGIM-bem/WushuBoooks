import { createSlice } from '@reduxjs/toolkit'
import { createNewEventCalendar, deleteEventCalendar, editEventCalendar, getEventCalendar } from '../../api/calendar';



const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        allEventForCalendar: [],


        status: {

            createEventStatus: null,
            getEventStatus: null,
            editEventStatus: null,
            deleteEventStatus: null

        },
        error: {

            createEventError: null,
            getEventError: null,
            editEventError: null,
            deleteEventError: null
        }
    },

    extraReducers: {
        //get
        [getEventCalendar.pending]: (state, action) => {
            state.status.getEventStatus = 'Gettining event';
            state.error.createEventError = null
        },

        [getEventCalendar.fulfilled]: (state, action) => {
            state.status.getEventStatus = 'Geted event';
            state.allEventForCalendar = action.payload
        },

        [getEventCalendar.rejected]: (state, action) => {
            state.status.getEventStatus = 'Rejected geted event';
            state.error.getEventError = action.payload
        },


        //post

        [createNewEventCalendar.pending]: (state, action) => {
            state.status.createEventStatus = 'Creating event';
            state.error.createEventError = null
        },

        [createNewEventCalendar.fulfilled]: (state, action) => {
            state.status.createEventStatus = 'Creted event';
            // state.news = [action.payload, ...state.news]
            state.allEventForCalendar = [action.payload, ...state.allEventForCalendar]
        },

        [createNewEventCalendar.rejected]: (state, action) => {
            state.status.createEventStatus = 'Rejected event to create';
            state.error.createEventError = action.payload
        },


        //edit

        [editEventCalendar.pending]: (state, action) => {
            state.status.editEventStatus = 'Editing event';
            state.error.createEventError = null
        },

        [editEventCalendar.fulfilled]: (state, action) => {

            state.status.editEventStatus = 'Edited event';
            // state.news = [action.payload, ...state.news]
            state.allEventForCalendar = [...state.allEventForCalendar]
            state.error.createEventError = null
        },

        [editEventCalendar.rejected]: (state, action) => {
            state.status.editEventStatus = 'Rejected edit event';
            state.error.editEventError = action.payload
        },


        //delete

        [deleteEventCalendar.pending]: (state, action) => {
            state.status.deleteEventStatus = 'Deleting event';
            state.error.deleteEventError = null
        },

        [deleteEventCalendar.fulfilled]: (state, action) => {

            state.status.deleteEventStatus = 'Delted event';
            state.allEventForCalendar = [...state.allEventForCalendar]
            state.error.deleteEventError = null
        },

        [deleteEventCalendar.rejected]: (state, action) => {
            state.status.deleteEventStatus = 'Rejected delete event';
            state.error.deleteEventError = action.payload
        },

    },
    reducers: {
        setNullStatus: (state, action) => {
            state.status.createEventStatus = null
            state.status.editEventStatus = null
            state.status.deleteEventStatus = null
        }

    }


})

export const {
    setNullStatus
} = calendarSlice.actions

export default calendarSlice.reducer