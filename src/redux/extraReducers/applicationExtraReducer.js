import { createApplication, getApplications } from "../../api/applications";

// Create application
export const createApplicationExtra = {
    [createApplication.pending]: (state) => {
        state.status = "Creating application";
        state.error = null;
    },
    [createApplication.fulfilled]: (state) => {
        state.status = "Application created";
        state.error = null;
    },
    [createApplication.rejected]: (state, action) => {
        state.status = "Rejected create application";
        state.error = action.payload;
    }
}

// Get applications by event
export const getApplicationsExtra = {
    [getApplications.pending]: (state) => {
        state.status = "Loading applications";
        state.error = null;
    },
    [getApplications.fulfilled]: (state, action) => {
        state.status = "Active";
        state.error = null;
        const data = [];
        action.payload.forEach((item) => {
            const index = data.findIndex(q => q.trainerId === item.trainerId);
            if (index !== -1) data[index]['sportsmans'] = [item, ...data[index]['sportsmans']];
            else data.push({ trainerId: item.trainerId, trainer: item.trainer, club: item.club, sportsmans: [item] });
        })
        state.data = data;
    },
    [getApplications.rejected]: (state, action) => {
        state.status = "Rejected get applications";
        state.error = action.payload;
    }
}