import React from 'react';
import { Selected } from '../../images/inedex';
import styles from './checkbox.module.css';


const Checkbox = ({
    checked=false, 
    mode="select item",
    usersList,
    item,
    onSelectItem,
    onSelectAll,
    ...props
}) => {

    return (
        <div
        onClick={mode==='select item' ? onSelectItem : onSelectAll}
        className={(checked && styles.active_holder) + ' ' + styles.holder}>
            <input
                readOnly
                type="checkbox"
                checked={checked}
                {...props}/>
            {checked &&
            <img 
                src={Selected}
                alt="checked"/>}
        </div>
    )
}

export default Checkbox;
