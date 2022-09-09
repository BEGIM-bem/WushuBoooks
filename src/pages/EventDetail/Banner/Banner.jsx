import { memo } from 'react';
import styles from './style.module.css';

const Banner = ({
    title='Международный чемпионат по ушу среди детей',
    startDate='15.03.2022',
    endDate='16.03.2022',
    startTime='9:00',
    deadline='06.03.2022'
}) => {
    return (
        <div className={styles.banner_holder}>
            <div className={styles.banner_title}>
                <h1>{title}</h1>
            </div>
            <div className={styles.banner_info}>
                <div className={styles.info_header}>
                    <p>Дата проведения:</p>
                    <p>Время начала:</p>
                    <p>Дата окончания принятия заявок:</p>
                </div>
                <div className={styles.info_data}>
                    <p>{startDate} - {endDate}</p>
                    <p>{startTime}</p>
                    <p>{deadline}</p>
                </div>
            </div>
        </div>
    )
}

export default memo(Banner)