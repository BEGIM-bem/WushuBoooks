import { createSlice } from '@reduxjs/toolkit'
import { deleteUser } from '../../../api/users.api';
import { approveUserExtra, deleteUserExtra, setNewUserExtra, setUsersListExtra } from '../../extraReducers/usersExtraReducer';


export const counterSlice = createSlice({
    name: 'users',
    initialState: {
        pending: {
            status: "Active",
            error: null,
            data: null,
        },
        user: {
            status: "Active",
            error: null,
            deleteId: null
        },
        users: {
            data: null,
            status: 'Active',
            error: null
        },
        trainer: {
            data: null,
            status: 'Active',
            error: null
        },
        secretary: {
            data: null,
            status: 'Active',
            error: null
        },
        judge: {
            data: null,
            status: 'Active',
            error: null
        },
        selected: [],
    },
    extraReducers: {
        ...setUsersListExtra,
        ...deleteUserExtra,
        ...setNewUserExtra,
        ...approveUserExtra,
    },
    reducers: {
        setUnselectItem: (state, action) => {
            state.selected = state.selected.filter((i) => i !== action.payload)
        },
        setSelectItem: (state, action) => {
            state.selected = [...state.selected, action.payload]
        },
        setUnselectAll: (state) => {
            state.selected = []
        },
        setSelectAll: (state, action) => {
            state.selected = action.payload
        },
        setDeleteId: (state, action) => {
            // Set confirm modal true
            state.user.deleteId = action.payload;
        },
        deleteUsers: (state, action) => {
            // Check for selected users and delete picked or selected items;
            if (state.selected.length > 0) {} else {
                deleteUser(action.payload);
            }
        }
    },
})

export const {
    setSelectAll,
    setSelectItem,
    setUnselectAll,
    setUnselectItem,
    setCurrent,
    deleteUsers,
    setDeleteId,
} = counterSlice.actions;

export default counterSlice.reducer;