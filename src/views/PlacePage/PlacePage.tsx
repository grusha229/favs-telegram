import React, {useEffect, useState} from 'react'
import MapService from '../../http/MapService'
import { useSelector } from 'react-redux'
import { IStateInterface } from '../../store/store'
import { IPlaceApiResponse } from '../../models/Places'
import styles from "./PlacePage.module.scss"
import errorImage from "../../assets/noImage.jpg";
import NavButton from '../../components/NavButton/NavButton'
// import styles from "./CityPage.module.scss"
import {useNavigate, useParams} from 'react-router-dom'
import Button from "../../components/Button/Button.tsx";

export default function PlacePage() {
    const params = useParams();
    const [error, setError] = useState<string>(null)
    const USER_TOKEN = useSelector((state: IStateInterface) => state.authentication.token)
    const USER_ID = useSelector((state: IStateInterface) => state.authentication.telegramID)
    const PLACE_ID = params?.place_id
    const [ placeData, setPlaceData ] = useState<IPlaceApiResponse>(null)
    const navigate = useNavigate();

    // const region = useMemo(() => {
    //     return getDelta(coordinates?.latitude, coordinates?.longitude, 5000)
    // }, [coordinates])

    // useEffect(() => {
    //     getLocationPromise
    //         .then((position) => setCoordinates(position?.coords))
    // },[])

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
            </div>
            <Button onClick={handleReportClick}>
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