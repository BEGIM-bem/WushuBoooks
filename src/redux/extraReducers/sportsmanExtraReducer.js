import { getSportsmanAchievements, getSportsmanStandards } from "../../api/sportsman";

// get sportsman standards
export const getSportsmanStandardsExtra = {
    [getSportsmanStandards.pending]: (state) => {
        state.status = 'Loading sportsman standards';
        state.error = null;
    },
    [getSportsmanStandards.fulfilled]: (state, action) => {
        state.status = 'Set sportsman standards';
        state.error = null;
        state.standards = action.payload;
    },
    [getSportsmanStandards.rejected]: (state, action) => {
        state.status = "Rejected load sportsman standards";
        state.error = action.payload;
    }
}

// Get sportsman achievements
export const getSportsmanAchievementsExtra = {
    [getSportsmanAchievements.pending]: (state) => {
        state.status = "Loading achievements";
        state.error = null;
    },
    [getSportsmanAchievements.fulfilled]: (state, action) => {
        state.status = "Got sportsman achievements";
        state.error = null;
        state.achievements = action.payload;
    },
    [getSportsmanAchievements.rejected]: (state, action) => {
        state.status = "Rejected load achievements";
        state.error = action.payload;
    }
}