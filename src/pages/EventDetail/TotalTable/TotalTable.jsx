import React from 'react';
import styles from './style.module.css';

const list = [
    {id: 0, name: 'Марлен/Каландаро', club: 'Кошка', total: '', }
]

const TotalTable = () => {
    return (
        <div>
            <h1 style={{margin: '40px 0'}}>Итоговый протокол</h1>
            <div className={styles.table_holder}>
                <table>
                    <thead>
                        <tr>
                            <th style={{width: 75}}>№</th>
                            <th style={{width: 300}}>ФИО участника</th>
                            <th style={{width: 200}}>Клуб</th>
                            <th style={{width: 120}}>Итоговая оценка</th>
                            <th style={{width: 100}}>Место</th>
                            <th style={{width: 150}}>Оценка судьи 1</th>
                            <th style={{width: 150}}>Оценка ст. судьи</th>
                            <th style={{width: 150}}>Оценка судьи 2</th>
                            <th style={{width: 150}}>По формуле</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            list.map((item, i) => (
                                <tr>
                                    <td style={{textAlign: 'center'}}>{item.id}</td>
                                    <td>{item.name.split('/').join(' ')}</td>
                                    <td>{item.club}</td>
                                    <td>{item.total}</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TotalTable;