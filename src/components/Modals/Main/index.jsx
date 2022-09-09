import React, { useEffect } from 'react';
import styles from './index.module.css';
import { Time } from '../../../images/inedex.js'
import { useDispatch, useSelector } from 'react-redux';
import { setProfile } from '../../../api/login.api';





function Main() {
    const dispatch = useDispatch();
    const { id } = useSelector(state=>state.profile.user);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => document.body.style.overflow = 'auto'
    }, [])
    useEffect(()=>{
        dispatch(setProfile(id));
    }, [dispatch]);
    return (

        <div className={styles.active}
            onClick={(e) => e.stopPropagation()}>
            <div className={styles.modal__content}>

                <div className={styles.content} >
                    <img src={Time} alt='' />
                    <h1 className={styles.content__title} >Доступ к сайту ограничен</h1>
                    <p className={styles.content__text}>Пожалуйста, ожидайте подтверждение вашего аккаунта администратором.</p>
                </div>

            </div>

        </div>
    )
}

export default Main;


