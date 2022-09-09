import React, { useEffect } from 'react';
import styles from './style.module.css';

const CreateLobbyModal = (props) => {
    console.log(props);
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    useEffect(()=>{
        document.body.style.overflow="hidden";
        return () => document.body.style.overflow="auto";
    })

    return (
        <div className={styles.modal_holder}>
            <form 
                onSubmit={handleSubmit}
                className={styles.modal_window}>
            </form>
        </div>
    )
}

export default CreateLobbyModal
