import React from 'react';
import styles from './style.module.css';

const getColor = (color) => {
    let newColor = color;
    while(newColor.length < 6) {
        newColor = newColor + '9';
    }
    return newColor;
}

const Banner = ({club}) => {
    const { name, trainers, options } = club;
    const color = options.length < 6 ? getColor(options) : options;
    return (
        <div 
            style={{backgroundColor: (options ? `#${color}` : '#F46767')}}
            className={styles.banner_holder}>
            <h1 className={styles.title}>Клуб {`<<${name}>>`}</h1>
            <p className={styles.subtitle}>Тренеры</p>
            {trainers?.map((item) => (
                <p className={styles.subtitle} key={item.id}>{item.name.split('/').join(' ')}</p>
            ))}
        </div>
    )
}

export default React.memo(Banner);