import React from 'react';
import { useSelector } from 'react-redux';
import Dashboard from './Dashboard';
import ImageHolder from './ImageHolder';
import styles from './profile.module.css';

const Profile = () => {
    const { user, status, error } = useSelector(state=>state.profile);
    return (
        <div className={styles.profile_page}>
            <ImageHolder/>
            <Dashboard
            status={status}
            error={error}
            id={user.id}
            name={user.name || ''}
            lastname={user.lastname || ''}
            phone={user.phone || ''}
            email={user.email || ''}
            country={user.country || ''}
            city={user.city || ''}
            image={user.image}/>
        </div>
    )
}

export default Profile
