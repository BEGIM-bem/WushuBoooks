import { createSlice } from '@reduxjs/toolkit'
import { protocol_list } from '../../../const/protocol_mock';
import { createNewEventExtra, deleteEventExtra, getEventByIdExtra, setEventListExtra } from '../../extraReducers/eventExtraReducer';


export const counterSlice = createSlice({
    name: 'event',
    initialState: {
        status: "Active",
        error: null,
        pastEvents: null,
        newEvents: null,
        subList: [
            { id: 0, title: 'Международный чемпионат по ушу среди детей', trainers: [{ id: 0, name: 'Иванов Иван Иванович' }] },
            { id: 1, title: 'Международный чемпионат по ушу среди детей', trainers: [{ id: 0, name: 'Иванов Иван Иванович' }] },
            { id: 2, title: 'Международный чемпионат по ушу среди детей', trainers: [{ id: 0, name: 'Иванов Иван Иванович' }] },
            { id: 3, title: 'Международный чемпионат по ушу среди детей', trainers: [{ id: 0, name: 'Иванов Иван Иванович' }] },
            { id: 4, title: 'Международный чемпионат по ушу среди детей', trainers: [{ id: 0, name: 'Иванов Иван Иванович' }] },
        ],
        protocols: protocol_list,
        selected: []
    },
    extraReducers: {
        ...setEventListExtra,
        ...createNewEventExtra,
        ...deleteEventExtra,
        ...getEventByIdExtra,
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
        setStatus: (state, action) => {
            state.status = action.payload
        }
    },
})


export const {
    setUnselectItem,
    setSelectItem,
    setUnselectAll,
    setSelectAll,
    setStatus,
} = counterSlice.actions;

export default counterSlice.reducer;