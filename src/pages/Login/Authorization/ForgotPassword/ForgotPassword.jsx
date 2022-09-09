import React, {useState} from 'react'
import Input from '../../../../components/Input';
import styles from './forgotPassword.module.css';
import { CloseIcon } from '../../../../images/inedex';
import Button from '../../../../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { TailSpin } from 'react-loader-spinner';
import { setForgotPassword } from '../../../../api/login.api';

const ForgotPassword = ({ closeWindow }) => {
    const [email, setEmail] = useState('');
    const [isSentMessage, setIsSentMessage] = useState(false);

    const { status } = useSelector(state=>state.profile);
    const dispatch = useDispatch();

    const handleSubmitForm = (e) => {
        e.preventDefault();
        dispatch(setForgotPassword({email}));
    }
    return (
            <div className={styles.window_holder}>
                <div className={styles.window_background}>
                    {status !== "Forgot password link sent" &&
                    <form 
                    className={styles.form}
                    onSubmit={handleSubmitForm}>
                        <div className={styles.form_header}>
                            <img
                            onClick={closeWindow}
                            className={styles.close_icon}
                            src={CloseIcon}
                            alt="close"/>
                        </div>
                        <div className={styles.form_content}>
                            <h2 className={styles.form_title}>Восстановление пароля</h2>
                            <label className={styles.input_label}>Почта</label>
                            <Input 
                            type="email"
                            onChange={(e)=>setEmail(e.target.value)}
                            required={true}/>
                        </div>
                        <div className={styles.button_holder}>
                            <Button
                                type="submit"
                                projectType="forgot_password">
                                    {status === "Sending forgot link"
                                    ? <TailSpin 
                                    height={30}
                                    color='white'/>
                                    : "Продолжить"}
                            </Button>
                        </div>
                    </form>}
                    {status === "Forgot password link sent" &&
                    <>
                        <div className={styles.form_header}>
                            <img src={CloseIcon} alt="close"/>
                        </div>
                        <div className={styles.form_content}>
                            <h2 className={styles.form_title}>Восстановление пароля</h2>
                            <p className={styles.form_description}>
                                Для завершения восстановления пароля перейдите по 
                                ссылке в письме, отправленном на вашу почту <b>{email}</b>
                            </p>
                        </div>
                        <div className={styles.button_holder}>
                            <Button
                                onClick={closeWindow}
                                projectType="forgot_password">Продолжить</Button>
                        </div>
                    </>}
                </div>
            </div>
        )
}

export default ForgotPassword
