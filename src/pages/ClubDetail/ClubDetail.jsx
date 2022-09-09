import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { addSportsmanApi, getClubById, getClubSportsmans } from '../../api/club.api';
import { Button } from '../../components';
import usePagination from '../../hooks/usePagination/usePagination';
import Banner from './Banner/Banner';
import NewSportsman from './NewSportsman/NewSportsman';
import styles from './style.module.css';
import { toast } from 'react-toastify';
import SportsmanList from './SportsmanList/SportsmanList';
import { selectAll, selectItem, unSelectAll, unSelectItem } from '../../redux/features/counter/clubsSlice';

const ClubDetail = () => {
    // Constants
    const { id } = useParams();
    const { currentClub, selectedSportsmen, status, error } = useSelector(state=>state.clubs);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // States
    const [addSportsman, setAddSportsman] = useState(false);

    // Hooks
    const {
        currentData,
        currentPage,
        jump,
        maxPage,
        next,
        prev
    } = usePagination(currentClub?.sportsmen || [], 10);

    // Functions
    const handleAddSportsman = () => setAddSportsman(true);
    const handleCloseAddSportsman = () => setAddSportsman(false);
    const handleSubmitAddSportsman = async (data) => {
        try {
            data.append('club', id)
            const res = await dispatch(addSportsmanApi(data));
            handleCloseAddSportsman();
            return res;
        } catch (e) {
            return e;
        }
    }

    
    const isSelectedItem = useCallback((id) => selectedSportsmen.findIndex((i)=>i === id), [selectedSportsmen]);
    const isSelectedAll = useCallback(() => {
        if (selectedSportsmen.length === 0) return false;
        for (let i of currentData()) {
            if (!selectedSportsmen.includes(i.id)) return false;
        }
        return true;
    }, [selectedSportsmen]);
    
    const handleSelectItem = (id) => isSelectedItem(id) === -1 ? dispatch(selectItem(id)) :  dispatch(unSelectItem(id));
    const handelSelectAll = () => isSelectedAll() ? dispatch(unSelectAll()) : dispatch(selectAll(currentData()));

    const handleItemClick = (id) => navigate('/sportsman/'+id);

    // Effects
    useEffect(()=>{
        dispatch(getClubById(id))
    }, [dispatch]);

    useEffect(()=>{
        if (status === 'Sportsman added') {
            handleCloseAddSportsman();
            dispatch(getClubById(id));
            alert('Added');
            toast.success('Спортсмен добавлен успешно');
        }
        else if (status === 'Rejected add sportsman to the club') {
            toast.error('Ошибка при добавлении спортсмена');
        }
    }, [status])

    return (
        <div className={styles.page_holder}>
            {(currentClub && currentClub.id === +id) &&
            <>
                {addSportsman &&
                <NewSportsman status={status} closeModal={handleCloseAddSportsman} addSportsman={handleSubmitAddSportsman}/>}
                <Banner club={currentClub}/>
                <div className={styles.all_sportsmans_header}>
                    <h3 className={styles.header_title}>Все спортсмены</h3>
                    <div className={styles.header_button_holder}>
                        <Button
                            type="button"
                            projectType="add_user"
                            onClick={handleAddSportsman}>+ Добавить спортсмена</Button>
                    </div>
                </div>
                <SportsmanList 
                    isSelectedAll={isSelectedAll}
                    isSelectedItem={isSelectedItem}
                    onSelectItem={handleSelectItem}
                    onSelectAll={handelSelectAll}
                    onItemClick={handleItemClick}
                    list={currentClub?.sportsmen || []}
                    jump={jump}
                    next={next}
                    prev={prev}
                    maxPage={maxPage}
                    currentPage={currentPage}/>
            </>}
        </div>
    )
}

export default ClubDetail;