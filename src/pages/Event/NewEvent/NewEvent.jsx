import React from 'react';
import { useEffect } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { Button, Input } from '../../../components';
import { CloseIcon } from '../../../images/inedex';
import style from './newEvent.module.css';

const NewEvent = ({
    status,
    error,
    closeWindow, 
    handleSubmit,
    name,
    setName,
    city,
    setCity,
    address,
    setAddress,
    date,
    time,
    setTime,
    setDate,
    eventDeadline,
    setEventDeadline,
    applicationDeadline,
    setApplicationDeadline
}) => {
    useEffect(()=>{
        document.body.style.overflow = 'hidden';
        return () => document.body.style.overflow = 'auto';
    }, [])
    return (
        <div className={style.form_holder} onClick={closeWindow}>
            <form 
                className={style.form_window}
                onClick={(e)=>e.stopPropagation()}>
                <div className={style.form_header}>
                    <h2 className={style.form_title}>Создание заявки</h2>
                    <img 
                        onClick={closeWindow}
                        className={style.close_icon}
                        src={CloseIcon} 
                        alt="close"/>
                </div>
                <div className={style.form_content}>
                    <div className={style.input_holder}>
                        <label htmlFor="name">Название мероприятия</label>
                        <Input
                            value={name}
                            onChange={setName}
                            name="name"/>
                    </div>
                    <div className={style.input_holder}>
                        <label htmlFor="city">Город</label>
                        <Input
                            value={city}
                            onChange={setCity}
                            name="city"/>
                    </div>
                    <div className={style.input_holder}>
                        <label htmlFor="city">Адрес</label>
                        <Input
                            value={address}
                            onChange={setAddress}
                            name="city"/>
                    </div>
                    <div className={style.input_holder}>
                        <label htmlFor="date">Дата проведения</label>
                        <Input
                            type="date"
                            value={date}
                            onChange={setDate}
                            name="date"/>
                    </div>
                    <div className={style.input_holder}>
                        <label htmlFor="time">Время начала</label>
                        <Input
                            value={time}
                            onChange={setTime}
                            name="time"/>
                    </div>
                    <div className={style.input_holder}>
                        <label htmlFor="end-date">Дата окончания мероприятия</label>
                        <Input
                            type="date"
                            value={eventDeadline}
                            onChange={setEventDeadline}
                            name="end-date"/>
                    </div>
                    <div className={style.input_holder}>
                        <label htmlFor="end-date">Дата окончания принятия заявок</label>
                        <Input
                            type="date"
                            value={applicationDeadline}
                            onChange={setApplicationDeadline}
                            name="end-date"/>
                    </div>
                    {error &&
                    <p className={style.error_message}>{error}</p>}
                </div>
                <div className={style.form_button}>
                    <Button
                        onClick={handleSubmit}
                        projectType='add_user'
                        type='button'>
                            {status === 'Creating event'
                            ? <TailSpin 
                            height={24}
                            color='white'/>
                            : 'Сохранить'}
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default NewEvent