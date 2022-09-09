import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/index.jsx';
import Calendar from './pages/Calendar/Calendar.jsx'
import Clubs from './pages/Clubs/index.jsx'
import Document from './pages/Documents/Documents.jsx'
import Events from './pages/Event/Events.jsx'
import Statistics from './pages/Statistics/index.jsx'
import Users from './pages/Users/Users.jsx'
import { NavBar } from './components';
import { getLastEvent, getNewEvent } from './api/main.js'

import Profile from './pages/Profile/Profile.jsx';
import Headers from './components/Headers/Headers.jsx'
import { MainNews, MoreNews } from './pages/News/index.js';
import Chat from './pages/Chat/index.jsx';
import { getClubsForStatistics, getClubsStatistics, getStatistics } from './api/statistics.js';
import NotRegisteredHome from './pages/NotRegisteredHome/index.jsx';
import styles from './app.module.css'

import EventDetail from './pages/EventDetail/EventDetail.jsx';
import ClubDetail from './pages/ClubDetail/ClubDetail.jsx';
import { ToastContainer } from 'react-toastify';
import { getDialogs } from './api/dialogs.js';
import { getNews } from './api/news.js';
import socket from './utils/socket.js';
import { io } from 'socket.io-client'
import { setLocationUrl } from './redux/reducers/chatSlice.js';
import { getEventCalendar } from './api/calendar.js';
import Sportsman from './pages/Sportsman/Sportsman.jsx';
import Modal from './hooks/useModal/Modal.jsx';


function App() {
  const dispatch = useDispatch()

  const { isLogged } = useSelector(state => state.profile.login);
  const { user } = useSelector(state => state.profile);
  const { dialogs } = useSelector(state=>state.dialogs);
  const { modal } = useSelector(state=>state.general);

  useEffect(() => {
    socket.emit('join-to-lobby', {
      lobby_list: dialogs.map((item)=>item.lobby_id)
    })
  }, [dialogs])

  useEffect(() => {
    dispatch(getNewEvent())
    dispatch(getLastEvent())
    dispatch(getNews())
    dispatch(getStatistics())
    dispatch(getDialogs())
    dispatch(getEventCalendar())
    dispatch(getClubsForStatistics())


  }, [dispatch])

  return (
    <div>
      {
        modal.type !== null &&
        <Modal store={modal} props={modal.props}/>
      }
      {isLogged
        ? <>
          <Headers socket={socket} />
          <NavBar />
          <Routes>
            <Route path='/*' element={<Home userStatus={user.status} />} />
            {
              user.status !== '0' &&
              <>
                <Route path='/clubs' element={<Clubs />} />
                <Route path='/clubs/:id/*' element={<ClubDetail />} />
                <Route path='/sportsman/:id' element={<Sportsman />} />
                <Route path='/document' element={<Document />} />
                <Route path='/events' element={<Events />} />
                <Route path='/events/:id/*' element={<EventDetail />} />
                <Route path='/news' element={<MainNews />} />
                <Route path='/statistics' element={<Statistics />} />
                {
                  user.role === 'admin' &&
                  <Route path='/users' element={<Users />} />
                }
                <Route path='/profile' element={<Profile />} />
                <Route path='/moreNews' element={<MoreNews />} />
                <Route path='/chat/*' element={<Chat />} />
              </>
            }
            {
              isLogged &&
              <Route path='/calendar' element={<Calendar />} />
            }

          </Routes>
        </>
        : <NotRegisteredHome />}
      <ToastContainer />
    </div>
  );
}

export default App;