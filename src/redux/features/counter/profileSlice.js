import { createSlice } from '@reduxjs/toolkit'
import {
    signupExtraReducers,
    forgotPasswordExtraReducers,
    setLoginExtra,
    setUpdateUserExtra,
    checkTokenExtra,
    setNewPasswordExtra,
    setConfirmStatusExtra,
    setUpdatePasswordExtra,
    setProfileExtra
} from '../../extraReducers/loginExtraReducer';


export const counterSlice = createSlice({
    name: 'profile',
    initialState: {
        login: {
            isLogged: localStorage.getItem('jwt-token') ? true : false,
            role: 'unauthorized'
        },
        status: 'Active',
        error: null,
        errorType: null,
        checkTmp: null,
        user: localStorage.getItem('jwt-user') ? JSON.parse(localStorage.getItem('jwt-user')) : null
    },

    reducers: {
        setError: (state, action) => {
            state.error = action.payload.error;
            state.errorType = action.payload.type;
        },
        setLogOut: (state) => { state.login.isLogged = false }
    },

    extraReducers: {
        ...signupExtraReducers,
        ...forgotPasswordExtraReducers,
        ...setLoginExtra,
        ...setUpdateUserExtra,
        ...checkTokenExtra,
        ...setNewPasswordExtra,
        ...setConfirmStatusExtra,
        ...setUpdatePasswordExtra,
        ...setProfileExtra,
    }
})


// Action creators are generated for each case reducer function
export const {
    setError,
    setLogOut
} = counterSlice.actions

// export const incrementAsync = (amount) => (dispatch) => {
//     setTimeout(() => {
//       dispatch(incrementByAmount(amount))
//     }, 1000)
// }

export default counterSlice.reducer