import React, { useState } from 'react';
import styles from '../../index.module.css';
import { Search, EditIconSideChatHeaders, people } from '../../../../images/inedex.js'

const DialogsHeader = ({ search, setSearch, onCreateDirect }) => {
    const [isOpenDropdown, setIsOpenDropDown] = useState(false);
    
    const handleCreateDirect = () => {
        setIsOpenDropDown(false);
        onCreateDirect();
    }

    const handleCreateGroup = () => {

    }
    return (
        <div className={styles.chat__sidebar_headers}>
            <input 
                type='text' 
                value={search}
                onChange={setSearch}
                placeholder='Поиск...'
                className={styles.chat__sidebar_headers_search} />
            <img src={Search} alt='Search Person'
                className={styles.chat__sidebar_headers_searchIcon} />
            <button 
                onClick={()=>setIsOpenDropDown(!isOpenDropdown)}
                className={styles.chat__sidebar_headers_form}>
                <img src={EditIconSideChatHeaders} alt=''
                    className={styles.chat__sidebar_headers_formIcon} />
            </button>
            {
                isOpenDropdown &&
                <div className={styles.create_lobby_dropdown}>
                    <button
                        onClick={handleCreateDirect}
                        type="button">
                        <p>Начать переписку</p>
                    </button>
                    <button
                        type="button">
                        <p>Создать группу</p>
                    </button>
                </div>
            }
        </div>
    )
}

export default DialogsHeader
