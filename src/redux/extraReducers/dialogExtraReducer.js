import { current } from "immer";
import { getDialogs, getCurrentDialog } from "../../api/dialogs";

// Get current dialog 
export const getCurrentDialogExtra = {
    [getCurrentDialog.pending]: (state) => {
        state.status = 'Loading current dialog';
        state.error = null;
    },
    [getCurrentDialog.fulfilled]: (state, action) => {
        state.currentDialog = action.payload;
        state.status = 'Active';
        state.error = null;
    },
    [getCurrentDialog.rejected]: (state, action) => {
        state.status = 'Rejected load current dialog';
        state.error = action.payload;
    }
}

// Get all dialogs
export const getDialogsExtra = {
    [getDialogs.pending]: (state) => {
        state.status = 'Loading dialogs';
        state.error = null;
    },
    [getDialogs.fulfilled]: (state, action) => {
        // const data = JSON.parse(JSON.stringify(action.payload));
        // console.log(data);
        // data.forEach((item) => item['chat'] = [item.last_message]);
        state.status = 'Active';
        state.error = null;
        state.dialogs = action.payload;
    },
    [getDialogs.rejected]: (state, action) => {
        state.status = 'Rejected get dialogs';
        state.error = action.payload;
    }
}