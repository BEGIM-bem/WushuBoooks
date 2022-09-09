import React, { useEffect, useState } from 'react';
import { Button, Input } from '../../../components';
import { AddIcon } from '../../../images/inedex';
import styles from './style.module.css';


const NewStandart = ({onSubmit, closeModal}) => {
    const objectRef = {type: '', grade: '', date: new Date()}
    const [form, setForm] = useState([objectRef]);
    useEffect(()=>{
        document.body.style.overflow = 'hidden';
        return () => document.body.style.overflow = 'auto';
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
    }

    const handleAddForm = (e) => {
        e.preventDefault();
        setForm(prev => [...prev, objectRef]);
    }

    const handleInputChange = (e, i) => {
        setForm(prev=>{
            const { name, value } = e.target;
            let arr = JSON.parse(JSON.stringify(prev));
            arr[i][name] = value;
            return arr;
        })
    }

    return (
        <div 
            onClick={closeModal}
            className={styles.modal_background}>
            <form 
                onClick={(e)=>e.stopPropagation()}
                onSubmit={handleSubmit}
                className={styles.modal_window}>
                    <h2>Добавление нормативов</h2>
                    {
                        form.map((item, i)=>(
                            <div key={i}>
                                <div className={styles.input_holder}>
                                    <label htmlFor="type">Наименование</label>
                                    <Input type="text" name="type" id="type" value={item.type} onChange={(e)=>handleInputChange(e, i)}/>
                                </div>
                                <div className={styles.input_holder}>
                                    <label htmlFor="grade">Оценка</label>
                                    <Input type="text" name="grade" id="grade" value={item.grade} onChange={(e)=>handleInputChange(e, i)}/>
                                </div>
                            </div>
                        ))
                    }
                    <button
                        className={styles.add_button}
                        onClick={handleAddForm}>
                            <img src={AddIcon} alt="add"/>
                            Добавить норматив
                    </button>
                    <div className={styles.buttons_holder}>
                            <Button 
                                type="button" 
                                projectType="confirm_secondary"
                                onClick={closeModal}>Назад</Button>
                            <Button 
                                type="submit" 
                                projectType="confirm_primary">Добавить</Button>
                    </div>
            </form>
        </div>
    )
}

export default NewStandart
