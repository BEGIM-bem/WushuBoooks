import style from './listHeader.module.css';

const TrainerListHeader = () => {
    return (
        <div className={style.holder_list_2}>
            <div className={style.header_name}>
                <p className={style.header_title}>Название</p>
            </div>
            <div className={style.header_date}> 
                <p className={style.header_title}>Дата создания</p>
            </div>
            <div className={style.header_status}>
                <p className={style.header_title}>Статус</p>
            </div>
        </div>
    )
}

export default TrainerListHeader;