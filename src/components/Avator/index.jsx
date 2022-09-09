import React from "react";
import styles from './index.module.css'
import { UserNotIcon } from '../../images/inedex.js'


function Avator({ user }) {

    if (user) {
        return (
            <img src={user} alt='' className={styles.message__img} />
        )
    }
    return (
        <img src={UserNotIcon} alt={`Avator not find`} className={styles.message__img} />
    )

}


export default Avator