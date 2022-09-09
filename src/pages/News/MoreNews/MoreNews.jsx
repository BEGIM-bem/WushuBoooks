import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { OtherNews } from '../index.js'
import styles from './index.module.css'
import { Oval } from 'react-loader-spinner'
import Footer from '../../../components/Footer/index.jsx'
import { useLocation } from 'react-router-dom'
import { quetionsIcon } from '../../../images/inedex.js'

function MoreNews() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    const { newsId, status } = useSelector(state => state.news)

    return (
        <div>
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

            <div className={styles.content} key={newsId.id} >
                {/* <div className={styles.conteiner__images}> */}
                <img src={newsId.image ? newsId.image : quetionsIcon} alt='' className={styles.content__image} />
                {/* </div> */}

                <div className={styles.content__info} >
                    <h1 className={styles.content__info_title}>{newsId.title}</h1>
                    <time className={styles.content__info_time}>{newsId.date}</time>


                    <p className={styles.content__info_text} >{newsId.text}</p>


                </div>

            </div>


            <div className={styles.newsOther}>
                <h1 className={styles.news_title}>Другие новости </h1>
                <OtherNews />
            </div>
            <Footer />
        </div >
    )
}


export default MoreNews