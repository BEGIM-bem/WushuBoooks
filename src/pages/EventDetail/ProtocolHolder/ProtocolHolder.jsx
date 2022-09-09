import React, { useState } from 'react';
import { Button } from '../../../components';
import { Process } from '../../../images/inedex';
import Arena from '../Arena/Arena';
import JudgeTeamTable from '../JudgeTeamTable/JudgeTeamTable';
import ProtocolTable from '../ProtocolTable/ProtocolTable';
import styles from './style.module.css';

const arenaList = {
  'west': 'Запад',
  'east': 'Восток',
  'south': 'Юг',
  'north': 'Север',
  'south_north': 'Север-Юг',
  'west_or_east': 'Запад/Восток',
  'south_or_north': 'Восток/Юг'
}

const ProtocolHolder = ({list = [], role, onSave, status, judgeForm, handleInputChange, judgeList, isAcceptedProtocol}) => {
  const [ subgroupState, setSubgroupState ] = useState(0);
  const [ divs, setDivs ] = useState(list.map(i=>{
    if (!i.area) return i.arena === 'south_north' ? 1 : 2;
    return i.area;
  }));
  const [arena, setArena] = useState(list.map(i=>i.arena))

  const handleDivsChange = (value) => setDivs((prev)=>{
    const arr = JSON.parse(JSON.stringify(prev));
    arr[subgroupState] = value;
    return arr;
  });

  const handleArenaChange = (value) => setArena((prev)=> {
    if (value !== 'south_north' && divs[subgroupState] === 1) handleDivsChange(2);
    const arr = JSON.parse(JSON.stringify(prev));
    arr[subgroupState] = value;
    return arr;
  })

  const handleSave = (data) => onSave({id: list[subgroupState].id, data});
  
  return (
    <div className={styles.protocol_holder}>
      {
        role !== 'trainer' &&
        <h1 className={styles.protocol_header_title}>Протокол соревнований</h1>
      }
      <div className={styles.protocol_subgroups}>
        {list.map((item, i)=>(
          <button 
            key={i}
            className={styles.subgroup_state + ' ' + (subgroupState === i && styles.active_subgroup)}
            type="button"
            onClick={()=>setSubgroupState(i)}>{item.name}</button>
        ))}
      </div>
      <ProtocolTable list={list[subgroupState].applications} arena={arenaList[arena[subgroupState]]}/>
      {
        role === 'trainer' &&
        <JudgeTeamTable judgeForm={judgeForm} handleInputChange={handleInputChange} options={judgeList} isAcceptedProtocol={isAcceptedProtocol}/>
      }
      <Arena 
        role={role}
        isLoading={status === 'Updating protocol' ? true : false}
        arena={arena[subgroupState]} 
        divs={divs[subgroupState]} 
        setArena={handleArenaChange} 
        setDivs={handleDivsChange}
        onSave={handleSave}/>
    </div>
  )
}

export default ProtocolHolder;