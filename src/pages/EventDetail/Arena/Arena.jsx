import React, { memo, useState } from 'react';
import styles from './style.module.css';
import Select from 'react-select';
import { Button } from '../../../components';
import { TailSpin } from 'react-loader-spinner';

const Square = ({index}) => {
  return (
    <div className={styles.sub_square_item}>
      <p className={styles.square_title}>Площадка {index}</p>
    </div>
  )
}

const arenaList = {
  'west': 'Запад',
  'east': 'Восток',
  'south': 'Юг',
  'north': 'Север',
  'south_north': 'Север-Юг',
  'west_or_east': 'Запад/Восток',
  'south_or_north': 'Восток/Юг'
}

const arenaWards = [
  {value: 'west', label: 'Запад'},
  {value: 'east', label: 'Восток'},
  {value: 'south', label: 'Юг'},
  {value: 'north', label: 'Север'},
  {value: 'south_north', label: 'Север-Юг'},
]

const getSquareOptions = (arena) => {
  let options = [
    {value: 2, label: '2'},
    {value: 4, label: '4'},
    {value: 6, label: '6'},
  ];
  if (arena === 'south_north') options.unshift({value: 1, label: '1'});
  return options;
}

const Arena = ({
  arena, 
  divs, 
  setArena, 
  setDivs, 
  role, 
  isLoading=false, 
  onSave: handleSaveApplication,
}) => {
  const onSave = () => {
    handleSaveApplication({arena, area: divs});
  }
  return (
    <>
      {
        (role === 'secretary' || role === 'admin') &&
        <div className={styles.arena_options}>
          <div className={styles.select_holder}>
            <label htmlFor="divs">Количество площадок</label>
            <Select 
              options={getSquareOptions(arena)}
              value={{value: divs, label: `${divs}`}}
              onChange={(e)=>setDivs(e.value)}
              name="divs"/>
          </div>
          <div className={styles.select_holder}>
            <label htmlFor="divs">Выберите арену</label>
            <Select 
              options={arenaWards}
              value={{value: arena, label: `${arenaList[arena]}`}}
              onChange={(e)=>setArena(e.value)}
              name="divs"/>
          </div>
          <div className={styles.button_holder}>
            <Button
              type="button"
              projectType="add_user"
              onClick={onSave}>
              {
                isLoading
                ? <TailSpin height={24} color="#fff"/>
                : "Сохранить"
              }
            </Button>
          </div>
        </div>
      }
      <div className={styles.arena_holder}>
        <div className={styles.judge_side}>
          <div className={styles.judge_place} />
          <div className={styles.judge_place} />
          <div className={styles.judge_place} />
          <div className={styles.judge_place} />
          <div className={styles.judge_place} />
          <div className={styles.judge_place} />
          <div className={styles.judge_place} />
          <div className={styles.judge_place} />
        </div>
        <div className={styles.arena_square}>
          <div className={styles.arena_wards_holder}>
            <p className={styles.arena_wards_north}>Север</p>
            <p className={styles.arena_wards_west}>Запад</p>
            <p className={styles.arena_wards_south}>Юг</p>
            <p className={styles.arena_wards_east}>Восток</p>
          </div>
          {
            arenaList[arena] === 'Север-Юг' &&
            <div className={styles.square_row}>
              {
                (new Array(divs)).fill(0).map((_, i) => (
                  <Square key={i} index={i+1}/>
                ))
              }
            </div>
          }
          {
            (arenaList[arena] === 'Запад' || arenaList[arena] === 'Восток' || arenaList[arena] === 'Запад/Восток') &&
            <div className={styles.square_row}>
              {
                (new Array(divs)).fill(0).map((_, i) => (
                  <Square key={i} index={i+1}/>
                ))
              }
            </div>
          }
          {
            (arenaList[arena] === 'Север' || arenaList[arena] === 'Юг' || arenaList[arena] === 'Север/Юг') &&
            <>
              <div className={styles.square_row}>
                {
                  (new Array(divs/2)).fill(0).map((_, i) => (
                    <Square key={i} index={i+1}/>
                  ))
                }
              </div>
              <div className={styles.square_row}>
                {
                  (new Array(divs/2)).fill(0).map((_, i) => (
                    <Square key={i} index={i*2+i}/>
                  ))
                }
              </div>
            </>
          }
        </div>
        <div className={styles.judge_side}>
          <div className={styles.judge_place} />
          <div className={styles.judge_place} />
          <div className={styles.judge_place} />
          <div className={styles.judge_place} />
          <div className={styles.judge_place} />
          <div className={styles.judge_place} />
          <div className={styles.judge_place} />
          <div className={styles.judge_place} />
        </div>
      </div>
    </>
  )
}

export default memo(Arena);