import React, {useEffect, useState} from 'react'
import MapService from '../../http/MapService'
import { useDispatch, useSelector } from 'react-redux'
import { IStateInterface } from '../../store/store'
import { IPlaceApiResponse } from '../../models/Places'
import styles from "./PlacePage.module.scss"
import errorImage from "../../assets/noImage.jpg";
import NavButton from '../../components/NavButton/NavButton'
// import styles from "./CityPage.module.scss"
import {useNavigate, useParams} from 'react-router-dom'
import Button from "../../components/Button/Button.tsx";
import { setCurrentPlace } from '../../store/features/Places/PlacesSlice.ts'
import {
    useBackButton,
  } from '@tma.js/sdk-react';
  

export default function PlacePage() {
    const params = useParams();
    const [error, setError] = useState<string>(null)
    const USER_TOKEN = useSelector((state: IStateInterface) => state.authentication.token)
    const USER_ID = useSelector((state: IStateInterface) => state.authentication.telegramID)
    const PLACE_ID = params?.place_id
    const [ placeData, setPlaceData ] = useState<IPlaceApiResponse>(null)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const backButton = useBackButton();


    const handleBackClick = () => {
        navigate(-1);
    };

    backButton.show()
    backButton.on('click', () => {
        handleBackClick()
    })

    useEffect(() => {
        MapService.getPlaceInfo(USER_TOKEN, USER_ID, PLACE_ID)
        .then((res) => res.data)
        .then((place) => {
            console.log(place)
            setPlaceData(place)
            dispatch(setCurrentPlace({name: place.name, id: place.id}))
        })
        .catch((e) => {
            console.error('error!', e)
            setError(`${e?.response?.status}, ${e?.response?.statusText}`)
        })
    },[USER_TOKEN, USER_ID])

    const imageSource = placeData?.photosUrl ? placeData?.photosUrl[0] : errorImage;

    const handleReportClick = () => {
        navigate(`./report-issue`);
    };


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
            <div className={styles['section']}>
                <div className={styles['section-heading']}>
                    About
                </div>
                <div className={styles['section-list']}>
                    {placeData?.description &&
                        <div className={styles['section-item']}>
                            <div className={styles['section-item--title']}>
                                Description
                            </div>
                            <div className={styles['section-item--content']}>
                                Prague is the capital and largest city of the Czech Republic, and the historical capital of Bohemia.
                            </div>
                        </div>
                    }
                    {placeData?.address &&
                        <div className={styles['section-item']}>
                            <div className={styles['section-item--title']}>
                                Address
                            </div>
                            <div className={styles['section-item--content']}>
                                {placeData?.address}
                            </div>
                        </div>
                    }
                    {placeData?.instagram &&
                        <div className={styles['section-item']}>
                            <div className={styles['section-item--title']}>
                                Instagram
                            </div>
                            <div className={styles['section-item--content']}>
                                {placeData?.instagram}
                            </div>
                        </div>
                    }
                    {placeData?.openingInfo &&
                        <div className={styles['section-item']}>
                            <div className={styles['section-item--title']}>
                                Now is OPEN
                            </div>
                            <div className={styles['section-item--content']}>
                                {placeData.openingInfo.map((day) => (
                                    <div>{day}</div>
                                ))}
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>

        <Button 
            className={styles['button']}
            onClick={handleReportClick}
        >
            Report Issue
        </Button>
        {error &&
            <div className='Card'>
                    {error}
            </div>
        }
    </div>
  )
}