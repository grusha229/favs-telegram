import React from 'react'
import style from './ErrorBlock.module.scss'

export interface IProps {
    error: string,
}

export default function ErrorBlock( props: IProps) {
  return (
    <div className={style['container']}>
      <p>{props.error}</p>
    </div>
  )
}
