import React from 'react'
import styles from './Slider.module.scss'
import { v4 as uuidv4 } from 'uuid';
export interface IProps {
    children: React.ReactNode[] | React.ReactNode
}

export default function Slider(props: IProps) {
  return (
    <div className={styles['slider']}>
      {Array.isArray(props.children) && props.children.map((element) => {
        const id = uuidv4();
        return (
            <div key={id} className={styles['slider--item']}>
                {element}
            </div>
        )}
      )}
      {
        !Array.isArray(props.children) && 
          <div className={styles['slider--item']}>
            {props.children}
          </div>
      }
    </div>
  )
}
