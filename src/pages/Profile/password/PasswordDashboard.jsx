import React from 'react';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import { TailSpin } from 'react-loader-spinner';
import styles from './password.module.css';

const PasswordDashboard = ({
    password, setPassword,
    confirmPassword, setConfirmPassword,
    newPassword, setNewPassword,
    handleSubmitForm, status, error
}) => {
    return (
        <form
            onSubmit={handleSubmitForm} 
            className={styles.personal_dashboard}>
            <div className={styles.input_line}>
                <div className={styles.input_holder}>
                    <label htmlFor="password">Старый пароль</label>
                    <Input
                    name="password"
                    type="password"
                    placeholder="******"
                    autoComplete="on"
                    value={password}
                    onChange={setPassword}/>
                </div>
                <div className={styles.input_holder}>
                    <label htmlFor="new password">Новый пароль</label>
                    <Input
                    name="new password"
                    type="password"
                    placeholder="******"
                    autoComplete="on"
                    value={newPassword}
                    onChange={setNewPassword}/>
                </div>
            </div>
            <div className={styles.input_line}>
                <div className={styles.input_holder}>
                    <label htmlFor="confirm password">Повторите пароль</label>
                    <Input
                    name="confirm password"
                    type="password"
                    placeholder="******"
                    autoComplete="on"
                    value={confirmPassword}
                    onChange={setConfirmPassword}/>
                </div>
            </div>
            {
                status === 'Rejected update password' &&
                <p className={styles.error_message}>*Неправильный пароль</p>
            }
            <div className={styles.button_holder}>
                <div className={styles.button}>
                    <Button
                        type="submit">
                        {status === 'Updating password'
                        ? <TailSpin
                        height={24}
                        color='white'/>
                        : 'Сохранить'}
                    </Button>
                </div>
            </div>
        </form>
    )
}

export default PasswordDashboard
