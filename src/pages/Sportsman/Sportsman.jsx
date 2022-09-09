import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getSportsmanById } from '../../api/club.api';
import styles from './style.module.css';
import { Tab } from '../Statistics/TabCss.js'
import { Bar, Line } from 'react-chartjs-2';
import 'chart.js/auto'
import zoom from 'chartjs-plugin-zoom';
import { getGenerateAthlete, getGenerateOfp } from '../../api/statistics';
import { Oval, Circles } from 'react-loader-spinner'
import StandartItem from './StandartItem/StandartItem';
import Button from '../../components/Button/index';
import NewStandart from './NewStandart/NewStandart';
import { addStandard, getSportsmanStandards } from '../../api/sportsman';


const Sportsman = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    //state
    const { currentSportsman } = useSelector(state => state.clubs);
    const { ofpById, athleteById, status } = useSelector(state => state.statistics)
    const { achievements, status: sportsmanStatus, standards } = useSelector(state => state.sportsman);
    const [ isEdit, setIsEdit] = useState(false);
    const [isOpenNewStandart, setIsOpenNewStandart] = useState(false);

    const TabName = ['Оценка показателя ОФП', 'Достижения спортсмена']

    // useState
    const [type, setType] = useState('Оценка показателя ОФП')
    const [active, setActive] = useState(TabName[0])

    const handleEditChange = () => setIsEdit(true);

    const handleStopEdit = () => setIsEdit(false);

    const handleAddStandart = () => {
        setIsOpenNewStandart(true);
    }
    const handleCloseModal = () => setIsOpenNewStandart(false);

    const handleSubmitNewStandart = (data) => dispatch(addStandard({sportsman: +id, standards: data})).unwrap().then((res)=>console.log(res));


    //useEffect
    useEffect(() => {
        dispatch(getSportsmanById(id));
        dispatch(getGenerateOfp(id))
        dispatch(getGenerateAthlete(id))
        dispatch(getSportsmanStandards(id));
    }, [])


    // data for diagram
    const dataOfp = {
        labels: ofpById.map(item => item.year),
        datasets: [
            {
                label: status.getOfpByIdStatus === 'Rejected get ofp' ? 'Нету ОФП' : 'ОФП',
                data: ofpById.map((item) => item.ofp),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }

        ],
    };

    // data for diagram
    const dataAthlete = {
        labels: athleteById.map(item => item.year),
        datasets: [
            {
                label: status.getAthleteByIdStatus === 'Rejected get athlete' ? "Нету достижение" : 'Достижения',
                data: athleteById.map((item) => item.points),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }

        ],
    };
    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,

            },
            zoom: { // This should be zoom not plugins
                pan: {
                    enabled: true,
                    mode: 'x',
                },
                limits: {
                    x: { min: 5, max: 7 },
                },
                zoom: {
                    pan: {
                        enabled: true,
                    },
                },
            },
        },
    };
    function onTabClick(type) {
        setActive(type)
        if (type === 'Оценка показателя ОФП') {
            setType('Оценка показателя ОФП')
        }
        else if (type === 'Достижения спортсмена') {
            setType('Достижения спортсмена')
        }
    }
    return (
        <>
            {
                isOpenNewStandart &&
                <NewStandart closeModal={handleCloseModal} onSubmit={handleSubmitNewStandart}/>
            }
            {
                currentSportsman ?
                    <div >
                        <div className={styles.page_holder}>
                            <div className={styles.personal_info}>
                                <h1 className={styles.header_title}>Личная информация</h1>
                                <div className={styles.card + ' ' +styles.profile_card}>
                                    <p className={styles.card_title}>{currentSportsman.name.split('/').join(' ')}</p>
                                    <p className={styles.card_club_title}>Клуб {`<<${currentSportsman.club.name}>>`}</p>
                                    {
                                        isEdit ?
                                        <div className={styles.edit_button_holder}>
                                            <Button
                                                type="button"
                                                onClick={handleAddStandart}
                                                projectType="add_user">Добавить норматив</Button>
                                        </div>
                                        :
                                        <>
                                            <div className={styles.card_standart_holder}>
                                                {
                                                    standards.map((item) => (
                                                        <StandartItem key={item.id} name={item.type} percent={item.grade < 10 ? item.grade * 10 : Math.ceil(item.grade)}/>
                                                    ))
                                                }
                                                
                                            </div>
                                            <div className={styles.on_edit_button_holder}>
                                                <button
                                                    onClick={handleEditChange}
                                                    className={styles.on_edit_button}>
                                                        Редактировать
                                                </button>
                                            </div>
                                        </>

                                    }
                                </div>
                                <div className={styles.card}>
                                    <div className={styles.line_holder}>
                                        <p className={styles.left_side}>{currentSportsman.duan ? "Дуань" : "Дзи"}</p>
                                        <p className={styles.right_side}>{currentSportsman.duan ? currentSportsman.duan : (currentSportsman.dzi ? currentSportsman.dzi : 0)}</p>
                                    </div>
                                    <div className={styles.line_holder}>
                                        <p className={styles.left_side}>Справка о физическом состоянии</p>
                                        <p className={styles.right_side}>
                                            <a href={currentSportsman.reference} target="_black">{currentSportsman.referenceKey}</a>
                                        </p>
                                    </div>
                                    <div className={styles.line_holder}>
                                        <p className={styles.left_side}>Спортивный разряд</p>
                                        <p className={styles.right_side}>{currentSportsman.rank}</p>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.achievement}>
                                <h1 className={styles.header_title}>Достижения</h1>
                                <div className={styles.card}>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th style={{width: '25%'}}>Достижение спортсмена</th>
                                                <th style={{width: '15%'}}>Ранг</th>
                                                <th style={{width: '15%'}}>Возраст</th>
                                                <th style={{width: '20%'}}>Категория</th>
                                                <th style={{width: '20%'}}>Призовое место</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                achievements.map((item)=>(
                                                    <tr key={item.id}>
                                                        <td>{item.championship}</td>
                                                        <td>{item.rank}</td>
                                                        <td>{item.sportsman.age}</td>
                                                        <td>{item.place}</td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </div>

                        <div className={styles.statistist}>

                            <h1 className={styles.statistist__title}>Статистика спортсмена </h1>

                            <div className={styles.ButtonNavigations} >
                                {TabName.map((type, index) => (
                                    <Tab key={index}
                                        active={active === type}
                                        onClick={() => onTabClick(type)} >
                                        {type}
                                    </Tab>
                                ))}
                            </div>
                            <div className={styles.statistics__diagram}>
                                {
                                    type === 'Оценка показателя ОФП' ?
                                        <Bar
                                            data={dataOfp}
                                            options={options} />
                                        :
                                        <Bar
                                            data={dataAthlete}
                                            options={options} />
                                }
                            </div>
                        </div>
                    </div >




                    :
                    <div className={styles.spinner} >
                        <Oval
                            ariaLabel="loading-indicator"
                            height={100}
                            width={100}
                            strokeWidth={5}
                            strokeWidthSecondary={3}
                            color="lightblue"
                            secondaryColor="white"

                        />
                    </div>

            }

        </>
    )
}

export default Sportsman;