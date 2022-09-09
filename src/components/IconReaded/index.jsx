import React, { Fragment } from "react";
import { Check, NoReact } from '../../images/inedex.js'
import { formatDistance } from 'date-fns';
import ruLocale from "date-fns/locale/ru";
import styles from './index.modulde.css'

const IconReaded = ({ isMe, isReaded }) =>
    isMe && isReaded ? (<img className={styles.message__elements_icon} src={Check} alt='Readed Icon' />) :
        (<img src={NoReact} className={styles.message__elements_icon} alt='NoReaded Icon' />)






export default IconReaded;