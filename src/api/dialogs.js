import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../utils/axiosConfig";

// Get messages in current dialog
export const getCurrentDialog = createAsyncThunk(
    "dialogs/getDialogMessages",
    async(id, { rejectWithValue }) => {
        try {
            const response = await API.get('/lobby/message-lobby/' + id);
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
)

// Get list of dialogs
export const getDialogs = createAsyncThunk(
    "dialogs/getDialogs",
    async function(_, { rejectWithValue }) {
        try {
            const response = await API.get("/lobby/get-my-groups");
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);