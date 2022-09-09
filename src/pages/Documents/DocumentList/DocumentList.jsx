import React from 'react';
import DocumentItem from '../DocumentItem/DocumentItem';
import styles from './style.module.css';

const DocumentList = ({
    Today,
    Yesterday,
    Other,
    UploadData,
    role,
    deleteItem,
}) => {
    return (
        <div className={styles.list_holder}>
            { (Today.length > 0 || UploadData.length > 0) &&
            <div className={styles.series_listlist_series}>
                <p className={styles.list_title}>Сегодня</p>
                <div className={styles.item_list}>
                    {UploadData.map((item)=><DocumentItem role={role} key={item.id} item={item}/>)}
                    {Today.map((item)=><DocumentItem role={role} key={item.id} item={item} deleteItem={deleteItem}/>)}
                </div>
            </div>}
            { Yesterday.length > 0 &&
                <div className={styles.series_listlist_series}>
                    <p className={styles.list_title}>Вчера</p>
                    <div className={styles.item_list}>
                        {Yesterday.map((item)=><DocumentItem role={role} key={item.id} item={item} deleteItem={deleteItem}/>)}
                    </div>
                </div>
            }
            { Other.length > 0 &&
            <div className={styles.series_listlist_series}>
                <p className={styles.list_title}>Ранее</p>
                <div className={styles.item_list}>
                    {Other.map((item)=><DocumentItem role={role} key={item.id} item={item} deleteItem={deleteItem}/>)}
                </div>
            </div>}
        </div>
    )
}

export default DocumentList
