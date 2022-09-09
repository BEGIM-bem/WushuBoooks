import React, { useEffect, useRef, useState } from "react";
import styles from './index.module.css'
import { Skrepka, mikrafon, flyIcon } from '../../images/inedex.js'
import socket from "../../utils/socket";

const getImage = (file) => {
    if (file) {
        return URL.createObjectURL(file)
    }
    return null;
}

function ChatInput({sendMessage, id, setTyping}) {
    const [value, setValue] = useState('')
    const [file, setFile] = useState('');

    const inputFile = useRef(null);

    const valueMessage = (e) => {
        setValue(e.target.value)
    }

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (value === '' && file === '') return;
        const data = {
            lobby: id,
            edited: true,
            text: value,
            attachment: '',
            file: file
        }
        sendMessage(data);
        setValue('');
        setFile('');
    }

    useEffect(() => {
        value !== '' && setTyping(true, id);
        let timer = setTimeout(() => {
          if (value !== '') setTyping(false, id);
        }, 1000);
        return () => clearTimeout(timer);
      }, [value]);

    return (
        <form 
            onSubmit={handleSendMessage}
            className={styles.chat__input} >

            <div className={styles.chat__input_simbvol}>
                {
                    file &&
                    <div className={styles.chat_ref_image}>
                        <img
                            src={getImage(file)} />
                        <p onClick={()=>setFile('')}>X</p>
                    </div>
                }
                <img 
                    onClick={()=>inputFile.current?.click()}
                    className={styles.chat__input_simbvol_icon} 
                    src={Skrepka} 
                    alt='' />
                <input 
                    ref={inputFile} 
                    type="file" 
                    style={{display: 'none'}}
                    onChange={(e)=>setFile(e.target.files[0])}
                    accept="image/apng, image/avif, image/gif, image/jpeg, image/png, image/svg+xml, image/webp, audio/*"/>

                {/* <p className={styles.chat__input_simbvol_icon} style={{ visibility: 'hidden' }} >&#128521;</p> */}

            </div>

            <input 
                value={value}
                className={styles.chat__input_text} 
                onChange={e => setValue(e.target.value)}
                type='text' 
                placeholder="Напишите сообщение..." />

            {
                value ? <img className={styles.chat__input_simbvol_icon1} src={flyIcon} alt='' />
                    :
                    <img className={styles.chat__input_simbvol_icon} src={mikrafon} alt='' />

            }

        </form>
    )
}


export default ChatInput