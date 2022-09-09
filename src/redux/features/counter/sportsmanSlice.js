import { createSlice } from '@reduxjs/toolkit'
import { getSportsmanAchievementsExtra, getSportsmanStandardsExtra } from '../../extraReducers/sportsmanExtraReducer';


export const counterSlice = createSlice({
    name: 'sportsman',
    initialState: {
        status: 'Active',
        error: null,
        achievements: [],
        standards: []
    },
    extraReducers: {
        ...getSportsmanAchievementsExtra,
        ...getSportsmanStandardsExtra,
    },
    reducers: {},
})


export const {} = counterSlice.actions;

export default counterSlice.reducer;