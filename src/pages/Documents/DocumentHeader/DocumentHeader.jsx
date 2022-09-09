import React from 'react';
import { Button } from '../../../components';
import styles from './style.module.css';
import {addFileIcon} from '../../../images/inedex';

const DocumentHeader = ({addFile, inputChange, role}) => {
    return (
        <div className={styles.header_holder}>
            <h2 className={styles.header_title}>Документы</h2>
            <div className={styles.button_holder}>
                {
                    (role === 'admin' || role === 'secretary') &&
                    <>
                        <Button
                            type="button"
                            onClick={addFile}>
                            <img 
                                className={styles.button_img}
                                src={addFileIcon} 
                                alt="file icon"/>
                            Добавить файлы
                        </Button>
                        <input
                            className={styles.header_input}
                            onChange={inputChange}
                            type="file"
                            accept="application/pdf"
                            multiple/>
                    </>
                }
            </div>
        </div>
    )
}

export default DocumentHeader
