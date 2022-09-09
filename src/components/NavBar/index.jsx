import React, { useState } from "react";
import styles from './index.module.css'
import { NavLink } from 'react-router-dom';
import { MenuItems } from './MenuItems.js'
import { Menu, Cross } from '../../images/inedex.js';
import { useSelector } from 'react-redux'

//Headers

function NavBar() {
    const [isClicked, setClicked] = useState(false)
    const handleClick = () => {
        setClicked(!isClicked)
    }

    const { user } = useSelector(state => state.profile)

    return (
        <div>

            <div onClick={handleClick} className={styles.menuIcon}>
                {isClicked ?

                    <img src={Cross} alt='' className={styles.menu} />
                    :
                    <img src={Menu} alt='' className={styles.menu} />
                }
            </div>

            <ul className={isClicked ? styles.Navbar__active :
                styles.navbar} >

                {
                    MenuItems.map((item, index) => {
                        if (user.role === 'admin') {
                            return (
                            <NavLink 
                                key={index} 
                                className={styles.navbar__link} 
                                to={item.to}>
                                    {item.title}
                            </NavLink>)
                        }
                        if (item.title !== 'Пользователи') {
                            return (
                            <NavLink 
                                key={index} 
                                className={styles.navbar__link} 
                                to={item.to}>
                                    {item.title}
                            </NavLink>)
                        }
                        return null;
                    })
                }
            </ul >
        </div >
    )
}

export default NavBar