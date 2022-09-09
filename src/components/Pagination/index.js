import style from './pagination.module.css';

const Pagination = ({max, limitPerPage=10, currentPage, onNextClick, onPrevClick, onIndexClick}) => {
    const arr = new Array(max).fill(0);



    return(
        <div className={style.pagination_container}>
            <p className={style.pagination_current_page}>Страница {currentPage} из {max}</p>
            <ul className={style.pagination_holder}>
                <li 
                    onClick={onPrevClick}
                    className={style.pagination_item}>{`<`}</li>
                {arr.map((item, index)=>(
                    <li
                    onClick={()=>onIndexClick(index+1)}
                    className={style.pagination_item + ' ' + (currentPage===index+1 && style.pagination_item_active)}
                    key={index}>{index+1}</li>
                    ))}
                <li 
                    onClick={onNextClick}
                    className={style.pagination_item}>{`>`}</li>
            </ul>
            <p className={style.pagination_current_page_hide}>Страница {currentPage} из {max}</p>
        </div>
    );
}
export default Pagination;