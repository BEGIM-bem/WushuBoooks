import { createSlice } from '@reduxjs/toolkit'
import { getAthleteStortsmentById, getClubs, getClubsForStatistics, getClubss, getClubsStatistics, getOfpStortsmentById, getStatistics } from '../../api/statistics';


export const setError = (state, action) => {
    state.status = 'rejected';
    state.error = action.payload
}

export const setLoading = (state) => {
    state.status = 'loading';
    state.error = null
}


export const statisticsSlice = createSlice({
    name: 'statistics',
    initialState: {
        statistics: [],
        clubs: [],
        ofpById: [],
        athleteById: [],

        status: {
            getClubsStatus: null,
            getDataStatus: null,
            getOfpByIdStatus: null,
            getAthleteByIdStatus: null
        },
        errors: {
            getClubsError: null,
            getDataError: null,
            getOfpByIdError: null,
            getAthleteByIdError: null
        }
    },

    extraReducers: {
        //get Club
        [getClubsForStatistics.pending]: (state, action) => {

            state.status.getClubsStatus = 'Getting clubs';
            state.errors.getClubsError = null
        },
        [getClubsForStatistics.fulfilled]: (state, action) => {
            state.status.getClubsStatus = 'Geted clubs';
            state.errors.getClubsError = null
            state.clubs = action.payload
        },
        [getClubsForStatistics.rejected]: (state, action) => {
            state.status.getClubsStatus = 'Rejected get clubs'
            state.errors.getClubsError = action.payload
        },




        [getStatistics.pending]: (state, action) => {
            state.status.getDataStatus = 'Getting data statistics';
            state.errors.getDataError = null
        },
        [getStatistics.fulfilled]: (state, action) => {
            state.status.getDataStatus = 'Geted data statistics';
            state.errors.getDataError = null
            state.statistics = action.payload
        },
        [getStatistics.rejected]: (state, action) => {
            state.status.getDataStatus = 'Rejected get data statistics'
            state.errors.getDataError = action.payload
            state.statistics = []
        },


        //Ofp one Sportsmen
        [getOfpStortsmentById.pending]: (state, action) => {
            state.status.getOfpByIdStatus = 'Getting ofp';
            state.errors.getOfpByIdError = null
        },
        [getOfpStortsmentById.fulfilled]: (state, action) => {
            state.status.getOfpByIdStatus = 'Geted ofp';
            state.errors.getOfpByIdError = null
            state.ofpById = action.payload.sort((a, b) => a.year - b.year)
        },
        [getOfpStortsmentById.rejected]: (state, action) => {
            state.ofpById = []
            state.status.getOfpByIdStatus = 'Rejected get ofp'
            state.errors.getOfpByIdError = action.payload
        },

        //Athlete achievements
        [getAthleteStortsmentById.pending]: (state, action) => {
            state.status.getAthleteByIdStatus = 'Getting athlete';
            state.errors.getAthleteByIdError = null
        },
        [getAthleteStortsmentById.fulfilled]: (state, action) => {
            state.status.getAthleteByIdStatus = 'Geted athlete';
            state.errors.getAthleteByIdError = null
            state.athleteById = action.payload.sort((a, b) => a.year - b.year)
        },
        [getAthleteStortsmentById.rejected]: (state, action) => {

            state.athleteById = []
            state.status.getAthleteByIdStatus = 'Rejected get athlete'
            state.errors.getAthleteByIdError = action.payload
        },


    }
})


export default statisticsSlice.reducer
