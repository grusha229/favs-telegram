import React, { useEffect, useState } from 'react'
import MapService from '../../http/MapService'
import { useSelector } from 'react-redux'
import { IStateInterface } from '../../store/store'
import { IPlaceApiResponse } from '../../models/Places'
import styles from "./PlacePage.module.scss"
import { useParams } from 'react-router-dom'
import errorImage from "../../assets/noImage.jpg";
import NavButton from '../../components/NavButton/NavButton'

export default function PlacePage() {
    const params = useParams();
    const [error, setError] = useState<string>(null)
    const USER_TOKEN = useSelector((state: IStateInterface) => state.authentication.token)
    const USER_ID = useSelector((state: IStateInterface) => state.authentication.telegramID)
    const PLACE_ID = params?.place_id
    const [ placeData, setPlaceData ] = useState<IPlaceApiResponse>(null)

    useEffect(() => {
        MapService.getPlaceInfo(USER_TOKEN, USER_ID, PLACE_ID)
        .then((res) => res.data)
        .then((places) => {
            console.log(places)
            setPlaceData(places)
        })
        .catch((e) => {
            console.error('error!', e)
            setError(`${e?.response?.status}, ${e?.response?.statusText}`)
        })
    },[USER_TOKEN, USER_ID])

    const imageSource = placeData?.photosUrl ? placeData?.photosUrl[0] : errorImage;

  return (
    <div>
            <div className={styles['image-container']}>
                <img 
                    className={styles['image']}
                    src={imageSource}
                    alt=''
                />
            </div>
            <div className={styles['container']}>
                <div className={styles['heading']}>
                    <div className={styles['heading-name']}>{placeData?.name}</div>
                    <div className={styles['heading-address']}>{placeData?.address}</div>
                </div>
                {placeData?.website &&
                    <div className={styles['nav-buttons']}>
                        {placeData?.website && 
                            <NavButton
                                type="website"
                                link={placeData?.website}
                            />
                        }
                    </div>
                }
            </div>
            {error && 
                <div className='Card'>
                        {error}
                </div>
            }
            
    </div>
  )
}