import React from 'react'
import styles from './index.module.css'

const Status = ({ online }) => (

    <div>
        {
            online ?
                <div className={styles.status}>
                    <p className={styles.status__icon}></p>
                    <p className={styles.status_Online} > Online</p>

                </div> : ''
        }
    </div>

    // <span className={online ? styles.status_online : ''}>
    //     {online ? "онлайн" : ''}
    // </span>
)


export default Status;