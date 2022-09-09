import React from 'react'
import styles from './index.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { Oval } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'
import { getNewsId } from '../../../api/news.js'
import { quetionsIcon } from '../../../images/inedex.js'

function OtherNews() {
    const dispatch = useDispatch()
    const navigations = useNavigate()
    const { status, error, news } = useSelector(state => state.news)

    const readMore = (item) => {
        dispatch(getNewsId({ id: item.id, navigations }))
        window.scrollTo(0, 0);
    }



    return (
        <div className={styles.conteinerNews}>
            {
                status.newsStatus === 'loading' && <div className={styles.spinner} >
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

            {error && <div className={styles.spinner} >{error}</div>}

            {
                news.slice(0, 3).map(item =>
                    <article key={item.id} className={styles.conteinerNews__block} onClick={() => readMore(item)} >

                        <div className={styles.conteinerNews__block_for_img} >
                            <img src={item.image ? item.image : quetionsIcon} alt='' className={styles.conteinerNews__images} />
                        </div>



                        <div className={styles.conteinerNews__allNews} >
                            <h1 className={styles.conteinerNews__title}>{item.title}</h1>
                            <p className={styles.conteinerNews__text}>{item.text}</p>


                        </div>
                        <time className={styles.conteinerNews__date} >{item.date}</time>
                    </article>
                )
            }
        </div>
    )
}


export default OtherNews;