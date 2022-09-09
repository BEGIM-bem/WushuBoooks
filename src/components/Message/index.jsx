import React, { useEffect, useRef, useState } from 'react'
import styles from './index.module.css'

// import { ThreeDots } from '@bit/mhnpd.react-loader-spinner.three-dots';
import { ThreeDots } from 'react-loader-spinner'


import IconReaded from '../IconReaded/index'

import Avator from '../Avator/index'
import MessageAudio from './MessageAudio'






function Message({ 
    avator, 
    user, 
    text, 
    isMe, 
    isReaded, 
    isTyping,
    attachments, 
    audio ,
    filetype,
    time="09:00"
}) {
    let date = new Date()
    // const [isPlaying, setIsPlaying] = useState(false)
    // const audioElem = useRef(null)
    // const [progress, setProgress] = useState(0);
    // const [currentTime, setCurrentTime] = useState(0);

    // ${attachments.length === 1 ? styles.message__image : ''} 
    // ${attachments && attachments.length === 1 ? styles.message__image : ''} 



    return (

        <div>

            <div className={`${isMe ? styles.message_Me : styles.message}
            ${isTyping ? styles.message_isTyping : ''} 
            ${attachments && attachments.length === 1 ? styles.message__image : ''} 
            ${audio ? styles.message_isAudio : ''}
           `} >

                <div className={styles.message__avator}>

                    {
                        <Avator user={avator} />
                    }
                </div>


                <div className={styles.message__content}>


                    {(audio || text || isTyping) && (
                        <div className={isMe ? styles.message__bubble_Me : styles.message__bubble}>
                            {text && <p className={styles.message__text}>{text}</p>}

                            {
                                isTyping && (<div className={styles.spinner}>
                                    <ThreeDots
                                        color={'#808080'}
                                        className={styles.spinner}

                                        height={20}

                                    />

                                </div>

                                )}

                            {audio && <MessageAudio audio={audio} />}



                            {
                                (attachments && filetype === 'image') && (
                                    <div className={styles.message__attachments}>
                                            <div 
                                                className={styles.message__attachments_item}>
                                                <img src={attachments} alt="message"
                                                    className={styles.message__attachments_img} />
                                            </div>

                                    </div>

                                )}
                            <div className={styles.message__elements} >

                                <p className={styles.message__element_icon}>

                                    <IconReaded isMe={isMe} isReaded={isReaded} /> </p>
                                {/* {date && <p className={styles.message__date}><Time date={new Date()} /></p>} */}
                                <p className={styles.message__date}>{time}</p>
                            </div>

                        </div>
                    )}

                </div>

            </div>

        </div >



    )
}


export default Message