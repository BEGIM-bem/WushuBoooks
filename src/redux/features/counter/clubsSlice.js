import { createSlice } from '@reduxjs/toolkit'
import { documents_mock } from '../../../api/mock';
import { addSportsmanExtra, createClubExtra, getAllClubsExtra, getClubByIdExtra, getSportsmanByIdExtra } from '../../extraReducers/clubExtraReducer';


export const counterSlice = createSlice({
    name: 'clubs',
    initialState: {
        status: 'Active',
        error: null,
        data: [],
        currentClub: null,
        selectedSportsmen: [],
        currentSportsman: null,
    },
    extraReducers: {
        ...createClubExtra,
        ...getAllClubsExtra,
        ...getClubByIdExtra,
        ...getSportsmanByIdExtra,
        ...addSportsmanExtra,
    },
    reducers: {
        deleteClub: (state, action) => {
            state.data = state.data.filter(item => item.id !== action.payload);
        },
        selectItem: (state, action) => {
            state.selectedSportsmen = [action.payload, ...state.selectedSportsmen];
        },
        unSelectItem: (state, action) => {
            state.selectedSportsmen = state.selectedSportsmen.filter((i) => i !== action.payload);
        },
        selectAll: (state, action) => {
            state.selectedSportsmen = action.payload.map((i) => i.id);
        },
        unSelectAll: (state) => {
            state.selectedSportsmen = [];
        }
    },
})


export const {
    deleteDocument,
    selectItem,
    unSelectItem,
    selectAll,
    unSelectAll
} = counterSlice.actions;

export default counterSlice.reducer;