import React, { useEffect } from "react";
import styles from './index.module.css'
import { deleteIconD } from '../../../images/inedex.js'
import Button from '../../Button';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEventCalendar } from "../../../api/calendar";
import { TailSpin } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import { setNullStatus } from "../../../redux/reducers/calendarSlice";
import { deleteNew } from "../../../api/news";

function ConfirmDelete({ modal, setModal, id }) {
    console.log("Id: ", id)
    const { status } = useSelector(state => state.news)

    console.log("     status.deleteNew: ", status.deleteNew)
    const dispatch = useDispatch()
    useEffect(() => {
        if (modal) {
            document.body.style.overflow = 'hidden';
            return () => document.body.style.overflow = 'auto';
        }
    }, [modal])

    const handleClose = () => {
        setModal({ modal: false })
    }
    const handleDelete = () => {
        dispatch(deleteNew(id))
        handleClose()
    }



    return (
        <div className={modal ? styles.active : styles.modal}>
            <div className={styles.modal__content} onClick={(e) => e.stopPropagation()}>

                <div className={styles.cross} onClick={handleClose} >
                    <img src={deleteIconD} alt='' />
                </div>

                <div>
                    <h1 className={styles.title}>Вы уверены, что хотите удалить?</h1>

                </div>

                <div className={styles.btn}>
                    <button className={styles.btn2} onClick={handleClose}> Назад</button>

                    <div className={styles.modal__content_btn}>
                        <Button
                            style={{ borderRadius: '0px', borderBottomRightRadius: '7px' }}
                            projectType='add_user'
                            onClick={handleDelete}
                        >
                            {
                                status.deleteNew === 'Deleting new' ?
                                    <TailSpin
                                        height={24}
                                        color='white' />
                                    :
                                    'Удалить'
                            }
                        </Button>

                    </div>
                </div>
            </div>
        </div >
    )
}

export default ConfirmDelete