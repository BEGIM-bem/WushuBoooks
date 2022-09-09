import 'chart.js/auto'
import React, { useState } from 'react';
import styles from './Statistics.module.css'
import { Tab } from './TabCss';
import { Bar, Line } from 'react-chartjs-2';
import { payload, payloadClose } from '../../images/inedex.js'
import { useDispatch, useSelector } from 'react-redux';
import { getStatistics } from '../../api/statistics';
import { useEffect } from 'react';


function Statistics() {
    const { statistics, clubs, status, errors } = useSelector(state => state.statistics)
    const dispatch = useDispatch()
    console.log('statisticsById: ', statistics)
    console.log("error: ", errors.getDataError)
    console.log("status: ", status.getDataStatus)


    const TabТame = ['Оценка показателя ОФП', 'Достижения клубов']

    const [active, setActive] = useState(TabТame[0])
    const [type, setType] = useState('Оценка показателя ОФП')
    const [isOpenSalary, setIsOpenSalary] = useState(false)

    const [dates, setDates] = useState([])

    const [selesctClubs, setSelesctClubs] = useState('')

    const togglingSalary = () => {
        setIsOpenSalary(!isOpenSalary)
    }




    function onTabClick(type) {
        setActive(type)
        if (type === 'Оценка показателя ОФП') {
            setType('Оценка показателя ОФП')
            setDates(statistics.ofpResponse)

        }
        else if (type === 'Достижения клубов') {
            setType("Достижения клубов")
            setDates(statistics.achievementResponse)

        }

    }

    console.log("type: ", type)
    console.log("data: ", dates)

    const dataOfp = {
        labels: statistics.ofpResponse?.map(item => item.year),
        datasets: [
            {
                label: statistics.ofpResponse?.length > 0 ? 'Офп' : 'Выберите клуб',
                data: statistics.ofpResponse?.map((item) => item.ofp),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }

        ],
    };


    const dataClubs = {
        labels: statistics.achievementResponse?.map(item => item.year),
        datasets: [
            {
                label: statistics.achievementResponse?.length > 0 ? 'Достижение' : 'Выберите клуб',
                data: statistics.achievementResponse?.map((item) => item.points),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    };





    const chooseClubs = (option) => {

        setSelesctClubs(option.name)

        dispatch(getStatistics(option.id))
        setIsOpenSalary(false)

    }


    return (
        <div className={styles.content} >
            <h1 className={styles.content__title}>Статистика </h1>



            <div className={styles.f} >
                <div className={styles.content__OpenIcon}
                    onClick={togglingSalary}>
                    {isOpenSalary ? <img src={payloadClose} alt='Not find ArrowDownIcon'
                        className={styles.arrow1} />
                        :
                        <img src={payload} className={styles.arrow}
                            alt='Not find ArrowTopIcon' />}
                    {<input
                        type='text'
                        placeholder='Выберите клуб...'
                        className={styles.input}
                        value={selesctClubs}
                        readOnly />}

                </div>


                {
                    isOpenSalary && (
                        <div>
                            <ul className={styles.over} >
                                {

                                    clubs.map(option => (
                                        <div key={option.id} >
                                            <li className={styles.li}
                                                onClick={() => chooseClubs(option)}  >
                                                {option.name}
                                            </li>
                                        </div>
                                    ))
                                }
                            </ul>
                        </div>
                    )}
            </div>



            <div className={styles.ButtonNavigations} >
                {TabТame.map((type, index) => (
                    <Tab key={index}
                        active={active === type} onClick={() => onTabClick(type)}>
                        {type}</Tab>
                ))}
            </div>


            <div className={styles.chart} >
                {
                    type === 'Оценка показателя ОФП' ?

                        <Bar data={dataOfp} width={1250} height={616}
                            className={styles.chart_diagram}
                            options={{ maintainAspectRatio: false }}

                        />
                        :
                        <Bar data={dataClubs} width={1250} height={616}
                            className={styles.chart_diagram}
                            options={{ maintainAspectRatio: false }}

                        />
                }
            </div>
        </div >
    )
}

export default Statistics;
