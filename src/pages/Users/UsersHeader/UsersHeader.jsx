import React from 'react';
import styles from './header.module.css';
import { Input } from '../../../components/index';

const UsersHeader = ({search, setSearch}) => {
    return (
        <div className={styles.header_holder}>
            <div className={styles.header_inner}>
                <h1 className={styles.header_title}>Пользователи</h1>
                <div className={styles.input_holder}>
                    <Input
                    value={search}
                    onChange={setSearch}
                    projectType={`search`}
                    placeholder="Поиск..."/>
                </div>
            </div>
        </div>
    )
}

export default UsersHeader
