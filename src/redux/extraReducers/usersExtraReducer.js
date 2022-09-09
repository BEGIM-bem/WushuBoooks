import { approveUser, deleteUser, setNewUser, setUsersList } from "../../api/users.api";

export const approveUserExtra = {
    [approveUser.pending]: (state) => {
        state.user.status = 'Approving user';
        state.user.error = null;
    },
    [approveUser.fulfilled]: (state) => {
        state.user.status = "User approved";
        state.user.error = null;
    },
    [approveUser.rejected]: (state, action) => {
        state.user.status = 'User not approved';
        state.user.error = action.payload;
    }
}

export const setNewUserExtra = {
    [setNewUser.pending]: (state) => {
        state.user.status = 'Setting new user';
        state.user.error = null;
    },
    [setNewUser.fulfilled]: (state) => {
        state.user.status = 'Set new user';
        state.user.error = null;
    },
    [setNewUser.rejected]: (state, action) => {
        state.user.status = 'Rejected set new user';
        state.user.error = action.payload;
    }
}

export const deleteUserExtra = {
    [deleteUser.pending]: (state) => {
        state.user.status = 'Deleting user';
        state.user.error = null;
    },
    [deleteUser.fulfilled]: (state) => {
        state.user.status = 'User deleted';
        state.user.error = null;
    },
    [deleteUser.rejected]: (state, action) => {
        state.user.status = "Rejected deleting";
        state.user.error = action.payload;
    }
}

export const setUsersListExtra = {
    [setUsersList.pending]: (state) => {
        state.status = "Loading users list";
        state.error = null;
    },
    [setUsersList.fulfilled]: (state, action) => {
        state.status = "Active";
        state.error = null;
        let data = [];
        if (action.payload.role !== 'pending') data = action.payload.data.filter((item) => item.status === 2);
        else data = action.payload.data;
        state[action.payload.role] = {...state[action.payload.role], data };
    },
    [setUsersList.rejected]: (state, action) => {
        state.status = "Rejected loading users list";
        state.error = action.payload.data;
    }
}