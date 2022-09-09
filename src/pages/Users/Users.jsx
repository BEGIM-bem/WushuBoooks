import React, { useEffect, useState } from 'react'
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { approveUser, deleteUser, setNewUser, setUsersList } from '../../api/users.api';
import { QUERY_ROLES, ROLES_FIND } from '../../const/user_roles';
import usePagination from '../../hooks/usePagination/usePagination';
import { setDeleteId, setSelectAll, setSelectItem, setUnselectAll, setUnselectItem } from '../../redux/features/counter/usersSlice';
import NewUser from './NewUser/NewUser';
import styles from './Users.module.css'
import UsersHeader from './UsersHeader/UsersHeader';
import Confirm from './UsersList/Confirm/Confirm';
import UsersList from './UsersList/UsersList';
import UsersNav from './UsersNav/UsersNav';

//Пользователи
function Users() {
    // Constants
    const dispatch = useDispatch();
    const { users } = useSelector(state=>state);
    const { selected } = users;

    // States
    const [search, setSearch] = useState('');
    const [roleFilter, setRoleFilter] = useState(0);
    const [newUserWindow, setNewUserWindow] = useState(false);
    const [onEdit, setOnEdit] = useState(null);

    
    // Hooks
    const { 
        currentData, 
        currentPage,
        maxPage, 
        jump,
        next,
        prev
    } = usePagination((users[ROLES_FIND[roleFilter]].data || []), 10);


    // Onload
    useEffect(()=>{
        dispatch(setUsersList({role: QUERY_ROLES[roleFilter], status: roleFilter === 4 ? 1 : ''}))
    }, [roleFilter, dispatch])

    useEffect(()=>{
        if (users.user.status === 'Set new user') setNewUserWindow(false);
        if (users.user.status === 'User deleted' || users.user.status === 'User approved') dispatch(setUsersList({role: QUERY_ROLES[roleFilter], status: roleFilter === 4 ? 1 : ''}))
    }, [users.user.status])

    // Functions
    const handleSearchChange = (e) => setSearch(e.target.value);
    const handleAddUser = () => setNewUserWindow(true);
    const handleCloseNewUser = () => setNewUserWindow(false);


    const isSelectedItem = useCallback((id)=>{
        if (selected.length === 0) return false;
        for (let i of selected){
            if (i === id) return true;
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

    const onSelectItem = useCallback((id) => isSelectedItem(id) ? dispatch(setUnselectItem(id)) : dispatch(setSelectItem(id)), [dispatch, isSelectedItem])
    const onSelectAll = useCallback(() => isSelectedAll() ? dispatch(setUnselectAll()) : dispatch(setSelectAll(getAllId())), [dispatch, isSelectedAll,  getAllId])
    const onInputChange = (e) => {
        const { name, value, label } = e.target;
        setOnEdit(prev => {
            const obj = JSON.parse(JSON.stringify(prev));
            if (label) obj.role = value;
            else obj[name] = value;
            return obj;
        })
    }

    const handleUpdateUser = (id, data) => {
        if (onEdit.prevRole !== data.role) data['appointment_date'] = new Date();
        dispatch(approveUser({id, data})).unwrap().then((res)=>res.status === 200 && toast.success('Пользователь успешно обновлен'));
        setOnEdit(null);
    }
    const handleEditUser = (data) => setOnEdit(data); // {id, prev, new}
    const handleDeleteUser = (id) => dispatch(deleteUser(id));
    const handleNewUserSet = (data) => dispatch(setNewUser(data))
    const handleApproveUser = (id) => dispatch(approveUser({id, data: {appointment_date: new Date(), status: 2}}));

    // Debug

    return (
        <div className={styles.content}>
            {newUserWindow &&
            <NewUser
                status={users.user.status}
                submitForm={handleNewUserSet}
                closeWindow={handleCloseNewUser}/>}
            {users.user.deleteId &&
            <Confirm/>}

            <UsersHeader
                search={search}
                setSearch={handleSearchChange}/>
            <UsersNav
                handleNewUserButton={handleAddUser}
                roleFilter={roleFilter}
                setRoleFilter={setRoleFilter}/>
            <UsersList
                allData={users[ROLES_FIND[roleFilter]].data || []}
                search={search}
                setSearch={setSearch}
                deleteUser={handleDeleteUser}
                editUser={handleEditUser}
                onEdit={onEdit}
                approveUser={handleApproveUser}
                roleFilter={roleFilter}
                selected={users.selected}
                isSelectedItem={isSelectedItem}
                isSelectedAll={isSelectedAll}
                onSelectItem={onSelectItem}
                onSelectAll={onSelectAll}
                currentData={currentData}
                currentPage={currentPage}
                maxPage={maxPage}
                jump={jump}
                prev={prev}
                next={next}
                addUser={handleAddUser}
                onInputChange={onInputChange}
                onUpdateUser={handleUpdateUser}/>
        </div>
    )
}

export default Users;