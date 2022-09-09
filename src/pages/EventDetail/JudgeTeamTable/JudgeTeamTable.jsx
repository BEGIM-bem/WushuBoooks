import React, { useState } from 'react';
import Select from 'react-select';
import styles from './style.module.css';

   

const JudgeTeamTable = ({eventId, judgeForm, handleInputChange, options=[], isAcceptedProtocol}) => {
    

    return (
        <div className={styles.table_holder}>
            <div className={styles.table_header}>
                <p>Судейская бригада</p>
            </div>
            <table>
                <thead>
                    <tr>
                        {
                            new Array(6).fill(0).map((_, i) => (
                                <th key={i}>Судья {i+1}</th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {
                            judgeForm.map((item, i) => (
                                <td key={i}>
                                    <Select options={options} value={item} onChange={(e)=>handleInputChange({target: e}, i)} isDisabled={isAcceptedProtocol()}/>
                                    {/* <input type="text" value={name} onChange={(e)=>handleInputChange(e, i)}/> */}
                                </td>
                            ))
                        }
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default JudgeTeamTable;