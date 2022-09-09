import { approveProtocol, formProtocolByEvent, getProtocolByEvent, rejectProtocol, updateProtocolByEvent } from "../../api/protocol";

// Reject protocol 
export const rejectProtocolExtra = {
        [rejectProtocol.pending]: (state, action) => {
            state.protocolStatus = "Rejecting protocol";
            state.error = null;
        },
        [rejectProtocol.fulfilled]: (state) => {
            state.protocolStatus = "Protocol rejected";
            state.error = null;
        }
    }
    // Approve protocol 
export const approveProtocolExtra = {
    [approveProtocol.pending]: (state, action) => {
        state.protocolStatus = "Approving protocol";
        state.error = null;
    },
    [approveProtocol.fulfilled]: (state) => {
        state.protocolStatus = "Protocol approved";
        state.error = null;
    }
}

// Update protocol by event
export const updateProtocolByEventExtra = {
    [updateProtocolByEvent.pending]: (state) => {
        state.protocolStatus = 'Updating protocol';
        state.error = null;
    },
    [updateProtocolByEvent.fulfilled]: (state) => {
        state.protocolStatus = "Active";
        state.error = null;
    },
    [updateProtocolByEvent.rejected]: (state, action) => {
        state.protocolStatus = "Rejected update protocol";
        state.error = action.payload;
    }
}

// Form protocol by event
export const formProtocolByEventExtra = {
    [formProtocolByEvent.pending]: (state) => {
        state.protocolStatus = 'Forming protocol';
        state.error = null;
    },
    [formProtocolByEvent.fulfilled]: (state) => {
        state.protocolStatus = 'Active';
        state.error = null;
    },
    [formProtocolByEvent.rejected]: (state, action) => {
        state.protocolStatus = 'Rejected form protocol';
        state.error = action.payload;
    }
}

// Get protocols by event
export const getProtocolByEventExtra = {
    [getProtocolByEvent.pending]: (state) => {
        state.protocolStatus = 'Loading protocols';
        state.error = null;
    },
    [getProtocolByEvent.fulfilled]: (state, action) => {
        state.protocolStatus = "Active";
        state.error = null;
        const data = JSON.parse(JSON.stringify(action.payload.data));
        data.sort((a, b) => {
            if (a.name < b.name) return -1;
            else if (a.name > b.name) return 1;
            return 0;
        })
        state.protocolList = data;
        state.finished = action.payload.finished;
    },
    [getProtocolByEvent.rejected]: (state, action) => {
        state.protocolStatus = 'Rejected loading protocols';
        state.error = action.payload;
    }
}