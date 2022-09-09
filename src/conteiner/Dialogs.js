import React from 'react'
import DialogItem from '../components/DialogItem/index.jsx';

const getLobbyPhoto = (item) => item.lobby_photo;
const getDialogOption = (item, me, option) => {
    const partner = item.users_id.find((item) => item.id !== me.id);
    return partner[option] === '' ? null : partner[option];
}


const Dialogs = ({ dialogsList, me, handleDialogClick }) => {
    const getPhoto = (item) => item.direct ? getDialogOption(item, me, 'photo') : getLobbyPhoto(item.lobby_info);
    const getName = (item) => item.direct ? getDialogOption(item, me, 'name').split('/').join(' ') : item.lobby_info.lobby_name

    return ( 
        <div > 
            {dialogsList.map(item => (
            <DialogItem 
                key = { item.lobby_id }
                photo = {getPhoto(item)}
                last_message = { item.last_message.text }
                name = {getName(item)}
                id = { item.lobby_id }
                dialogClick = { handleDialogClick }/>))}
        </div>
    )
}

export default Dialogs