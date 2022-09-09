import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../utils/axiosConfig";

// Delete document
export const deleteDocument = createAsyncThunk(
    'documents/upload',
    async(id, { rejectedWithValue, dispatch }) => {
        try {
            const response = await API.delete('/docs/' + id).then(() => dispatch(getAllDocuments()));
            return response;
        } catch (e) {
            return rejectedWithValue(e.response.data.message);
        }
    }
)

// Upload document
export const uploadDocument = createAsyncThunk(
    'documents/upload',
    async({ localId, data, callback }, { rejectedWithValue, dispatch }) => {
        try {
            const response = await API.post('/docs', data, {
                onUploadProgress: callback
            }).then(() => dispatch(getAllDocuments()))
            return { localId, response: response.data };
        } catch (e) {
            return rejectedWithValue(e.response.data.message);
        }
    }
)

// Get all documents
export const getAllDocuments = createAsyncThunk(
    'documents/get',
    async(_, { rejectedWithValue }) => {
        try {
            const response = await API.get('/docs');
            return response.data;
        } catch (e) {
            return rejectedWithValue(e.response.data.message);
        }
    }
)