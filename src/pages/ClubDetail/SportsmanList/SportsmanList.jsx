import React from 'react';
import { Checkbox } from '../../../components';
import Pagination from '../../../components/Pagination';
import styles from './style.module.css';

const SportsmanList = ({
    list, 
    isSelectedItem, 
    isSelectedAll,
    onSelectItem,
    onSelectAll,
    onItemClick,
    jump,
    next, 
    prev,
    currentPage,
    maxPage
}) => {

    return (
        <div className={styles.table_holder}>
            <table>
                <thead>
                    <tr>
                        <th className={styles.row_stick}/>
                        <th className={styles.table_checkbox}>
                            <div className={styles.checkbox_holder}>
                                <Checkbox 
                                    mode="select all"
                                    checked={isSelectedAll()}
                                    onSelectAll={onSelectAll}/>
                            </div>
                        </th>
                        <th className={styles.table_id}>ID</th>
                        <th className={styles.table_name}>ФИО</th>
                        <th className={styles.table_rank}>Спортивный разряд</th>
                        <th className={styles.table_ofp}>Средний бал ОФП</th>
                        <th className={styles.table_actions}>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((item)=>(
                        <tr 
                            key={item.id} 
                            onClick={()=>onItemClick(item.id)}
                            className={isSelectedItem(item.id)===-1 ? '' : styles.selected_item}>
                                <td className={isSelectedItem(item.id)===-1 ? '' : styles.selected_stick}/>
                                <td>
                                    <div className={styles.checkbox_holder}>
                                        <Checkbox 
                                            onSelectItem={(e) => {
                                                e.stopPropagation();
                                                onSelectItem(item.id);
                                            }}
                                            checked={isSelectedItem(item.id) === -1 ? false : true}/>
                                    </div>
                                </td>
                                <td>{item.id}</td>
                                <td>{item.name.split('/').join(' ')}</td>
                                <td>{item.rank}</td>
                                <td>{item.ofp}</td>
                                <td></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {
                maxPage > 1 &&
                <div className={styles.pagination_holder}>    
                    <Pagination 
                        max={maxPage}
                        onIndexClick={jump}
                        onNextClick={next}
                        onPrevClick={prev}
                        currentPage={currentPage}
                        limitPerPage={10}/>
                </div>
            }
        </div>
    )
}

export default SportsmanList;