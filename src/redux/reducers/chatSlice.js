import { createSlice } from '@reduxjs/toolkit'
import { getCurrentDialogId, getDialogs } from '../../api/chat';




const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        allUsers: [],

        currentDialog: null,
        status: {
            allUsersStatus: null,

        },
        error: {
            allusersError: null
        }
    },

    extraReducers: {
        [getDialogs.pending]: (state, action) => {
            state.status.allUsersStatus = 'Gettining user';
            state.error.allusersError = null
        },

        [getDialogs.fulfilled]: (state, action) => {
            state.status.allUsersStatus = 'Geted user';
            state.allUsers = action.payload
        },

        [getDialogs.rejected]: (state, action) => {
            state.status.allUsersStatus = 'Rejected geting user';
            state.error.allusersError = action.payload
        },


        [getCurrentDialogId.pending]: (state, action) => {
            state.status.allUsersStatus = 'Gettining user';
            state.error.allusersError = null
        },

        [getCurrentDialogId.fulfilled]: (state, action) => {
            state.status.allUsersStatus = 'Geted user';
            state.allUsers = action.payload
        },

        [getCurrentDialogId.rejected]: (state, action) => {
            state.status.allUsersStatus = 'Rejected geting user';
            state.error.allusersError = action.payload
        }

    }
})


export default chatSlice.reducer