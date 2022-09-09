import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '../../../../components';
import { CloseIcon } from '../../../../images/inedex';
import { deleteUsers, setDeleteId } from '../../../../redux/features/counter/usersSlice';
import styles from './confirm.module.css';

const Confirm = () => {
    // Constants
    const dispatch = useDispatch();

    // Functions
    const handleCloseWindow = () => dispatch(setDeleteId(null));
    const handleDeleteButton = () => console.log("Delete");

    useEffect(()=>{
        document.body.style.overflow = "hidden";
        return ()=>document.body.style.overflow="auto";
    }, [])

    return (
        <div className={styles.modal_holder}>
            <div className={styles.modal_window}>
                <img
                    className={styles.close_icon}
                    onClick={handleCloseWindow}
                    src={CloseIcon}
                    alt="close window"/>
                <p className={styles.modal_title}>
                    Вы действительно хотите удалить пользователя?
                </p>
                <div className={styles.buttons_holder}>
                    <Button
                        onClick={handleCloseWindow}
                        type="button"
                        projectType="confirm_secondary">Назад</Button>
                    <Button
                        onClick={handleDeleteButton}
                        type="button"
                        autofocuse="true"
                        projectType="confirm_primary">Удалить</Button>
                </div>
            </div>
        </div>
    )
}

export default Confirm