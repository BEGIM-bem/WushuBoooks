import React, { useEffect, useState } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { Button, Input } from '../../../components';
import { CloseIcon } from '../../../images/inedex';
import styles from './style.module.css';

const RejectModal = ({onSubmit, closeModal, status}) => {
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({data: null, comment: text});
    }

    useEffect(()=>{
        document.body.style.overflow = 'hidden';
        return () => document.body.style.overflow = 'auto';
    })

    return (
        <div
            onClick={closeModal}
            className={styles.modal_background}>
            <form  
                onClick={(e)=>e.stopPropagation()}
                onSubmit={handleSubmit}
                className={styles.modal_window}>
                <button
                    type="button"
                    onClick={closeModal}
                    className={styles.close_icon}>
                    <img src={CloseIcon} alt="close"/>
                </button>
                <h3>Укажите причину, по которой вы отклоняете протокол</h3>
                <div className={styles.input_holder}>
                    <label htmlFor="comment">Примечание</label>
                    <textarea id="comment" placeholder="Примечание..." value={text} onChange={(e)=>setText(e.target.value)}/>
                </div>
                <div className={styles.buttons_holder}>
                    <Button
                        projectType="confirm_secondary"
                        onClick={closeModal}>Назад</Button>
                    <Button
                        type="submit"
                        projectType="confirm_primary">
                            {
                                status === 'Rejecting protocol'
                                ? <TailSpin height={24} color="#fff"/>
                                : "Отправить"
                            }
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default RejectModal;