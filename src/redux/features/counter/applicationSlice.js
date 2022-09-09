import { createSlice } from '@reduxjs/toolkit'
import { documents_mock } from '../../../api/mock';
import { createApplicationExtra, getApplicationsExtra } from '../../extraReducers/applicationExtraReducer';
import { createClubExtra, getAllClubsExtra, getClubByIdExtra, getSportsmanByIdExtra } from '../../extraReducers/clubExtraReducer';


export const counterSlice = createSlice({
    name: 'application',
    initialState: {
        data: [],
        status: 'Active',
        error: null,
    },
    extraReducers: {
        ...getApplicationsExtra,
        ...createApplicationExtra,
    },
    reducers: {
        setStatus: (state, action) => {
            state.status = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    },
})


export const {
    setStatus,
    setError
} = counterSlice.actions;

export default counterSlice.reducer;