import React from 'react'
import styles from './Slider.module.scss'
import { v4 as uuidv4 } from 'uuid';
export interface IProps {
    children: React.ReactNode[]
}

export default function Slider(props: IProps) {
  return (
    <div className={styles['slider']}>
      {props.children.map((element) => {
        const id = uuidv4();
        return (
            <div key={id} className={styles['slider--item']}>
                {element}
            </div>
        )}
      )}
    </div>
  )
}
