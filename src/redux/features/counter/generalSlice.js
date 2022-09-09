import { createSlice } from '@reduxjs/toolkit'
import { documents_mock } from '../../../api/mock';
import { createClubExtra, getAllClubsExtra, getClubByIdExtra, getSportsmanByIdExtra } from '../../extraReducers/clubExtraReducer';


export const counterSlice = createSlice({
    name: 'general',
    initialState: {
        modal: {
            type: null,
            props: null,
        }
    },
    reducers: {
        setModal: (state, action) => {
            state.modal.type = action.payload.type;
            console.log(action.payload);
            state.modal.props = action.payload.props;
        },
    },
})


export const {
    setModal
} = counterSlice.actions;

export default counterSlice.reducer;