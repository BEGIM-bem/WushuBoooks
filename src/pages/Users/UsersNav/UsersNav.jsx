import React from 'react';
import { ROLES_FILTER } from '../../../const/user_roles';
import styles from './nav.module.css';
import { Button } from '../../../components/index';

const UsersNav = ({roleFilter, setRoleFilter, handleNewUserButton}) => {
    return (
        <div className={styles.nav_holder}>
            <div className={styles.nav_inner}>
                <div className={styles.nav_items_holder}>
                    {ROLES_FILTER.map((item, index)=>(
                        <button
                        key={index}
                        onClick={(e)=>{
                            e.preventDefault();
                            setRoleFilter(index)}
                        }
                        href="#"
                        className={styles.nav_item + ' ' + (roleFilter===index && styles.active_nav_item)}>{item}</button>
                    ))}
                </div>
                <div className={styles.add_user_button}>
                    <Button
                    onClick={handleNewUserButton}
                    projectType="add_user"
                    type="button">Добавить пользователя</Button>
                </div>
            </div>
        </div>
    )
}

export default UsersNav
