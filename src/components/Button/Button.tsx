import React from 'react'

export interface IProps {
    onClick: () => void,
    children: string
}

export default function Button(props: IProps) {
  return (
    <button onClick={props.onClick}>
        {props.children}
    </button>
  )
}
