import React from 'react'
import styles from './Button.module.scss'

export type TButtonType = 'primary' | 'secondary' | 'plain'

export interface IProps {
    onClick: (any) => void;
    children: string;
    /**
     * 'primary' | 'secondary' | 'plain'
     */
    type?: TButtonType;
    disabled?: boolean;
    /**
     * Button size 100% of container
     */
    block?: boolean;
    className?: string;
}

export default function Button(props: IProps) {
  const {onClick, children, type = 'primary', disabled, block, className} = props
  return (
    <button 
      onClick={onClick}
      className={[
        styles['button-container'],
        styles[`button-${type}`],
        disabled && styles['disabled'],
        block && styles['block'],
        className && className
        ].join(' ')
      }
    >
        {children}
    </button>
  )
}
