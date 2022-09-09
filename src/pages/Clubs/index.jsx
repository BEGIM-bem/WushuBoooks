import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ClubsList from "./ClubsList/ClubsList";
import styles from './index.module.css'
import { Button } from '../../components';
import NewClub from "./NewClub/NewClub";
import { createClub, getAllClubs } from "../../api/club.api";
import { setUsersList } from "../../api/users.api";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { usePagination } from '../../hooks';

//Клубы

function Clubs() {
    // Constants
    const { data, status, error } = useSelector(state=>state.clubs);
    const { trainer } = useSelector(state=>state.users);
    const { user } = useSelector(state=>state.profile);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Hooks
    const { 
        currentData,
        currentPage,
        jump,
        maxPage,
        next,
        prev
    } = usePagination(data, 10);

    // States
    const [newClub, setNewClub] = useState(false);

    // Functions
    const handleOpenNewClub = () => setNewClub(true);
    const handleCloseNewClub = () => setNewClub(false);
    const handleClubClick = (id) => navigate('/clubs/'  + id);

    const handleAddClub = () => {
        handleOpenNewClub();
        console.log("Adding club");
    }

    const handleSubmitClub = (data) => dispatch(createClub(data));

    // Effects
    useEffect(()=>{
        if (trainer.data === null) dispatch(setUsersList({role: 'trainer'}))
        dispatch(getAllClubs());
    }, [dispatch])

    useEffect(()=>{
        if (status === 'Created new club') {
            handleCloseNewClub();
            dispatch(getAllClubs());
            toast.success('Клуб создан успешно');
        }
    }, [status])

    return (
        <div className={styles.content}>
            {newClub && 
            <NewClub 
                closeModal={handleCloseNewClub} 
                handleSubmitClub={handleSubmitClub}
                status={status}
                error={error}
                trainers={trainer.data}/>}
            <div className={styles.clubs_header}>
                <h2 className={styles.clubs_title}>Клубы</h2>
                <div className={styles.button_holder}>
                    {
                        (user.role === 'admin' || user.role === 'secretary') &&
                        <Button
                            type="button"
                            onClick={handleAddClub}
                            projectType="add_user">+ Добавить клуб</Button>
                    }
                </div>
            </div>
            <ClubsList 
                clubClick={handleClubClick}
                clubs={currentData}
                maxPage={maxPage}
                currentPage={currentPage}
                jump={jump}
                next={next}
                prev={prev}/>
        </div>
    )
}

export default Clubs;