import React, { useEffect, useState } from 'react';
import JudgeTeamTable from './JudgeTeamTable/JudgeTeamTable';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router';
import { getApplications } from '../../api/applications';
import { approveProtocol, formProtocolByEvent, getProtocolByEvent, rejectProtocol } from '../../api/protocol';
import EventHeader from './EventHeader/EventHeader';
import ProtocolHolder from './ProtocolHolder/ProtocolHolder';
import SecretaryTable from './SecretaryTable/SecretaryTable';
import Submissions from './Submissions/Submissions';
import styles from './judgePage.module.css';
import { Button } from '../../components';
import { Approve, WhiteApprove } from '../../images/inedex';
import { setUsersList } from '../../api/users.api';
import Arena from './Arena/Arena';
import { TailSpin } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import RejectModal from './RejectModal/RejectModal';

const getJudgeList = (eventId) => {
    if (localStorage.getItem('accepted-protocols')) {
        const eventList = JSON.parse(localStorage.getItem('accepted-protocols'));
        const list = eventList.find((item) => item.eventId === eventId);
        if(list.data) return list.data;
    }
    return new Array(6).fill(0).map((_, i) => ({value: null, label: ''}));
}

const getJudgeOptions = (data) => {
    if (data) {
        return data.map((item)=>({value: item.id, label: item.name.split('/').join(' ')}));
    }
    return [];
}


const arenaList = {
    'west': 'Запад',
    'east': 'Восток',
    'south': 'Юг',
    'north': 'Север',
    'south_north': 'Север-Юг',
    'west_or_east': 'Запад/Восток',
    'south_or_north': 'Восток/Юг'
}

const JudgePage = ({eventId, eventTitle}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data, status } = useSelector(state=>state.applications);
    const { protocolList, protocolStatus } = useSelector(state=>state.protocols);
    const { trainer } = useSelector(state=>state.users);
    const { user } = useSelector(state=>state.profile);
    
    const [judgeForm, setJudgeForm] = useState(getJudgeList(eventId));
    const [judgeList, setJudgeList] = useState([]);
    const [rejectModal, setRejectModal] = useState(false);
    
    useEffect(()=>{
        setJudgeList(getJudgeOptions(trainer.data, judgeForm))
    }, [trainer.data])

    const handleCloseRejectModal = () => setRejectModal(false);

    const handleRejectProtocol = ({data}) => {
        console.log("SDFSDF")
        dispatch(rejectProtocol({...data, id: eventId})).then(()=>{
            toast.success('Отклонено');
            handleCloseRejectModal();
        })
    }
    
    const handleInputChange = (e, i) => {
        setJudgeForm(prev=>{
            const arr = JSON.parse(JSON.stringify(prev));
            arr[i].value = e.target.value;
            arr[i].label = e.target.label;
            return arr;
        })
        setJudgeList(prev => {
            const arr = JSON.parse(JSON.stringify(prev)).filter(item=>item.value !== e.target.value);
            return arr;
        })
    }
    
    const isAcceptedProtocol = () => {
        if (localStorage.getItem('accepted-protocols')) {
            const acceptedList = JSON.parse(localStorage.getItem('accepted-protocols'));
            const obj = acceptedList.find((item)=>item.eventId === eventId);
            if (obj) return true;
        }
        return false;
    }
    const [isTableOpen, setIsTableOpen] = useState(false);
    
    const handleCreateProtocol = () => dispatch(formProtocolByEvent(eventId))
    const handleClubItemClick = (id) => navigate('/events/' + eventId + '/' + id);
    const handleSaveJudgeList = () => {
        
    }

    const handleAcceptProtocol = () => dispatch(approveProtocol({id: eventId, data: judgeForm})).then(()=>toast.success('Протокол принят'));

    useEffect(()=>{
        dispatch(getApplications(eventId));
        dispatch(getProtocolByEvent(eventId));
        dispatch(setUsersList({role: 'trainer', status: ''}))
    }, [])

    return (
        <div>
            {
                rejectModal &&
                <RejectModal onSubmit={handleRejectProtocol} closeModal={handleCloseRejectModal} status={protocolStatus}/>
            }
            <div className={styles.header}>
                <h1>Протокол соревнований</h1>
                <div className={styles.buttons_holder}>
                    {
                        (!isAcceptedProtocol() && protocolList.length > 0) &&
                        <>
                            <div className={styles.reject_button}>
                                <Button
                                    type="button"
                                    projectType="reject"
                                    onClick={()=>setRejectModal(true)}>Отклонить</Button>
                            </div>
                            <div className={styles.accept_button}>
                                <Button
                                    type="button"
                                    projectType="add_user"
                                    onClick={handleAcceptProtocol}>
                                        {
                                            protocolStatus === 'Approving protocol'
                                            ? <TailSpin height={22} color="#fff"/>
                                            : <>
                                            <img src={WhiteApprove} alt="approve" style={{alignSelf: 'center', marginRight: 10}}/>
                                            Принять
                                            </>
                                        }
                                </Button>
                            </div>
                        </>
                    }
                </div>
            </div>
            
            {
                protocolList?.length > 0 &&
                <ProtocolHolder 
                    isAcceptedProtocol={isAcceptedProtocol}
                    handleInputChange={handleInputChange}
                    judgeForm={judgeForm}
                    judgeList={judgeList}
                    role={user.role} 
                    list={protocolList}/>
            }
            
        </div>
    )
}

export default JudgePage;