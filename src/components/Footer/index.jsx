import React from 'react'
import styles from './index.module.css'
import { LocationsIcon, EmailIcon, TelephonIcon, } from '../../images/inedex.js'

function Footer() {

    return (
        <div>
            <footer className={styles.footer} >

                <div className={styles.footer__address}>

                    <img src={LocationsIcon} alt='' className={styles.footer__locationsImages} />

                    <div className={styles.footer__allText} >
                        <h1 className={styles.footer__title}>Адрес Главного центра ФТУКР:</h1>
                        <p className={styles.footer__text} >ул. Абдумомунова, д. 197</p>
                        <p className={styles.footer__text} >Национальный Центр детей и юношества «Сейтек»</p>
                    </div>
                </div>

                <div>


                    <div className={styles.footer__contact} >

                        <div className={styles.footer__contact_phone}>
                            <img src={TelephonIcon} alt='' />


                            <div className={styles.footer__contact__number} >
                                <h1 className={styles.footer__contact_text} >Контактные телефоны:</h1>
                                <p className={styles.footer__phone}>(+996 312) 66 29 14</p>
                                <p className={styles.footer_phone}>(+996 554) 40 44 51</p>
                            </div>
                        </div>


                        <div className={styles.footer__contact_phone}>
                            <img src={EmailIcon} alt='' />


                            <div className={styles.footer__contact__number} >
                                <h1 className={styles.footer__contact_text} >E-mail:</h1>
                                <p className={styles.footer__phone}>wuseitek@mail.ru</p>

                            </div>

                        </div>

                    </div>

                </div>

            </footer>
        </div>
    )
}


export default Footer