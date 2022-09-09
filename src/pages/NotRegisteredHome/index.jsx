import React, { useEffect } from 'react'
import styles from './index.module.css'
import { Logo, telephonIconNotRegister, email } from '../../images/inedex.js'
import Footer from '../../components/Footer/index.jsx'
import { useSelector, useDispatch } from 'react-redux';
import { getLastEvent, getNewEvent } from '../../api/main.js';
import { Oval, Circles } from 'react-loader-spinner'
import { NavLink } from "react-router-dom";


function NotRegisteredHome() {
    const dispatch = useDispatch()

    const { status, error, newsEvents, lastEvents } = useSelector(state => state.main)


    useEffect(() => {
        dispatch(getNewEvent())
        dispatch(getLastEvent())

    }, [dispatch])





    return (
        <div className={styles.conteiner}>

            <div className={styles.header}>

                <div className={styles.headers}>
                    <img src={Logo} alt='' className={styles.headers__logo} />
                    <h1 className={styles.headers__title}> Федерация традиционного
                        ушу Кыргызской Республики </h1>
                </div>

                <div className={styles.headers__contact}>

                    <div className={styles.headers__adress}>
                        <img src={telephonIconNotRegister} alt='' className={styles.headers__adress_icon} />
                        <p className={styles.headers__contact_texst} >(+996 312) 66 29 14</p>
                    </div>

                    <div className={styles.headers__email}>
                        <img src={email} alt='' className={styles.headers__adress_icon} />
                        <p className={styles.headers__contact_texst}> wuseitek@mail.ru</p>
                    </div>


                    <NavLink style={{ textDecoration: 'none' }} to='/login'>
                        <button className={styles.headers__contact_btn}>Войти </button>
                    </NavLink>

                </div>


            </div>


            <h1 className={styles.conteiner__title} ><span className={styles.conteiner__line} >
                Мероприятия федерации
            </span></h1>

            <p className={styles.conteiner__tema}>Предстоящие мероприятия:</p>
            {
                status === 'loading' && <div className={styles.spinner} >
                    <Oval
                        ariaLabel="loading-indicator"
                        height={100}
                        width={100}
                        strokeWidth={5}
                        strokeWidthSecondary={3}
                        color="lightblue"
                        secondaryColor="white"
                    />
                </div>
            }

            <div className={styles.content}>
                {
                    newsEvents.slice(newsEvents.length - 3)?.map(item =>

                        <div key={item.id} className={styles.content_block}>
                            <h1 className={styles.content__date}> {item.day} <span className={styles.content__data2}>{item.month}</span></h1>
                            <h1 className={styles.content__title}>{item.title}</h1>
                            <p className={styles.content__time}>{item.time}</p>
                            <p className={styles.content__address}>{item.city}, {item.address} </p>


                        </div>
                    )
                }

            </div>


            <p className={styles.conteiner__tema2}> Предыдущие мероприятия:</p>
            {
                status === 'loading' && <div className={styles.spinner} >
                    <Oval
                        ariaLabel="loading-indicator"
                        height={100}
                        width={100}
                        strokeWidth={5}
                        strokeWidthSecondary={3}

                        color="lightblue"
                        secondaryColor="white"

                    />
                </div>
            }
            <div className={styles.content}>
                {
                    lastEvents.slice(0, 3)?.map((item) =>

                        <div key={item.id} className={styles.content_block}>
                            <h1 className={styles.content__date}> {item.day} <span className={styles.content__data2}>{item.month}</span></h1>
                            <h1 className={styles.content__title}>{item.title}</h1>
                            <p className={styles.content__time}>{item.time}</p>
                            {/* <p className={styles.content__address}>{item.address}</p> */}
                            <p className={styles.content__address}>{item.city}, {item.address} </p>
                        </div>
                    )}

            </div>


            <Footer />


        </div >
    )
}


export default NotRegisteredHome