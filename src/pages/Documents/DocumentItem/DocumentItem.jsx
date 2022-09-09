import { Trash } from '@skbkontur/react-icons';
import React, { useState } from 'react';
import { PdfIcon } from '../../../images/inedex';
import styles from './style.module.css';

const DocumentItem = ({item, deleteItem, role}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isHoveredTrash, setIsHoveredTrash] = useState(false);

    const onMouse = () => deleteItem && setIsHovered(true);
    const outMouse = () => deleteItem && setIsHovered(false);
    const onMouseTrash = () => setIsHoveredTrash(true);
    const outMouseTrash = () => setIsHoveredTrash(false);

    const handleDeleteItem = (e) => {
        e.stopPropogation();
        deleteItem(item.id);
    }

    return (
        <a 
            style={{textDecoration: 'none'}}
            href={item.docs}
            target="_blank"
            className={styles.item_holder}
            onMouseEnter={onMouse}
            onMouseLeave={outMouse}>
            {/* {isHovered && <img src={Trash}/>} */}
            {
                (role === 'admin' || role === 'secretary') &&
                <>
                {isHovered && 
                    <Trash
                        onClick={handleDeleteItem}
                        onMouseEnter={onMouseTrash}
                        onMouseLeave={outMouseTrash}
                        name="trash" 
                        color={!isHoveredTrash ? "#6F6F6F" : "red"}
                        className={styles.trash_icon}/>}
                </>
            }
            <img src={PdfIcon} className={styles.pdf_icon}/>
            <p className={styles.item_title}>{item.docsKey.split('.')[0]}</p>
            <p className={styles.item_size}>{item.size}</p>
            {
                item.percent !== undefined &&
                <div 
                    className={styles.item_progress_bar_holder}>
                        <div 
                            style={{width: item.percent + '%'}}
                            className={styles.item_progress_bar} />
                </div>
            }
        </a>
    )
}

export default DocumentItem;