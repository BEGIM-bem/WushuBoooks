import React from "react";


import styles from './index.module.css'
import IconReaded from "../IconReaded/index.jsx";
import format from "date-fns/format";
import isToday from "date-fns/isToday";
import Avator from "../Avator/index.jsx";

import { tr } from "date-fns/locale";
import { useDispatch, useSelector } from "react-redux";

//DialogItem


const getMessageTime = created_at => {
    if (isToday(created_at)) {
        return format(created_at, "HH:mm")
    } else {
        return format(created_at, "DD.MM.YYYY")
    }
}

function DialogItem({ 
    photo,
    name,
    id,
    message, 
    unreaded ,
    isMe = false,
    isOnline=false,
    last_message='',
    dialogClick,
}) {
    
    const getName = (name) => {
        const str = name.split('');
        str[str.findIndex((i) => i === '/')] = ' ';
        return str.join('');
    }


    return (
        <div className={styles.dialog__item} onClick={()=>dialogClick(id)}>
            <div className={styles.dialog__item_avator}>
                {
                    <Avator user={photo} />
                }
                <div className={isOnline ? styles.dialog__item__online : ''}>
                </div>
            </div>
            <div className={styles.dialog__item_info}>
                <div className={styles.dialog__item_info_top}>
                    <b className={styles.dialog__item_info_name} >{name}</b>
                    <div>
                        {isMe ? '' : <IconReaded isMe={false} isReaded={true} />}
                    </div>
                    <span className={!isMe ? styles.dialog__item_date : styles.dialog__item_dateMe} >
                        {/* <Time date={message.lastMessage.created_at} /> */}
                        {/* {
                            getMessageTime(message?.lastMessage.created_at)
                        } */}
                    </span>
                </div>
                <div className={styles.dialog__item_info_bottom}>
                    <p className={styles.dialog__item__text}>{last_message} </p>

                    {unreaded > 0 && <div className={styles.dialog__item_info_cout}>{unreaded > 9 ? '99+' : unreaded}  </div>}
                </div>

            </div>


        </div >

    )
}

export default DialogItem