// import cn from 'classnames'
import React from 'react'
import styles from './style.module.css'

const Button = ({children, type="button", projectType = 'primary', autoFocus, ...props}) => {
  return (
    <button
    type={type}
    autoFocus={autoFocus || false}
    className={styles[projectType]} 
    {...props}>
      {children}
    </button>
  )
}

export default React.memo(Button);