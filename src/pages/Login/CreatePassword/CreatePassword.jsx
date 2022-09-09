import React, { useEffect, useState } from 'react'
import { TailSpin } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { checkToken, setNewPassword } from '../../../api/login.api';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import { setError } from '../../../redux/features/counter/profileSlice';
import Styles from './CreatePassword.module.css';

const getInfo = (info) => {
    let i = 0;
    while(info[i] !== 'M') {
        i++;
    }
    const id = info.slice(0, i);
    const token = info.slice(i+1, info.length);
    return {userId: id, token: token};
}

const CreatePassword = ({action = 'create'}) => {
    const { info } = useParams();
    const { userId, token } = getInfo(info);
    const { checkTmp, status, error } = useSelector(state=>state.profile);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [ password, setPassword ] = useState('');
    const [ conforPassword, setConfirmPassword ] = useState('');

    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);
    const handleSubmitForm = (e) => {
        e.preventDefault();
        if (password !== conforPassword) 
        {
            dispatch(setError({error: '* Пароли не совпадают', type: 'create-password'}));
            return;
        }
        dispatch(setNewPassword({id: userId, tmp: token, password}));
    }

    useEffect(()=>{
        dispatch(checkToken(getInfo(info)));
    }, [dispatch]);

    useEffect(()=>{
        if (checkTmp === false) navigate('/login');

    }, [checkTmp]);
    useEffect(()=>{
        if (status === 'Set new password') navigate('/login/sign-in');
    }, [status]);

    return (
        <>
        {checkTmp === true
        ? <div className={Styles.page}>
            <h1 className={Styles.title}>
                    Создание пароля
            </h1>
            <form 
            onSubmit={handleSubmitForm}
            className={Styles.form}>
                <div className={Styles.input_list}>
                    <div className={Styles.input_holder}>
                        <label htmlFor="password">Пароль</label>
                        <Input
                        name="password"
                        onChange={handlePasswordChange}
                        type="password"/>
                    </div>
                    <div className={Styles.input_holder}>
                        <label htmlFor="confirm-password">Подтвердите пароль</label>
                        <Input
                        name="confirm-password"
                        onChange={handleConfirmPasswordChange}
                        type="password"/>
                    </div>
                </div>
                {/* {error &&
                <p className={Styles.error_message}>{error}</p>} */}
                <Button
                    type="submit">
                    {status === 'Setting new password'
                    ? <TailSpin 
                    height={24}
                    color='white'/>
                    : 'Зарегистрироваться'}
                </Button>
            </form>
        </div>
        : <h1>Loading</h1>}
        </>
    )
}

export default CreatePassword