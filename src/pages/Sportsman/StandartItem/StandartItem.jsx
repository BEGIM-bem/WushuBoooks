import React from 'react';
import styles from './style.module.css';

const getIndicatorByPercent = (percent, i) => Math.ceil((20/100)*percent) <= i ?  '#e6e6e6' : '#3DCB6D';



const StandartItem = ({name="Ловкость", percent=34}) => {
    return (
        <div className={styles.standart_holder}>
            <p className={styles.standart_name}>{name}</p>
            <div className={styles.indicator_holder}>
                <div className={styles.indicator_item}>
                    {new Array(20).fill(0).map((_, i)=>(
                        <div key={i} className={styles.indicator_column} style={{backgroundColor: (getIndicatorByPercent(percent, i))}}/>
                    ))}
                </div>
                <p className={styles.standart_percent}>{percent}</p>
            </div>
        </div>
    )
}

export default StandartItem;