import { createSlice, current } from '@reduxjs/toolkit'
import { getCurrentDialogExtra, getDialogsExtra } from '../extraReducers/dialogExtraReducer';

export const dialogsSlice = createSlice({
    name: 'dialogs',
    initialState: {
        items: [],
        status: 'Active',
        errors: null,
        dialogs: [],
        currentDialog: null,
        chatList: []
    },
    reducers: {
        setCurrentDialog: (state, action) => {
            state.currentDialog = { id: action.payload }
        },
        addMessage: (state, action) => {
            if (+action.payload.lobby === state.currentDialog.lobby.id) {
                const list = state.currentDialog.response.slice(state.currentDialog.response.length - 10, state.currentDialog.response.length - 1);
                let flag = false;
                for (let i of list) {
                    if (i.id === +action.payload.id) {
                        flag = true;
                        break;
                    }
                }
                if (!flag) state.currentDialog.response = [...state.currentDialog.response, action.payload];
            }
            const dialog = state.dialogs.find((item) => item.lobby_id === +action.payload.lobby) ? {...state.dialogs.find((item) => item.lobby_id === +action.payload.lobby) } : null
            const dialogIndex = state.dialogs.findIndex((item) => item.lobby_id === +action.payload.lobby);
            if (dialog) {
                dialog['chat'] = dialog['chat'] ? [...dialog['chat'], action.payload] : [action.payload];
                dialog.last_message = action.payload;
                state.dialogs[dialogIndex] = dialog;
            }
        }
    },
    extraReducers: {
        ...getDialogsExtra,
        ...getCurrentDialogExtra,
    }
})

export const {
    setCurrentDialog,
    addMessage
} = dialogsSlice.actions;

export default dialogsSlice.reducer