import React, { memo } from 'react';
import styles from './user.module.css';
import { Checkbox, Input } from '../../../../components/index';
import { useDispatch } from 'react-redux';
import { Approve, EditIcon, UserDeleteIcon } from '../../../../images/inedex';
import { setDeleteId } from '../../../../redux/features/counter/usersSlice';
import getUnixTime from 'date-fns/esm/fp/getUnixTime/index';
import Select from 'react-select';


const getTime = (date) => {
    if (!date) return null;
    let newDate = date.split('T');
    newDate = newDate[0];
    return newDate.replace(/-/g, '.');
}

const getRole = {
    'trainer': 'Тренер',
    'admin': 'Админ',
    'secretary': 'Секретарь',
    'judge': 'Судья'
}

const getName = (name) => {
    const str = name.split('');
    str[str.findIndex((i)=>i==='/')] = ' ';
    return str.join('');
}



const UserItem = ({
    item, 
    isSelectedItem, 
    onSelectItem, 
    deleteUser, 
    editUser, 
    roleFilter, 
    approveUser, 
    onEdit, 
    onInputChange, 
    onUpdateUser
}) => {

    const USER_ROLES = [
        {value: 'admin', label: 'Админ'},
        {value: 'judge', label: 'Судья'},
        {value: 'trainer', label: 'Тренер'},
        {value: 'secretary', label: 'Секретарь'}
    ]
    
    const handleDeleteItem = () => {
        deleteUser(item.id)
    }

    const handleEditUser = () => {
        const data = {
            id: item.id,
            prevRole: item.role,
            name: item.name.split('/')[0],
            lastname: item.name.split('/')[1],
            role: item.role
        }
        editUser(data);
    }

    const handleSubmitEdition = () => {
        const data = {
            name: onEdit.name + '/' + onEdit.lastname,
            role: onEdit.role
        }
        onUpdateUser(item.id, data);
    }
    const handleRejectEdition = () => editUser(null);

    const handleAppriveUtem = () => approveUser(item.id);

    return (
        <div className={styles.item_holder + ' ' + (isSelectedItem(item.id) && styles.selected_item) + ' ' + (onEdit?.id === item.id && styles.input_edit_mode)}>
            <div className={styles.column_checkbox}>
                <div className={styles.checkbox_holder}>
                    <Checkbox
                        onSelectItem={()=>onSelectItem(item.id)}
                        checked={isSelectedItem(item.id)}
                        mode="select item"/>
                </div>
            </div>
            <p className={styles.item_column + ' ' + styles.column_id}>{item.id}</p>
            <div className={styles.item_column + ' ' + styles.column_name}>
                {
                    onEdit?.id === item.id
                    ? 
                    <>
                        <Input type="text" projectType="edit_name_input" name="name" value={onEdit.name} onChange={onInputChange}/>
                        <Input type="text" projectType="edit_name_input" name="edit_name_input" value={onEdit.lastname} onChange={onInputChange}/>
                    </>
                    : <p>{getName(item.name)}</p>
                }
                
            </div>
            <div className={styles.item_column + ' ' + styles.column_role}>
                {
                    onEdit?.id === item.id 
                    ? <Select 
                        className={styles.select} 
                        options={USER_ROLES} 
                        name="role"
                        value={{value: onEdit?.role, label: getRole[onEdit?.role]}}
                        onChange={(e) => onInputChange({target: e})}/> 
                    : <p>{getRole[item.role]}</p>
                }
            </div>
            <p className={styles.item_column + ' ' + styles.column_email}>{item.email}</p>
            <p className={styles.item_column + ' ' + styles.column_date}>{getTime(item.appointment_date)}</p>
            <div className={styles.item_column + ' ' + styles.column_options}>
                <div className={styles.options_holder}>
                    {(roleFilter === 4 || onEdit?.id === item.id)
                    ? <img 
                        className={styles.options_approve}
                        src={Approve}
                        onClick={onEdit?.id === item.id ? handleSubmitEdition : handleAppriveUtem}
                        alt="edit"/>
                    : <img 
                        className={styles.options_edit}
                        onClick={handleEditUser}
                        src={EditIcon}
                        alt="edit"/>}
                    <img
                        onClick={onEdit?.id === item.id ? handleRejectEdition : handleDeleteItem}
                        className={styles.options_delete}
                        src={UserDeleteIcon} 
                        alt="edit"/>
                </div>
            </div>
        </div>
    )
}

export default memo(UserItem);