import React from 'react'
import styles from './Slider.module.scss'

export interface IProps {
    children: React.ReactNode[]
}

export default function Slider(props: IProps) {
    console.log(props.children);
  return (
    <div className={styles['slider']}>
      {props.children.map((element) => (
        <div className={styles['slider--item']}>
            {element}
        </div>
      ))}
    </div>
  )
}
