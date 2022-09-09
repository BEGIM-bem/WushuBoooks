import { useEffect, useRef, useState } from "react";
import styles from './index.module.css';
import { Wave, Play, Pausa } from '../../images/inedex.js'
import { Check, NoReact } from '../../images/inedex.js'
import convertCurrentTime from '../../helpers/convertCurrentTime.js'


const MessageAudio = ({ audio }) => {
    const audioElem = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    const togglePlay = () => {
        if (!isPlaying) {
            audioElem.current.play();
        } else {
            audioElem.current.pause();
        }
    };

    useEffect(() => {
        audioElem.current.volume = '0.01';
        audioElem.current.addEventListener(
            'playing',
            () => {
                setIsPlaying(true);
            },
            false,
        );
        audioElem.current.addEventListener(
            'ended',
            () => {
                setIsPlaying(false);
                setProgress(0);
                setCurrentTime(0);
            },
            false,
        );
        audioElem.current.addEventListener(
            'pause',
            () => {
                setIsPlaying(false);
            },
            false,
        );
        audioElem.current.addEventListener('timeupdate', () => {
            const duration = (audioElem.current && audioElem.current.duration) || 0;
            setCurrentTime(audioElem.current.currentTime);
            setProgress((audioElem.current.currentTime / duration) * 100);
        });
    }, []);

    return (

        <div className={styles.message__audio}>
            <audio className={styles.message__audio_s} src={audio} ref={audioElem} preload='auto' />
            <div className={styles.message__audio_progress}
                style={{ width: progress + '%' }}  >
                <div className={styles.message__audio_info}>
                    <div className={styles.message__audio_btn}>
                        <button className={styles.message__audio_button} onClick={togglePlay} >
                            {
                                isPlaying ?
                                    <img src={Pausa} alt='Pausa Svg' />
                                    :
                                    <img src={Play} alt='Play Svg' className={styles.message__audio_buttonPlay} />
                            }
                        </button>
                    </div>
                    <div className={styles.message__audio_wave}>
                        <img src={Wave} alt='' className={styles.message__audio_wave1} />
                    </div>
                    <span className={styles.message__audio_duration}>
                        {
                            convertCurrentTime(currentTime)
                        }
                    </span>
                </div>
            </div>
        </div>

    )
}

export default MessageAudio;