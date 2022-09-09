import React from 'react';
import styles from './style.module.css';

const Protocol = ({protocolList}) => {
    console.log(protocolList);
    return (
        <>
            <div className={styles.protocol_holder}>
                <h1 className={styles.protocol_header_title}>Протокол соревнований</h1>
            </div>
            
        </>
    )
}

export default Protocol;