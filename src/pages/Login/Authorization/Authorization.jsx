import React, {  useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styles from './Authorization.module.css';
import Eye from '../icons/Eye.svg';
import EyeSlash from '../icons/EyeSlash.svg';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import ForgotPassword from './ForgotPassword/ForgotPassword';
import { useSelector, useDispatch } from 'react-redux';
import { setLogin } from '../../../api/login.api';
import { TailSpin } from 'react-loader-spinner';


const Authorization = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [isActiveForgotPassword, setIsActiveForgotPassword] = useState(false);
    const { status, error, login } = useSelector(state=>state.profile);
    const { isLogged } = login;
    useEffect(() => {
        if (isLogged) navigate('/');
        
    }, [navigate, isLogged])

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleShowPassword = () => setShowPassword(!showPassword);

    const handleCloseForgotPasswordWindow = () => setIsActiveForgotPassword(false);
    const handleOpenForgotPasswordWindow = () => setIsActiveForgotPassword(true);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        dispatch(setLogin({email, password}));
    }

    return (
        <div className={styles.holder}>
            {
                isActiveForgotPassword &&
                <ForgotPassword 
                closeWindow={handleCloseForgotPasswordWindow}/>
            }
            <h1 className={styles.title}>Добро пожаловать!</h1>
            <form
            onSubmit={handleFormSubmit} 
            className={styles.form}>
                <div className={styles.input_holder}>
                    <label 
                    className={styles.input_label}
                    htmlFor="email">Почта</label>
                    <Input 
                    type="email" 
                    name='email'
                    value={email}
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
                    required/>
                    <img 
                    onClick={handleShowPassword}
                    src={showPassword ? Eye : EyeSlash} 
                    alt="show password"
                    className={styles.password_show_button}/>
                </div>
                {error === 'Invalid login or password' &&
                <p className={styles.error_title }>*Неправильная почта или пароль</p>}
                <p
                onClick={handleOpenForgotPasswordWindow}
                className={styles.forgot_password}>Забыли пароль?</p>
                <div className={styles.button_holder}>
                    <Button
                        type='submit'>
                            {status === 'Loading'
                            ? <TailSpin 
                            height={24}
                            color='white'
                            />
                            : 'Войти' }
                    </Button>
                </div>
            </form>
            <div className={styles.bottom_side}>
                <p
                className={styles.bottom_title}>Еще нет аккаунта?</p>
                <Link 
                to="/login/sign-up"
                className={styles.secondary}>Зарегистрироваться</Link>
            </div>
        </div>
    )
}
export default Authorization