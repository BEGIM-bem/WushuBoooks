import React, { useState } from 'react'
import styles from './Registration.module.css';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import { useNavigate } from 'react-router-dom';
import Eye from '../icons/Eye.svg';
import EyeSlash from '../icons/EyeSlash.svg';
import { useDispatch, useSelector } from 'react-redux';
import { setSignup } from '../../../api/login.api';
import { TailSpin } from 'react-loader-spinner';
import { isValidated, validateForm } from '../../../utils/passwordValidation';
import eachQuarterOfInterval from 'date-fns/esm/fp/eachQuarterOfInterval/index.js';
import { setError } from '../../../redux/features/counter/profileSlice';

// Validation
// const validationForm = (data) => {
//     return true;
// }

//Регистрация

function Registration() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status, error, errorType } = useSelector(state=>state.profile);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [ isSent, setIsSent ] = useState(false);

    const handleChangeName = (e) => setName(e.target.value);
    const handleChangeLastname = (e) => setLastname(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

    const handleShowPassword = () => setShowPassword(!showPassword);
    const handleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);


    const handleSigninButton = () => navigate('/login/sign-in');

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const data = {
            name: name + '/' + lastname,
            email,
            password
        };
        validateForm({
            name: name + lastname,
            email,
            password,
            confirmPassword,
        }, (text)=>dispatch(setError({error: text, errorType: 'login-validation'})));
        if (isValidated({
            name: name + lastname,
            email,
            password,
            confirmPassword,
        })) dispatch(setSignup(data));
        else return;
    }

    return (
        <div className={styles.holder}>
            <h1 className={styles.title}>Регистрация</h1>
            {status !== "Signup link sent" &&
            <>
                <form
                onSubmit={handleFormSubmit} 
                className={styles.form}>
                <div className={styles.input_list_holder}>
                    <div className={styles.input_holder}>
                        <label 
                        className={styles.input_label}
                        htmlFor="name">Имя</label>
                        <Input 
                            type="text" 
                            name='name'
                            onChange={handleChangeName}
                            required/>
                    </div>
                    <div className={styles.input_holder}>
                        <label 
                            className={styles.input_label}
                            htmlFor="lastname">Фамилия</label>
                        <Input 
                            type="text" 
                            name='lastname'
                            onChange={handleChangeLastname}
                            required/>
                    </div>
                    <div className={styles.input_holder}>
                        <label 
                            className={styles.input_label}
                            htmlFor="email">Почта</label>
                        <Input 
                            type="email" 
                            name='email' 
                            onChange={handleEmailChange}
                            required/>
                    </div>
                    <div className={styles.input_holder}>
                        <label 
                            className={styles.input_label}
                            htmlFor="password">Пароль</label>
                        <Input 
                            type={showPassword ? 'text' : 'password'} 
                            name='password' 
                            value={password}
                            onChange={handlePasswordChange}
                            required={true}/>
                        <img 
                            onClick={handleShowPassword}
                            src={showPassword ? Eye : EyeSlash} 
                            alt="show password"
                            className={styles.password_show_button}/>
                    </div>
                    <div className={styles.input_holder}>
                        <label 
                            className={styles.input_label}
                            htmlFor="confirm password">Повторить пароль</label>
                        <Input 
                            type={showConfirmPassword ? 'text' : 'password'} 
                            name='confirm password' 
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            required/>
                        <img 
                        onClick={handleShowConfirmPassword}
                        src={showConfirmPassword ? Eye : EyeSlash}
                        alt="show password"
                        className={styles.password_show_button}/>
                    </div>
                </div>
                {error &&
                <p className={styles.error_message}>*{error}</p>}
                <div className={styles.button_holder}>
                    <Button
                    type='submit'>
                        {status === "Sending signup link"
                        ? <TailSpin 
                        height={24}
                        color='white'/>
                        : 'Зарегистрироваться'}
                    </Button>
                </div>
            </form>
            <div className={styles.bottom_side}>
                <p
                className={styles.bottom_title}>Уже есть аккаунт?</p>
                <Button 
                onClick={handleSigninButton}
                projectType='secondary'>Войти</Button>
            </div>
            </>}
            {status === "Signup link sent" &&
                <div className={styles.sent_message_holder}>
                    <p className={styles.sent_message}>Для завершения регистрации перейдите по ссылке в письме, отправленном на вашу почту <b>{email}</b></p>
                </div>}
        </div>
    )
}

export default Registration;