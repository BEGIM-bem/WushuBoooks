import React from "react";
import styles from './index.module.css'
import { notNotificatons } from '../../images/inedex.js'

function Notificatons({ notificatons }) {


    return (
        <div className={styles.notificatons__conteiner} >

            <div> </div>

            <div className={styles.notifications}>


                <h1 className={styles.notificatons__title}>Уведомления</h1>
                {
                    notificatons.length === 0 && <img src={notNotificatons} alt=''
                        className={styles.notifications_notFind} />
                }
                <ul className={styles.notifications__ul} >
                    {
                        notificatons.map(item => (
                            <div key={item.id} className={styles.notifications__ul_i}  >
                                <div className={styles.notifications__ul_text}>
                                    <h1 className={styles.notifications__ul_tochka} > </h1>
                                    <p className={styles.notifications__ul_li} >{item.text}</p>
                                </div>
                                <p className={styles.notifications__ul_li1}>{item.date} </p>
                            </div>
                        )
                        )
                    }
                </ul >



            </div>


        </div>
    )
}


export default Notificatons