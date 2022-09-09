import React from 'react';
import style from './eventHeader.module.css';
import { Button } from '../../../components/index';

const EventHeader = ({
  handleNewEvent,
  user
}) => {
  return (
    <div className={style.header_holder}>
        <h2 className={style.header_title}>Мероприятия</h2>
        <div className={style.header_button_holder}>
            {(user?.role === 'admin' || user?.role === 'secretary') &&
            <Button
                type="button"
                onClick={handleNewEvent}
                projectType='add_user'>Создать мероприятие</Button>}
        </div>
    </div>
  )
}

export default EventHeader