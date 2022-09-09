import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useNavigate, useParams } from 'react-router';
import { getEventById } from '../../api/event.api';
import Arena from './Arena/Arena';
import Banner from './Banner/Banner';
import EventHeader from './EventHeader/EventHeader';
import JudgePage from './JudgePage';
import ProtocolHolder from './ProtocolHolder/ProtocolHolder';
import SecretaryPage from './SecretaryPage';
import Submissions from './Submissions/Submissions';
import TotalTable from './TotalTable/TotalTable';
import TrainerPage from './TrainerPage';

const isFinished = (end) => {
    if (end){
        const today = new Date();
        const endDay = new Date(end[3]+end[4]+'-'+end[0]+end[1]+'-'+end[6]+end[7]+end[8]+end[9]);
        if (today > endDay) return true;
    }
    return false;
}

const EventDetail = () => {
    // Constants
    const { id } = useParams();
    const { currentEvent, subList, protocols } = useSelector(state=>state.events);
    const { user } = useSelector(state=>state.profile);
    const { role } = user;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    // States
    const [isOpenProtocol, setIsOpenProtocol] = useState(false);
    const [isTableOpen, setIsTabelOpen] = useState(false);
    const [isOpenArena, setIsOpenArena] = useState(false);

    // Onload
    useEffect(()=>{
        dispatch(getEventById(id));
    }, [dispatch]);


    // Functions
    const handleClubItemClick = (itemId) => navigate('/events/' + id + '/table/' + itemId);

    const handleCreateProtocol = () => {
        setIsOpenProtocol(true);
        console.log('Creating protocol');
    }

    const handleCreateArena = () => {
        setIsOpenArena(true);
        console.log('Creagin arena');
    }

    return (
        <div style={{width: '96%', margin: 'auto', padding: '50px 0'}}>
            <Banner
                title={currentEvent?.title || null}
                startDate={currentEvent?.start || null}
                endDate={currentEvent?.end || null}
                startTime={currentEvent?.time?.split('-')[0] || null}
                deadline={currentEvent?.applicationDeadline}/>
            {
                (isFinished(currentEvent?.end) && currentEvent?.id) &&
                <TotalTable />
            }
            {
                (!isFinished(currentEvent?.end) && currentEvent?.id) &&
                <>
                    {
                        role === 'trainer' &&
                        <TrainerPage eventId={id}/>
                    }
                    {
                        (role === 'secretary' || role === 'admin') &&
                        <SecretaryPage eventId={id} eventTitle={currentEvent?.title}/>
                    }
                    {
                        (role === 'main_judge') &&
                        <JudgePage eventId={id} eventTitle={currentEvent?.title}/>
                    }
                </>
            }
        </div>
    )
}

export default EventDetail;