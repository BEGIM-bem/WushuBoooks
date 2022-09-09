import { createSlice } from '@reduxjs/toolkit'
import { documents_mock } from '../../../api/mock';
import { getDocumentsExtra, uploadDocumentExtra } from '../../extraReducers/documentExtraReducer';


export const counterSlice = createSlice({
    name: 'document',
    initialState: {
        status: 'Active',
        error: null,
        data: [],
        uploadData: []
    },
    extraReducers: {
        ...uploadDocumentExtra,
        ...getDocumentsExtra,
    },
    reducers: {
        deleteDocument: (state, action) => {
            state.data = state.data.filter(item => item.id !== action.payload);
        },
        updateProgressBar: (state, action) => {
            const index = state.uploadData.findIndex((i) => i.id === action.payload.id);
            console.log(action.payload);
            if (index !== -1) {
                state.uploadData[index].percent = action.payload.percent;
            }
        },
        uploadFileHanlde: (state, action) => {
            state.uploadData = [action.payload, ...state.uploadData];
        },
        setStatus: (state, action) => {
            state.status = action.payload;
        }
    },
})


export const {
    deleteDocument,
    updateProgressBar,
    uploadFileHanlde,
    setStatus,
} = counterSlice.actions;

export default counterSlice.reducer