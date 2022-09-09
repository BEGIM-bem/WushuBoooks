import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { getApplications } from '../../api/applications';
import { formProtocolByEvent, getProtocolByEvent, updateProtocolByEvent } from '../../api/protocol';
import EventHeader from './EventHeader/EventHeader';
import ProtocolHolder from './ProtocolHolder/ProtocolHolder';
import SecretaryTable from './SecretaryTable/SecretaryTable';
import Submissions from './Submissions/Submissions';

const getTable = () => {

}

const SecretaryPage = ({eventId, eventTitle}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data, status: applicationStatus } = useSelector(state=>state.applications);
    const  { protocolList, protocolStatus } = useSelector(state=>state.protocols);
    const { user } = useSelector(state=>state.profile);
    
    const [isTableOpen, setIsTableOpen] = useState(false);

    const handleCreateProtocol = () => dispatch(formProtocolByEvent(eventId))
    const handleClubItemClick = (id) => navigate('/events/' + eventId + '/' + id);
    const handleUpdateApplication = (data) => {
        dispatch(updateProtocolByEvent(data)).then(({meta})=>meta.requestStatus === 'fulfilled' && toast.success('Успешно обновлено'));
    }

    useEffect(()=>{
        dispatch(getApplications(eventId));
        dispatch(getProtocolByEvent(eventId));
    }, [])

    return (
        <div>
            {
                !isTableOpen &&
                <EventHeader
                        status={protocolStatus}
                        handleButtonClick={handleCreateProtocol}/>
            }
            <Routes>
                <Route path="/" element={<Submissions list={data || []} handleClubItemClick={handleClubItemClick} eventTitle={eventTitle}/>}/>
                <Route path="/:id" element={<SecretaryTable setIsTableOpen={setIsTableOpen} list={data} eventId={eventId} status={applicationStatus}/>} />
            </Routes>
            {
                (!isTableOpen && protocolList?.length > 0) &&
                <>
                    <ProtocolHolder onSave={handleUpdateApplication} list={protocolList} role={user.role} status={protocolStatus}/>
                </>
            }
        </div>
    )
}

export default SecretaryPage;
