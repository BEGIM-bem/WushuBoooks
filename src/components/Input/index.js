
import React from 'react'
import styles from './style.module.css'

const Input = ({ children, placeholder = "", type = "text", projectType = 'input', ...props }) => {
  return (
    <input
      type={type}
      className={styles[projectType]}
      placeholder={placeholder}
      {...props}>
      {children}
    </input>
  )
}

export default Input;