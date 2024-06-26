import React from 'react'
import errorImage from "../../assets/noImage.jpg";
import { Link } from 'react-router-dom';
import styles from './PlaceItem.module.scss'
import { Spinner } from '@telegram-apps/telegram-ui';

export interface IProps {
    name: string,
    type?: string,
    address: string,
    id: string,
    imgSrc?: string,
    className?: string
}

export default function PlaceItem(props: IProps) {
    const {name, type, address, id, imgSrc} = props;
    const imageSource = imgSrc ? imgSrc : errorImage;
    const basePathname = import.meta.env.BASE_URL

  return (
    <Link to={`${basePathname}place/${id}`} className={[styles['card'], props?.className].join(' ')}>
        <div className={styles['card-container']}>
            <div className={styles['image-container']}>
                <img 
                    className={styles['image']}
                    src={imageSource}
                    alt=''
                />
            </div>
            <div className={styles['text-container']}>
                <div className={styles['name']}>{name}</div>
                {type &&
                    <div className={styles['type']}>{type}</div>
                }
                <div className={styles['address']}>{address}</div>
            </div>
        </div>
    </Link>
  )
}

export function PlaceItemSkeleton () {
    return(
        <div className={styles['card--skeleton']}>
            <div className={styles['card-container']}>
                <div className={styles['image-container--skeleton']}>
                    <Spinner size='m'/>
                </div>
                <div className={styles['text-container--skeleton']}/>
            </div>
        </div>
    )
};