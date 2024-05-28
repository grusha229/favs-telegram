import React from 'react'
import style from './NavButton.module.scss'
import websiteIcon from '../../assets/globe-icon.svg';
import directionIcon from '../../assets/forward-icon.svg';
import linkIcon from '../../assets/leave-icon.svg'
import { Link } from 'react-router-dom';

export type TNavButtonType = 'website' | 'direction' | 'link'

export interface IProps {
    type: TNavButtonType
    link: string
}

export default function NavButton(props: IProps) {
    const { type , link } = props;

    const getIconSrc = () => {
        switch (type) {
            case 'direction':
            return directionIcon;

            case 'website':
            return websiteIcon;

            case 'link':
            return linkIcon;
        }
    }


    const getText = () => {
        switch (type) {
            case 'direction':
            return 'Get directions';

            case 'website':
            return 'Website';

            case 'link':
            return 'Share';
        }
    }

    return (
        <Link to={link} className={style['button']}>
            <div className={style['button-container']}>
                <div className={style['icon-container']}>
                    <img src={getIconSrc()} />
                </div>
                <div className={style['text']}>
                    {getText()}
                </div>
            </div>
        </Link>
    )
}
