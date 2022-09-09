import React from 'react';
import styles from './index.module.css';
import Dialogs from '../../conteiner/Dialogs.js'
import DialogsHeader from './components/DialogsHeader/DialogsHeader';
import DialogLayout from './components/DialogLayout/DialogLayout';
import { Route, Routes } from 'react-router';


const ChatLayout = ({
    isOpen,
    closeChat,
    search,
    setSearch,
    dialogsList,
    me,
    handleDialogClick,
    people=null,
    loadDialog,
    sendMessage,
    setTyping,
    onCreateDirect
}) => {

    return (
        <div className={styles.chat}>
            <div className={styles.chat__sidebar}>
                <DialogsHeader 
                    search={search} 
                    setSearch={setSearch}
                    onCreateDirect={onCreateDirect}/>

                <div className={styles.chat__sidebar_dialogs} >
                    <Dialogs
                        me={me}
                        handleDialogClick={handleDialogClick}
                        dialogsList={dialogsList}/>
                </div>
            </div>

            <Routes>
                <Route 
                    path="/:id" 
                    element={<DialogLayout
                        setTyping={setTyping}
                        sendMessage={sendMessage}
                        loadDialog={loadDialog}
                        people={people}
                        me={me}/>}/>
                <Route 
                    path="/" 
                    element={
                        <div className={styles.chat__Notdialog} >
                            <img alt='' className={styles.chat__Notdialog_img} src={'https://img.freepik.com/free-vector/flat-woman-at-home-office-with-laptop-conducting-video-meeting-team-building-with-colleagues-girl-chatting-and-talking-with-friends-online-vector-illustration-for-videoconference-or-remote-work_88138-551.jpg'} />
                            <p className={styles.chat__Notdialog_text}>Выберите диалог</p>
                        </div>
                    } />
            </Routes>
        </div >
    )
}

export default ChatLayout
