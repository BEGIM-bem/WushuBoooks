import React from 'react';
import Pagination from '../../../components/Pagination';
import SecretaryEventItem from '../EventItem/SecretaryEventItem';
import EventItem from '../EventItem/SecretaryEventItem';
import TrainerEventItem from '../EventItem/TrainerEventItem';
import SecretaryListHeader from '../ListHeader/SecretaryListHeader';
import TrainerListHeader from '../ListHeader/TrainerListHeader';
import style from './eventList.module.css';

const EventList = ({
    events,
    selected,
    isSelectedAll,
    isSelectedItem,
    onSelectAll,
    onSelectItem,
    currentData,
    currentPage,
    maxPage,
    jump,
    prev,
    next,
    onDelete,
    perPage,
    role
}) => {
    return (
    <>
        {
            (role === 'admin' || role === 'secretary') && 
            <SecretaryListHeader
                isSelectedAll={isSelectedAll}
                onSelectAll={onSelectAll}/>
        }
        {
            (role === 'trainer') &&
            <TrainerListHeader 
                isSelectedAll={isSelectedAll}
                onSelectAll={onSelectAll}/>
        }
        <div className={style.event_list_holder}>
            <div className={style.event_list_inner}>
                {
                    (role === 'admin' || role === 'secretary') &&
                    <>{currentData().map((item)=>(
                        <SecretaryEventItem
                            key={item.id}
                            item={item}
                            isSelectedItem={isSelectedItem}
                            onSelectItem={onSelectItem}
                            onDelete={onDelete}/>
                    ))}</>
                }
                {
                    (role === 'trainer') &&
                    <>{currentData().map((item)=>(
                        <TrainerEventItem
                            key={item.id}
                            item={item}
                            isSelectedItem={isSelectedItem}
                            onSelectItem={onSelectItem}
                            onDelete={onDelete}/>
                    ))}</>
                }
            </div>
            {maxPage > 1 &&
            <Pagination
                currentPage={currentPage}
                limitPerPage={perPage}
                onIndexClick={jump}
                onNextClick={next}
                onPrevClick={prev}
                max={maxPage}/>}
        </div>
    </>)
}

export default EventList