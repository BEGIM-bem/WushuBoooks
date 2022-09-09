import React from 'react';
import { TailSpin } from 'react-loader-spinner';
import { Button, Input } from '../../../../components';
import { CloseIcon } from '../../../../images/inedex';
import styles from '../newUser.module.css';
import JudgeRole from './JudgeRole';
import SecretaryRole from './SecretaryRole';
import TrainerRole from './TrainerRole';







const NewUserView = ({
    status, error,
    name, setName,
    lastname, setLastname,
    email, setEmail,
    role, setRole,
    city, setCity,
    country, setCountry,
    date, setDate,
    club, setClub,
    category, setCategory,
    judgeCategory, setJudgeCategory,
    closeWindow, addUser,
    eventCount, setEventCount,
    experience, setExperience,
    appointmentDate, setAppointmentDate
}) => {
    return (
        <div 
            onClick={closeWindow}
            className={styles.form_holder}>
            <form
                onClick={(e)=>e.stopPropagation()}
                className={styles.form}
                onSubmit={addUser}>
                <div className={styles.form_header}>
                    <h2 className={styles.form_title}>
                        Добавление пользователя
                    </h2>
                    <img 
                        className={styles.close_icon}
                        src={CloseIcon}
                        onClick={closeWindow} 
                        alt="close"/>
                </div>
                <div className={styles.form_content}>
                    <div className={styles.form_role}>
                        <div className={styles.form_radio_holder}>
                            <div className={styles.radio_input_holder}>
                                <Input
                                    type="radio"
                                    projectType='radio'
                                    value="trainer"
                                    name="role"
                                    checked={role === 'trainer' ? true : false}
                                    onChange={setRole}
                                    id="role-trainer"/>
                            </div>
                            <label htmlFor="role-trainer">Тренер</label>
                        </div>
                        <div className={styles.form_radio_holder}>
                            <div className={styles.radio_input_holder}>
                                <Input
                                    type="radio"
                                    projectType='radio'
                                    value="secretary"
                                    name="role"
                                    checked={role === 'secretary' ? true : false}
                                    onChange={setRole}
                                    id="role-secretar"/>
                            </div>
                            <label htmlFor="role-secretar">Секретарь</label>
                        </div>
                        <div className={styles.form_radio_holder}>
                            <div className={styles.radio_input_holder}>
                                <Input
                                    type="radio"
                                    projectType='radio'
                                    value="judge"
                                    name="role"
                                    checked={role === 'judge' ? true : false}
                                    onChange={setRole}
                                    id="role-judge"/>
                            </div>
                            <label htmlFor="role-judge">Судья</label>
                        </div>
                    </div>
                    {role === 'trainer' &&
                    <TrainerRole 
                        name={name}
                        setName={setName}
                        lastname={lastname}
                        setLastname={setLastname}
                        city={city}
                        setCity={setCity}
                        email={email}
                        setEmail={setEmail}
                        country={country}
                        setCountry={setCountry}
                        judgeCategory={judgeCategory}
                        setJudgeCategory={setJudgeCategory}/>}

                    {role === 'secretary' &&
                    <SecretaryRole 
                        name={name}
                        setName={setName}
                        lastname={lastname}
                        setLastname={setLastname}
                        eventCount={eventCount}
                        setEventCount={setEventCount}
                        email={email}
                        setEmail={setEmail}/>}

                    {role === 'judge' &&
                    <JudgeRole
                        name={name}
                        setName={setName}
                        lastname={lastname}
                        setLastname={setLastname}
                        date={date}
                        setDate={setDate}
                        category={category}
                        setCategory={setCategory}
                        judgeCategory={judgeCategory}
                        setJudgeCategory={setJudgeCategory}
                        experience={experience}
                        setExperience={setExperience}
                        email={email}
                        setEmail={setEmail}
                        appointmentDate={appointmentDate}
                        setAppointmentDate={setAppointmentDate}/>}
                
                    </div>
                    <div className={styles.form_footer}>
                        <Button
                            type="button"
                            projectType="secondary"
                            onClick={closeWindow}>
                            Назад
                        </Button>
                        <Button
                            type="submit"
                            projectType="confirm_primary">
                            {status === 'Setting new user'
                            ? <TailSpin
                            height={24}
                            color='white'/>
                            : 'Добавить'}
                        </Button>
                </div>
            </form>
        </div>
    )
}

export default NewUserView

