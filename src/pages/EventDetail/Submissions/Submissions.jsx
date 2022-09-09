import React from 'react';
import styles from './style.module.css';

const Submissions = ({list, handleClubItemClick, eventTitle = ''}) => {

    return (
        <div>
            <div className={styles.list_holder}>
                {list.map((item, index)=>(
                    <div 
                        key={index}
                        className={styles.list_item}
                        onClick={()=>handleClubItemClick(item.trainerId)}>
                        <div className={styles.item_color_side} />
                        <div className={styles.item_info_side}>
                            <p className={styles.item_title}>{eventTitle}</p>
                            <p key={item.id} style={{marginBottom: '20px', fontSize: 18}}>{`Клуб <<${item.club}>>`}</p>
                            <p key={item.id} className={styles.item_trainer}>Тренер: {item.trainer.split('/').join(' ')}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
};


export default Submissions
