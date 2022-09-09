import { createSlice } from '@reduxjs/toolkit';
import { approveProtocolExtra, formProtocolByEventExtra, getProtocolByEventExtra, updateProtocolByEventExtra } from '../../extraReducers/protocolExtraReducer';


export const counterSlice = createSlice({
    name: 'protocol',
    initialState: {
        protocolList: [],
        protocolStatus: 'Active',
        error: null,
    },
    extraReducers: {
        ...getProtocolByEventExtra,
        ...formProtocolByEventExtra,
        ...updateProtocolByEventExtra,
        ...approveProtocolExtra,
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