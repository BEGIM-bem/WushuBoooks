import { DocumentLite } from '@skbkontur/react-icons';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { Button, Input } from '../../../components';
import { CloseIcon } from '../../../images/inedex';
import styles from './style.module.css';

const NewSportsman = ({closeModal, addSportsman, status}) => {
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [sex, setSex] = useState('');
    const [age, setAge] = useState('');
    const [stateRef, setStateRef] = useState('');
    const [rank, setRank] = useState('')
    const [dzi, setDzi] = useState('');
    const [duan, setDuan] = useState('');

    const handleSubmitForm = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('name', name+'/'+lastname);
        data.append('gender', sex);
        data.append('age', +age);
        data.append('rank', rank);
        data.append('reference', stateRef);
        addSportsman(data);
    }

    useEffect(()=>{
        document.body.style.overflow = 'hidden';
        return () => document.body.style.overflow = 'auto';
    }, [])

    return (
        <div 
            onClick={closeModal}
            className={styles.modal_holder}>
                <form  
                    onSubmit={handleSubmitForm}
                    className={styles.modal_window}>
                        <div 
                            className={styles.event_catcher}
                            onClick={(e)=>e.stopPropagation()}>
                            <div className={styles.header}>
                                <h2 className={styles.header_title}>Добавление спортсмена</h2>
                                <button 
                                    type="button"
                                    onClick={closeModal}
                                    className={styles.close_icon}>
                                        <img src={CloseIcon} alt="close" />
                                </button>
                            </div>
                            <div className={styles.content}>
                                <div className={styles.input_holder}>
                                        <label htmlFor="Имя">Имя</label>
                                        <Input type="text" name="Имя" value={name} onChange={(e)=>setName(e.target.value)}/>
                                </div>
                                <div className={styles.input_holder}>
                                        <label htmlFor="Фамилия">Фамилия</label>
                                        <Input type="text" name="Фамилия" value={lastname} onChange={(e)=>setLastname(e.target.value)}/>
                                </div>
                                <div className={styles.input_holder}>
                                    <label htmlFor="Пол">Пол</label>
                                    <div className={styles.sex_list_holder}>
                                        <div className={styles.sex_holder}>
                                            <div className={styles.radio_input_holder}>
                                                <Input
                                                    type="radio"
                                                    projectType='radio'
                                                    value="female"
                                                    name="sex"
                                                    checked={sex === 'female' ? true : false}
                                                    onChange={(e)=>setSex(e.target.value)}
                                                    id="sex-female"/>
                                            </div>
                                            <label htmlFor="sex-female">Женский</label>
                                        </div>
                                        <div className={styles.sex_holder}>
                                            <div className={styles.radio_input_holder}>
                                                <Input
                                                    type="radio"
                                                    projectType='radio'
                                                    value="male"
                                                    name="sex"
                                                    checked={sex === 'male' ? true : false}
                                                    onChange={(e)=>setSex(e.target.value)}
                                                    id="sex-male"/>
                                            </div>
                                            <label htmlFor="sex-male">Мужской</label>
                                        </div>
                                    </div>
                                        
                                </div>
                                <div className={styles.input_holder}>
                                        <label htmlFor="Возраст">Возраст</label>
                                        <Input type="text" name="Возраст" value={age} onChange={(e)=>setAge(e.target.value)}/>
                                </div>
                                <div className={styles.input_holder}>
                                        <label htmlFor="Спортивный разряд">Спортивный разряд</label>
                                        <Input type="text" name="Спортивный разряд" value={rank} onChange={(e)=>setRank(e.target.value)}/>
                                </div>
                                <div className={styles.input_holder}>
                                        <label htmlFor="Справка" className={styles.reference}>
                                            Справка о физическом состоянии
                                            <div className={styles.file_input}>
                                                {
                                                    stateRef !== '' && 
                                                    <p className={styles.file_title}>Файл прикреплен</p>
                                                }
                                                <Input 
                                                    type="file" 
                                                    id="Справка" 
                                                    name="Справка" 
                                                    onChange={(e)=>setStateRef(e.target.files[0])}/>
                                                <DocumentLite size={35}/>
                                            </div>
                                        </label>

                                </div>
                                <div className={styles.input_holder}>
                                        <label htmlFor="Дзи">Дзи</label>
                                        <Input type="text" name="Дзи" value={dzi} onChange={(e)=>setDzi(e.target.value)}/>
                                </div>
                                <div className={styles.input_holder}>
                                        <label htmlFor="Дуань">Дуань</label>
                                        <Input type="text" name="Дуань" value={duan} onChange={(e)=>setDuan(e.target.value)}/>
                                </div>
                            </div>
                            <div className={styles.footer}>
                                <Button
                                    type="button"
                                    projectType='confirm_secondary'
                                    onClick={closeModal}>Назад</Button>
                                <Button
                                    projectType='confirm_primary'
                                    type="submit">
                                        {
                                            status === 'Adding sportsman to the club'
                                            ?
                                            <TailSpin height={24} color="#fff"/>
                                            :
                                            "Добавить"
                                        }
                                </Button>
                            </div>
                        </div>
                </form>
        </div>
    )
}

export default NewSportsman