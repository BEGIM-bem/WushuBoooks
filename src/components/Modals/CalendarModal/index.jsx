import React, { useEffect, useRef } from 'react'
import { TailSpin } from 'react-loader-spinner';
import Button from '../../Button';
import styles from './index.module.css'
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { icondeleteCalendar } from '../../../images/inedex.js'
import { createNewEventCalendar, deleteEventCalendar, editEventCalendar } from '../../../api/calendar';
import 'moment/locale/ru'
import { setNullStatus } from '../../../redux/reducers/calendarSlice';
import ConfirmDelete from '../ConfirmDelete/ConfirmDelete';
import { render } from 'react-dom';
import { deleteIconD } from '../../../images/inedex.js'

import styless from '../ConfirmDelete/index.module.css'

function CalendarModal({ active, setActive, date, idEventItem }) {


    const dispatch = useDispatch()
    const { status, error, dataOneEvent } = useSelector(state => state.calendar)


    const [start, setStart] = useState()
    const [end, setEnd] = useState()
    const [modal, setModal] = useState(false)

    useEffect(() => {
        if (!active) {
            setModal(false)
        }
    }, [active])

    const initialValues = {
        id: Number(Math.floor(Math.random() * 20000)),
        title: '',
        start: '',
        end: '',
        time: '',
        display: '',
        color: '',
        allDay: false,
        textColor: '',
    }

    const initialValuesEdit = {
        id: Number(idEventItem?.id),
        title: idEventItem?.title,
        start: idEventItem?.start,
        end: idEventItem?.end,
        display: idEventItem?.display,
        color: idEventItem?.color,
        time: '',
        textColor: ''
    }



    useEffect(() => {
        if (idEventItem) {
            setStart(idEventItem.start)

            !idEventItem.end ? setEnd(idEventItem.start)
                : setEnd(idEventItem.end)

        }
        else {
            setStart(date)
            setEnd(date)
        }

    }, [date, idEventItem, status])









    const handleCloseModal = () => {
        setActive(false)
    }


    const colorBackground = ['rgb(238, 234, 255)', 'rgb(215, 249, 245)', 'rgb(255,226,249)'];
    const colorText = {
        'rgb(238, 234, 255)': 'rgb(111, 93,195)',
        'rgb(255,226,249)': 'rgb(167, 24, 112)',
        'rgb(215, 249, 245)': 'rgb(86, 141, 143)'
    }


    const AddValidation = Yup.object().shape({
        title: Yup.string()
            .required('Поле не может быть пустым.'),
    })



    const handleDeleteEvent = () => {
        dispatch(deleteEventCalendar(idEventItem?.id))
    }


    const handleConfirmDelete = () => {
        setModal(true)
    }

    const handleClose = () => {
        setModal(false)
    }


    return (

        <div className={active ? styles.active : styles.modal} onClick={handleCloseModal}>
            <div
                className={styles.modal__content} onClick={(e) => e.stopPropagation()}>
                {
                    idEventItem?.title &&
                    <div className={styles.modal__content_btDelete} >
                        <img src={icondeleteCalendar} alt='' onClick={handleConfirmDelete} />
                    </div>
                }


                {
                    modal && <div className={modal ? styless.active : styless.modal}>
                        <div className={styless.modal__content} onClick={(e) => e.stopPropagation()}>

                            <div className={styless.cross} onClick={handleClose} >
                                <img src={deleteIconD} alt='' />
                            </div>

                            <div>
                                <h1 className={styless.title}>Вы действительно хотите удалить пользователя?</h1>

                            </div>

                            <div className={styless.btn}>
                                <button className={styless.btn2} onClick={handleClose}> Назад</button>

                                <div className={styless.modal__content_btn}>
                                    <Button
                                        style={{ borderRadius: '0px', borderBottomRightRadius: '7px' }}
                                        projectType='add_user'
                                        onClick={handleDeleteEvent}
                                    >
                                        {
                                            status.deleteEventStatus === 'Deleting event'
                                                ?
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

                }






                <Formik
                    initialValues={idEventItem ? initialValuesEdit : initialValues}
                    validationSchema={AddValidation}
                    onSubmit={(values) => {

                        const randomIndex = Math.floor(Math.random() * (colorBackground.length - 1));
                        const result = colorBackground[randomIndex];
                        values.start = start
                        values.end = end

                        values.display = 'Background'
                        values.color = result
                        values.textColor = colorText[result]


                        idEventItem == null ? dispatch(createNewEventCalendar(values))
                            : dispatch(editEventCalendar(values))


                    }}>
                    {({ errors, touched, values }) => (

                        <Form >


                            <Field name='title' type='text' placeholder='Добавить название'
                                className={styles.modal__content_input} />
                            {
                                errors.title && touched.title ?
                                    (
                                        <div className={styles.errors}>{errors.title}</div>
                                    ) : <div className={styles.errors}> </div>
                            }



                            {
                                !modal &&

                                <div className={styles.modal__content_input_time}>

                                    <div className={styles.modal__content_input_time1} >
                                        <label className={styles.modal__content_input_text} >Начала даты </label>

                                        <Datetime value={start}
                                            locale="ru"
                                            className={styles.dataTime}
                                            dateFormat={moment(start).format('MM-DD-YYYY')}
                                            onChange={data => setStart(data)}
                                            inputProps={{ className: styles.datetime }}
                                        />
                                    </div>


                                    <div>
                                        <label className={styles.modal__content_input_text}>Конец даты </label>
                                        <Datetime value={end}
                                            inputProps={{ className: styles.datetime }}

                                            className={styles.dataTime}
                                            locale="ru"
                                            dateFormat={moment(end).format('MM-DD-YYYY, ')}
                                            onChange={data => setEnd(data)} />
                                    </div>

                                </div>
                            }


                            <div className={styles.modal__content_btn}>
                                <Button
                                    style={{ float: 'left' }}
                                    projectType='add_user'
                                    type='sumbit'>
                                    {
                                        status.createEventStatus === 'Creating event' ||
                                            status.editEventStatus === 'Editing event' ?
                                            <TailSpin
                                                height={24}
                                                color='white' />
                                            : 'Сохранить'
                                    }
                                </Button>

                            </div>


                        </Form>
                    )}
                </Formik >


            </div>

        </div >

    )
}


export default CalendarModal