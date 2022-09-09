import { configureStore } from '@reduxjs/toolkit'
import applicationSlice from './features/counter/applicationSlice';
import clubsSlice from './features/counter/clubsSlice';
import documentSlice from './features/counter/documentSlice';
import eventSlice from './features/counter/eventSlice';
import generalSlice from './features/counter/generalSlice';
import profileSlice from './features/counter/profileSlice'
import protocolSlice from './features/counter/protocolSlice';
import sportsmanSlice from './features/counter/sportsmanSlice';
import usersSlice from './features/counter/usersSlice';
import calendarSlice from './reducers/calendarSlice';
import chatSlice from './reducers/chatSlice';
import dialodsSlice from './reducers/dialogsSlice';
import mainSlice from './reducers/mainSlice'
import newsSlice from './reducers/newsSlice';
import statisticsSlice from './reducers/statisticsSlice';


export default configureStore({
    reducer: {
        profile: profileSlice,
        main: mainSlice,
        users: usersSlice,
        events: eventSlice,
        statistics: statisticsSlice,
        documents: documentSlice,
        clubs: clubsSlice,
        sportsman: sportsmanSlice,
        dialogs: dialodsSlice,
        calendar: calendarSlice,
        news: newsSlice,
        chat: chatSlice,
        general: generalSlice,
        applications: applicationSlice,
        protocols: protocolSlice
    },
})