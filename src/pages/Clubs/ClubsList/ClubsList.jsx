import { Star } from '@skbkontur/react-icons';
import React from 'react';
import Pagination from '../../../components/Pagination';
import styles from './style.module.css';

const getColor = (color) => {
    let newColor = color;
    while(newColor.length < 6) {
        newColor = newColor + '9';
    }
    return newColor;
}

const ClubItem = ({item, clubClick}) => {
    const handleClick = () => clubClick(item.id);
    const color = item.options.length < 6 ? getColor(item.options) : item.options;
    return (
        <div className={styles.item_holder} onClick={handleClick}>
            <div style={{background: `#${color}`}} className={styles.item_color}/>
            <div className={styles.item_content}>
                <p className={styles.item_title}>{`Клуб <<${item.name}>>`}</p>
                {item.trainers?.map((item, i)=>(<p key={item.id} className={styles.item_trainer}>Тренер: {item.name.split('/').join(' ')}</p>))}
                
            </div>
        </div>
    )
}

const ClubsList = ({ clubs, clubClick, maxPage, prev, next, jump, perPage, currentPage }) => {
    return (
        <>
            <div className={styles.list_holder}>
                {clubs().map((item, index) => (
                    <ClubItem clubClick={clubClick} key={item.id} item={item} />
                ))}
            </div>
            <div style={{ width: '96%', margin: 'auto' }}>
                {
                    maxPage > 1 &&
                    <Pagination
                        currentPage={currentPage}
                        limitPerPage={perPage}
                        onIndexClick={jump}
                        onNextClick={next}
                        onPrevClick={prev}
                        max={maxPage} />
                }
            </div>
      
        </>
    )
}

export default ClubsList;