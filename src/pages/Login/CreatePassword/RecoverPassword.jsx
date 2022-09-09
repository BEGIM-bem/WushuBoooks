import React, { useEffect, useState } from 'react'
import { TailSpin } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { checkToken, setNewPassword } from '../../../api/login.api';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
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

const RecoverPassword = () => {
    // Constants
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { info } = useParams();
    const {  checkTmp, status, error } = useSelector(state=>state.profile);
    const { userId, token } = getInfo(info);

    // States
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');

    // Functions
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);
    const handleSubmitForm = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) return;
        const data = {
            id: userId,
            tmp: token,
            password
        }
        dispatch(setNewPassword(data));
    }
    // Onload effects
    useEffect(()=>{
        if (checkTmp === false) navigate('/login');
    }, [checkTmp])

    useEffect(()=>{
        dispatch(checkToken(getInfo(info)));
    }, [dispatch]);

    useEffect(()=>{
        if (status === 'Set new password') navigate('/login');
    }, [checkTmp])

    useEffect(()=>{
        if (status === 'Set new password') navigate('/login/sign-in');
    }, [status])

    return (
        <>
        {checkTmp === true &&
        <div className={Styles.page}>
            <h1 className={Styles.title}>
                    Восстановление пароля
            </h1>
            <form
            onSubmit={handleSubmitForm}
            className={Styles.form}>
                <div className={Styles.input_list}>
                    <div className={Styles.input_holder}>
                        <label htmlFor="password">Пароль</label>
                        <Input
                        name="password"
                        value={password}
                        onChange={handlePasswordChange}
                        type="password"/>
                    </div>
                    <div className={Styles.input_holder}>
                        <label htmlFor="confirm-password">Подтвердите пароль</label>
                        <Input
                        name="confirm-password"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        type="password"/>
                    </div>
                </div>
                <Button
                    type="submit">
                    {status === 'Setting new password'
                    ? <TailSpin 
                    height={24}
                    color='white'/>
                    : "Установить пароль"}
                </Button>
            </form>
        </div>}
        </>
    )
}

export default RecoverPassword