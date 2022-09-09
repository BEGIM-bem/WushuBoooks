import React from 'react';
import { useNavigate } from 'react-router';
import { Checkbox } from '../../../components';
import { EditIcon, UserDeleteIcon } from '../../../images/inedex';
import { getDate } from '../../../utils';
import style from './eventItem.module.css';

const TrainerEventItem = ({
    isSelectedItem,
    onSelectItem,
    item,
    onDelete
}) => {
    const navigate = useNavigate();
    const handleDeleteItem = () => onDelete(item.id);
    const handleItemClick = () => navigate('/events/'+item.id);
    const getStatus = () => {
        const today = new Date();
        const applicationDeadline = new Date(item.applicationDeadline);
        const start = new Date(item.start);
        const end = new Date(item.end);
        if (today <= applicationDeadline) return "Прием заявок";
        if (today < start) return "В ожидании начало";
        if (today <= end) return "Проводится";
        return "Закончен";
    }
    return (
        <div 
            onClick={handleItemClick}
            className={style.item_holder_2 + ' ' + (isSelectedItem(item.id) && style.selected_item)}>
            <p className={style.item_column + ' ' + style.column_name}>{item.title}</p>
            <p className={style.item_column + ' ' + style.column_date}>{getDate(item.start)}</p>
            <p className={style.item_column + ' ' + style.column_status}>{getStatus()}</p>
        </div>
    )
}

export default TrainerEventItem;