import React from 'react';
import { Checkbox } from '../../../components';
import style from './listHeader.module.css';


const SecretaryListHeader = ({isSelectedAll, onSelectAll}) => {
  return (
    <div className={style.holder_list}>
        <div className={style.header_checkbox}>
            <div className={style.checkbox_holder}>
                <Checkbox
                    onSelectAll={onSelectAll}
                    checked={isSelectedAll()}
                    mode="select all"/>
            </div>
        </div>
        <div className={style.header_name}>
            <p className={style.header_title}>Название</p>
        </div>
        <div className={style.header_date}> 
            <p className={style.header_title}>Дата создания</p>
        </div>
        <div className={style.header_status}>
            <p className={style.header_title}>Статус</p>
        </div>
        <div className={style.header_options}></div>
    </div>
  )
}
export default SecretaryListHeader;