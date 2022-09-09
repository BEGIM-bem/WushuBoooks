import { setUpdateUser, setForgotPassword, setLogin, setSignup, checkToken, setNewPassword, setConfirmStatus, setUpdatePassword, setProfile } from "../../api/login.api";

export const setProfileExtra = {
    [setProfile.pending]: (state) => {
        state.status = "Loading profile";
        state.error = null;
    },
    [setProfile.fulfilled]: (state, action) => {
        state.user = action.payload;
        localStorage.setItem('jwt-user', JSON.stringify(action.payload));
    },
    [setProfile.rejected]: (state, action) => {
        state.status = 'Reject get profile';
        state.error = action.payload;
    }
}

export const setConfirmStatusExtra = {
    [setConfirmStatus.pending]: (state) => {
        state.status = 'Setting confirm status';
        state.error = null;
    },
    [setConfirmStatus.fulfilled]: (state) => {
        state.status = 'Confirmed status';
        state.error = null;
    },
    [setConfirmStatus.rejected]: (state, action) => {
        state.status = 'Rejected confirm status';
        state.error = action.payload;
    }
}

export const setNewPasswordExtra = {
    [setNewPassword.pending]: (state) => {
        state.status = 'Setting new password';
        state.error = null;
    },
    [setNewPassword.fulfilled]: (state) => {
        state.status = 'Set new password';
        state.error = null;
    },
    [setNewPassword.rejected]: (state, action) => {
        state.status = 'Rejected set new password';
        state.error = action.payload;
    }
}

export const checkTokenExtra = {
    [checkToken.pending]: (state) => {
        state.status = 'Checking tmp';
        state.error = null;
    },
    [checkToken.fulfilled]: (state) => {
        state.status = 'Active';
        state.error = null;
        state.checkTmp = true;
    },
    [checkToken.rejected]: (state, action) => {
        state.status = 'Rejected check tmp';
        state.error = action;
        state.checkTmp = false;
    }
}

export const setUpdatePasswordExtra = {
    [setUpdatePassword.pending]: (state) => {
        state.status = 'Updating password';
        state.error = null;
    },
    [setUpdatePassword.fulfilled]: (state) => {
        state.status = 'Active';
        state.error = null;
    },
    [setUpdatePassword.rejected]: (state, action) => {
        state.status = 'Rejected update password';
        state.error = action.payload;
    }
}

export const setUpdateUserExtra = {
    [setUpdateUser.pending]: (state) => {
        state.status = 'Updating profile';
        state.error = null;
    },
    [setUpdateUser.fulfilled]: (state, action) => {
        state.status = 'Active';
        state.error = null;
        state.user = action.payload;
        console.log(action.payload);
    },
    [setUpdateUser.rejected]: (state, action) => {
        state.status = 'Rejected update profile';
        state.error = action.payload;
    }
}

export const setLoginExtra = {
    [setLogin.pending]: (state) => {
        state.status = 'Loading';
        state.error = null;
    },
    [setLogin.fulfilled]: (state, action) => {
        state.status = 'Active';
        state.error = null;
        state.login.isLogged = true;
        const { role, ...data } = action.payload.role;
        state.login.role = role;
        state['user'] = action.payload;
    },
    [setLogin.rejected]: (state, action) => {
        state.status = 'Rejected login';
        state.error = action.payload;
        state['error'] = action.payload;
    }
}

export const signupExtraReducers = {
    [setSignup.pending]: (state) => {
        state.status = 'Sending signup link';
        state.error = null;
    },
    [setSignup.fulfilled]: (state, action) => {
        state.status = "Signup link sent";
        state.error = null;
    },
    [setSignup.rejected]: (state, action) => {
        state.status = "Rejected";
        state.error = action.payload;
    }
}

export const forgotPasswordExtraReducers = {
    [setForgotPassword.pending]: (state, action) => {
        state.status = "Sending forgot link";
        state.error = null;
    },
    [setForgotPassword.fulfilled]: (state, action) => {
        state.status = "Forgot password link sent";
        state.error = null;
    },
    [setForgotPassword.rejected]: (state, action) => {
        state.status = "Rejected";
        state.error = action.payload;
    }
}