import React, { useEffect, useState } from 'react';
import { Button, Input } from '../../../components/index';
import styles from './style.module.css';
import Select from 'react-select';
import { TailSpin } from 'react-loader-spinner';
import { filterApplication, validateApplication } from '../../../utils/tableValidtions';
import { useParams } from 'react-router';


const getGenderValue = (gender) => ({value: gender, label: gender === 'male' ? 'Мужской' : (gender === 'female' ? 'Женский' : '' )})

const SecretaryTable = ({list = [], eventId, status, setIsTableOpen}) => {
    const { id } = useParams();
    
    const [dataList, setDataList] = useState((list.find(i=>i.trainerId===+id)).sportsmans || []);
    const genderOptions = [
        {value: 'reset', label: 'Сбросить', name: 'gender'},
        {value: 'male', label: 'Мужской', name:'gender'}, 
        {value: 'female', label: 'Женский', name:'gender'}
    ]

    const handleInputChange = (e, i) => {
        const { value, name } = e.target;
        if (value === 'reset') {
            setDataList((prev)=>{
                const arr = JSON.parse(JSON.stringify(prev));
                arr[i][name] = '';
                localStorage.setItem('application_table', JSON.stringify({eventId, data: arr}));
                return arr;
            })
        }
        else {
            setDataList((prev)=>{
                const arr = JSON.parse(JSON.stringify(prev));
                arr[i][name] = value;
                localStorage.setItem('application_table', JSON.stringify({eventId, data: arr}));
                return arr;
            })
        }
    }

    const handleSubmitApplication = () => console.log("SEND");

    useEffect(()=>{
        setIsTableOpen(true);
        return () => setIsTableOpen(false);
    }, [])

    return (
        <>
            <div className={styles.buttons_holder}>
                <Button type="button" projectType="add_user" onClick={handleSubmitApplication}>
                    {
                        status === 'Creating application' 
                        ? <TailSpin color="#fff" height={24}/>
                        : "Отправить"
                    }
                </Button>
            </div>
            <div className={styles.table_container}>
                <table className={styles.table_holder}>
                    <thead>
                        <tr>
                            <th style={{position: 'sticky', left: '0', zIndex: 50}} rowSpan="4">ФИО</th>
                            <th rowSpan="4">Пол</th>
                            <th rowSpan="4" style={{minWidth: '100px'}}>Возраст</th>
                            <th rowSpan="4">Клуб</th>
                            <th rowSpan="2">Цюань шу</th>
                            <th rowSpan="2">Цисе</th>
                            <th rowSpan="1" colSpan="2">Тайцзи цюань</th>
                            <th rowSpan="4">Дуайлянь(фамилия партнера)</th>
                            <th rowSpan="4">Групповые выступления (номер команды)</th>
                            <th rowSpan="4">Длительность выступления</th>
                            <th rowSpan="4">Уровень</th>
                            <th rowSpan="4">Примечание</th>
                        </tr>
                        <tr>
                            <th>Цюань шу</th>
                            <th>Цисе</th>
                        </tr>
                        <tr>
                            <th rowSpan="2" style={{padding: '10px 0px'}}>Название комплекса</th>
                            <th rowSpan="2" style={{padding: '10px 0px'}}>Название комплекса</th>
                            <th rowSpan="2" style={{padding: '10px 0px'}}>Название комплекса</th>
                            <th rowSpan="2" style={{padding: '10px 0px'}}>Название комплекса</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataList.map((item, index)=>(
                            <tr key={index}>
                                <td className={styles.sticky_data}>
                                    <input type="text" name="name" value={item.name} onChange={(e)=>handleInputChange(e, index)}/>
                                </td>
                                <td className={styles.select_holder}>
                                    <Select options={genderOptions} value={getGenderValue(item.gender)} name="gender" defaultValue="" onChange={(e)=>handleInputChange({target: e}, index)}/>
                                </td>
                                <td>
                                    <input type="number" name="age" value={item.age} onChange={(e)=>handleInputChange(e, index)}/>
                                </td>
                                <td>
                                    <input type="text" name="club" value={item.club} onChange={(e)=>handleInputChange(e, index)}/>
                                </td>
                                <td>
                                    <input type="text" name="quan_shu" value={item.quan_shu} onChange={(e)=>handleInputChange(e, index)}/>
                                </td>
                                <td>
                                    <input type="text" name="cisse" value={item.cisse} onChange={(e)=>handleInputChange(e, index)}/>
                                </td>
                                <td>
                                    <input type="text" name="tai_chi_quan_shu" value={item.tai_chi_quan_shu} onChange={(e)=>handleInputChange(e, index)}/>
                                </td>
                                <td>
                                    <input type="text" name="tai_chi_quan_cisse" value={item.tai_chi_quan_cisse} onChange={(e)=>handleInputChange(e, index)}/>
                                </td>
                                <td>
                                    <input type="text" name="duilian" value={item.duilian} onChange={(e)=>handleInputChange(e, index)}/>
                                </td>
                                <td>
                                    <input type="text" name="team_number" value={item.team_number} onChange={(e)=>handleInputChange(e, index)}/>
                                </td>
                                <td>
                                    <input type="text" name="performance_duration" value={item.performance_duration} onChange={(e)=>handleInputChange(e, index)}/>
                                </td>
                                <td>
                                    <input type="text" name="level" value={item.level} onChange={(e)=>handleInputChange(e, index)}/>
                                </td>
                                <td>
                                    <input type="text" name="comment" value={item.comment} onChange={(e)=>handleInputChange(e, index)}/>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default SecretaryTable;