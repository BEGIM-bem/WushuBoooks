import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import {createApplication, getApplications} from '../../api/applications';
import { setStatus } from '../../redux/features/counter/applicationSlice';
import ApplicationTable from './ApplicationTable';

const TrainerPage = ({eventId}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data, status, error } = useSelector(state=>state.applications);

    const handleSubmitForm = (list) => {
        const data = {
            event: +eventId,
            sportsmen: list
        }
        dispatch(createApplication(data));
    }

    useEffect(()=>{
        if (status === 'Application created') {
            toast.success('Заявление успешно отправлено');
            navigate('/events');
            dispatch(setStatus('Active'));
        }
    }, [status]);

    return (
        <div>
            <ApplicationTable eventId={eventId} status={status} error={error} onSubmitForm={handleSubmitForm}/>
        </div>
    )
}

export default TrainerPage
