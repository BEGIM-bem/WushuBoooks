import React, { memo } from 'react';
import styles from './style.module.css';



const ProtocolTable = ({list, arena}) => {
  return (
    <div className={styles.protocol_table}>
      <table>
        <thead>
          <tr>
            <th>№</th>
            <th>ФИО участника</th>
            <th>Клуб</th>
            <th>Арена</th>
          </tr>
        </thead>
        <tbody>
          {
            list.map((item)=>(
              <tr key={item.id}>
                <td className={styles.id_td}>{item.application.id}</td>
                <td className={styles.name_td}>
                  <p>
                    {item.application.name}
                  </p>
                  <p>
                    {item.application.duilian}
                  </p>
                </td>
                <td className={styles.club_td}>{item.application.club}</td>
                <td className={styles.arena_td}>{arena}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default memo(ProtocolTable)