import React, { useEffect, useState } from 'react'
// import { useDispatch } from 'react-redux'
import NewUserView from './View/NewUserView';

const NewUser = ({closeWindow, submitForm, status}) => {
    // Constats
    // const dispatch = useDispatch();

    // States
    const [role, setRole] = useState('trainer');
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [club, setClub] = useState('');
    const [category, setCategory] = useState('');
    const [judgeCategory, setJudgeCategory] = useState('');
    const [email, setEmail] = useState('');
    const [appointmentDate, setAppointmentDate] = useState('');
    const [eventCount, setEventCount] = useState('');
    const [experience, setExperience] = useState('');

    // Functions
    const handleRoleChange = (e) => setRole(e.target.value);
    const handleNameChange = (e) => setName(e.target.value);
    const handleCountryChange = (e) => setCountry(e.target.value);
    const handelCityChange = (e) => setCity(e.target.value);
    const handleLastnameChange = (e) => setLastname(e.target.value);
    const handleClubChange = (e) => setClub(e.target.value);
    const handleCategoryChange = (e) => setCategory(e.target.value);
    const handleJudgeCategoryChange = (e) => setJudgeCategory(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handleAppointmentDateChange = (e) => setAppointmentDate(e.target.value);
    const handleExperienceChange = (e) => setExperience(e.target.value);
    
    const valid = (e) => e ? e : null;
    const isNumber = (e) => +e || null;

    const handleSubmitForm = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const submitName = name+'/'+lastname;
        const data = {};
        data['name'] = submitName;
        data['role'] = role;
        data['email'] = email;
        data['category'] = valid(category);
        data['experience'] = isNumber(experience);
        data['country'] = valid(country);
        data['city'] = valid(city);
        data['rank'] = valid(category);
        submitForm(data);
        console.log('Email', email);
        console.log(data);
    }
    
    

    // Onload
    useEffect(()=>{
        document.body.style.overflow = 'hidden';
        return ()=>document.body.style.overflow = 'auto';
    }, [])


    return (
        <NewUserView 
        status={status}
        role={role}
        name={name}
        lastname={lastname}
        country={country}
        city={city}
        club={club}
        category={category}
        judgeCategory={judgeCategory}
        email={email}
        experience={experience}
        appointmentDate={appointmentDate}
        setRole={handleRoleChange}
        setName={handleNameChange}
        setLastname={handleLastnameChange}
        setCountry={handleCountryChange}
        setCity={handelCityChange}
        setClub={handleClubChange}
        setCategory={handleCategoryChange}
        setJudgeCategory={handleJudgeCategoryChange}
        setExperience={handleExperienceChange}
        setEmail={handleEmailChange}
        setAppointmentDate={handleAppointmentDateChange}
        addUser={handleSubmitForm}
        closeWindow={closeWindow}/>
    )
}
export default NewUser
