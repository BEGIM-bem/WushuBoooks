import React, { useRef } from 'react';
import ReactDOM from "react-dom";
import styles from './Calendar.module.css';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import esLocale from '@fullcalendar/core/locales/ne';
import { useState } from 'react';
import CalendarModal from '../../components/Modals/CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import timeGridPlugin from '@fullcalendar/timegrid'
import { StyleWrapper } from './stylesCalendar.js'
import { editEventCalendar } from '../../api/calendar';
import { UncontrolledPopover, PopoverBody, } from "reactstrap";
import { toast } from 'react-toastify';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover'
import { setNullStatus } from '../../redux/reducers/calendarSlice';


const Popup = ({ target, text }) => {
    console.log("target: ", target)
    if (!target) {
        return null;
    }
    return (
        <UncontrolledPopover trigger="legacy" placement="auto" target={target}>
            <PopoverBody>{text}</PopoverBody>
        </UncontrolledPopover>
    );
};


function Calendar() {

    const { status, error, allEventForCalendar } = useSelector(state => state.calendar)

    const [active, setActive] = useState({ isOpen: false, date: null, idEventItem: null })
    const [state, setState] = useState({ events: [] })
    const { user } = useSelector(state => state.profile)

    const dispatch = useDispatch()
    const calendarComponentRef = useRef();

    useEffect(() => {
        if (status.deleteEventStatus === 'Delted event') {
            toast.success('Успешно удаленно');
            dispatch(setNullStatus())
            setActive({ isOpen: false })
        }
        else if (status.deleteEventStatus === 'Rejected delete event') {
            toast.error('Ошибка при удаление');
            dispatch(setNullStatus())
            setActive({ isOpen: false })
        }

        if (status.editEventStatus === 'Edited event') {
            toast.success('Изменение сохранились');
            dispatch(setNullStatus())
            setActive({ isOpen: false })
        }
        else if (status.editEventStatus === 'Rejected delete event') {
            toast.error('Ошибка');
            dispatch(setNullStatus())
            setActive({ isOpen: false })
        }

        if (status.createEventStatus === 'Creted event') {
            toast.success('Дата добавленно успешно');
            dispatch(setNullStatus())
            setActive({ isOpen: false })
        }
        else if (status.createEventStatus === 'Rejected event to create') {
            toast.error('Ошибка');
            dispatch(setNullStatus())
            setActive({ isOpen: false })
        }


    }, [status.editEventStatus, status.createEventStatus, status.deleteEventStatus])

    useEffect(() => {
        setState({ events: allEventForCalendar })
    }, [allEventForCalendar])

    const handleDateClick = (arg) => {

        user.role === 'admin' && (
            setActive({
                positions: {
                    left: arg.dayEl.offsetLeft,
                    top: arg.dayEl.offsetTop
                },
                isOpen: true,
                date: arg.date,
                idEventItem: null
            }))
    }




    const handleEventClick = (info) => {
        user.role === 'admin' && (
            setActive({
                isOpen: true, idEventItem:
                {
                    id: info.event.id,
                    title: info.event.title,
                    start: info.event.start,
                    end: info.event.end,
                    display: info.event.display,
                    color: info.event.color
                },
                date: null,
                // positions: null
            }))
    }


    const handleEventDrop = (event) => {

        let valuesEdit = {
            id: Number(event.event._def.publicId),
            title: event.event.title,
            start: event.event.start,
            end: event.event.end,
            display: event.event.display,
            color: event.event.backgroundColor,
            textColor: event.event.textColor
        }
        dispatch(editEventCalendar(valuesEdit))
    }


    const handleMoreLinkContent = (arg) => {
        return 'Ещё ' + arg.num;
    }


    return (
        <div className={styles.content}>

            <h1 className={styles.content__title}> Календарь </h1>
            <div className={styles.content_calendar} >
                <StyleWrapper>
                    <FullCalendar

                        defaultView="dayGridMonth"
                        locale={esLocale}

                        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
                        ref={calendarComponentRef}


                        headerToolbar={{
                            right: 'prev,next',
                            center: 'title',
                            left: '',

                        }}
                        views={{
                            dayGridMonth: {
                                titleFormat: { year: 'numeric', month: 'long' }
                            },
                            timeGrid: {
                                eventLimit: 3
                            }
                        }}

                        events={state.events}
                        contentHeight='650px'
                        eventTimeFormat={{
                            hour: '2-digit',
                            minute: '2-digit',
                        }}

                        displayEventEnd={true}
                        droppable={true}
                        eventLimit={true}
                        editable={true}
                        selectable={true}
                        selectMirror={true}
                        dayMaxEvents={true}


                        dateClick={handleDateClick}
                        eventClick={handleEventClick}
                        eventDrop={user.role === 'admin' && handleEventDrop}




                        moreLinkContent={handleMoreLinkContent}
                    />

                </StyleWrapper>



            </div>

            {
                active && <CalendarModal
                    idEventItem={active.idEventItem}
                    active={active.isOpen}

                    date={active.date}
                    setActive={setActive}
                />
            }

        </div >
    )
}


export default Calendar;