import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStatus, setSelectAll, setSelectItem, setUnselectAll, setUnselectItem } from "../../redux/features/counter/eventSlice";
import EventHeader from "./EventHeader/EventHeader";
import EventList from "./EventList/EventList";
import styles from './Events.module.css';
import { usePagination } from '../../hooks/usePagination/usePagination';
import { useCallback } from "react";
import { useEffect } from "react";
import { createNewEvent, deleteEvent, setEventList} from "../../api/event.api";
import NewEvent from "./NewEvent/NewEvent";
import { setEventListExtra } from "../../redux/extraReducers/eventExtraReducer";
import { toast } from "react-toastify";

//Мероприятия
const perPage = 10;

function Events() {
    // Constants
    const { data, selected, status, error } = useSelector(state=>state.events);
    const { user } = useSelector(state=>state.profile);
    const dispatch = useDispatch();

    // Hooks
    const { 
        currentData, 
        currentPage,
        maxPage, 
        jump,
        next,
        prev
    } = usePagination((data || []), perPage);


    // States
    const [isNewEvent, setIsNewEvent] = useState(false);
    const [eventName, setEventName] = useState('');
    const [eventCity, setEventCity] = useState('');
    const [eventAddress, setEventAddress] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventDeadline, setEventDeadline] = useState('');
    const [applicationDeadline, setApplicationDeadline] = useState('');
    const [eventTime, setEventTime] = useState('')
    
    // Onload
    useEffect(()=>{
        dispatch(setEventList({start: '', end: ''}));
    }, [dispatch])
    
    useEffect(()=>{
        if (status === 'Deleted event') {
            dispatch(setStatus('Active'));
            dispatch(setEventList({start: '', end: ''}));
        }
        if (status === 'Created new event') {
            toast.success('Мероприятие успешно создано')
            setIsNewEvent(false);
            dispatch(setStatus('Active'));
            dispatch(setEventList({start: '', end: ''}));
        }
    }, [status, dispatch])

    // Functions
    const handleEventNameChange = (e) => setEventName(e.target.value);
    const handleEventCityChange = (e) => setEventCity(e.target.value);
    const handleEventDateChange = (e) => setEventDate(e.target.value);
    const handleEventDeadlineChange = (e) => setEventDeadline(e.target.value);
    const handleEventApplicationDeadlineChange = (e) => setApplicationDeadline(e.target.value);
    const handleEventTimeChange = (e) => setEventTime(e.target.value);
    const handleEventAddressChange = (e) => setEventAddress(e.target.value);

    const handleCloseNewEvent = useCallback(() => setIsNewEvent(false), []);

    const handleDeleteEvent = (id) =>  dispatch(deleteEvent(id));

    const isSelectedItem = useCallback((id) => {
        if (selected.length === 0) return false;
        for (let i of selected){
            if (i === id) return  true;
        }
        return false;
    }, [selected]);
    
    const isSelectedAll = useCallback(() => {
        if (currentData().length === 0) return false;
        for (let i of currentData()) {
            if (!selected.includes(i.id)) return false;
        }
        return true;
    }, [selected, currentData])

    const getAllId = useCallback(() => currentData().map(item=>item.id), [currentData]);

    const onSelectItem = useCallback((id) => isSelectedItem(id) ? dispatch(setUnselectItem(id)) : dispatch(setSelectItem(id)), [dispatch, isSelectedItem]);
    const onSelectAll = useCallback(() => isSelectedAll() ? dispatch(setUnselectAll()) : dispatch(setSelectAll(getAllId())), [dispatch, isSelectedAll, getAllId]);

    const handleNewEventOpen = useCallback(() => {
        setIsNewEvent(true);
    }, []);

    const handleAddNewEvent = useCallback((e)=>{
        e.preventDefault();
        e.stopPropagation();
        const data = {
            title: eventName, 
            city: eventCity, 
            address: eventAddress, 
            start: eventDate, 
            end: eventDeadline, 
            time: eventTime, 
            applicationDeadline: eventDeadline
        }
        console.log(data);
        dispatch(createNewEvent(data))
    }, [eventName, eventCity, eventDate, dispatch])

    return (
        <div className={styles.content} >
            {isNewEvent &&
            <NewEvent
                status={status}
                error={error}
                date={eventDate}
                setDate={handleEventDateChange}
                name={eventName}
                city={eventCity}
                eventDeadline={eventDeadline}
                applicationDeadline={applicationDeadline}
                time={eventTime}
                address={eventAddress}
                setName={handleEventNameChange}
                setCity={handleEventCityChange}
                setEventDeadline={handleEventDeadlineChange}
                setApplicationDeadline={handleEventApplicationDeadlineChange}
                setTime={handleEventTimeChange}
                setAddress={handleEventAddressChange}
                handleSubmit={handleAddNewEvent}
                closeWindow={handleCloseNewEvent}/>}
            <EventHeader
                user={user}
                handleNewEvent={handleNewEventOpen}/>
            <EventList
                selected={selected}
                isSelectedAll={isSelectedAll}
                isSelectedItem={isSelectedItem}
                onSelectItem={onSelectItem}
                onSelectAll={onSelectAll}
                currentData={currentData}
                currentPage={currentPage}
                maxPage={maxPage}
                perPage={perPage}
                jump={jump}
                prev={prev}
                next={next}
                onDelete={handleDeleteEvent}
                role={user.role}/>
        </div>
    )
}

export default Events;