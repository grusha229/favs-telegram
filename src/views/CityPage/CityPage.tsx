import React, { useEffect, useMemo, useState } from 'react'
import { getDelta, getLocationPromise } from '../../utils/location'
import MapService from '../../http/MapService'
import { useSelector } from 'react-redux'
import { IStateInterface } from '../../store/store'
import { IPlaceApiResponse } from '../../models/Places'
import PlaceItem, { PlaceItemSkeleton } from '../../components/PlaceItem/PlaceItem'
import Slider from '../../components/Slider/Slider'
import { useNavigate } from 'react-router-dom'
import AddNewPlaceButton from "../../components/AddNewPlaceButton/AddNewPlaceButton.tsx";
import styles from './CityPage.module.scss'
import ErrorBlock from '../../components/ErrorBlock/ErrorBlock.tsx'
import Button from '../../components/Button/Button.tsx'
import { useBackButton } from '@tma.js/sdk-react'

export default function CityPage() {
    // console.log('user ',window.navigator?.userAgentData?.platform);
    const [coordinates, setCoordinates] = useState<Partial<GeolocationCoordinates>>(null)
    const [error, setError] = useState(null)
    const [places, setPlaces] = useState<IPlaceApiResponse[]>([])
    const [isLoading, setIsLoading] = useState(false);
    const USER_TOKEN = useSelector((state: IStateInterface) => state.authentication.token)
    const USER_ID = useSelector((state: IStateInterface) => state.authentication.telegramID)

    const backButton = useBackButton();

    backButton.hide();

    const navigate = useNavigate();
    const handleAddNewPlace = () => {
        console.log('Add new place button clicked');
        navigate('../add-place')
    };

    const region = useMemo(() => {
        return getDelta(coordinates?.latitude, coordinates?.longitude, 5000)
    }, [coordinates])

    useEffect(() => {
        getLocationPromise
            .then((position) => setCoordinates(position?.coords))
    },[])

    useEffect(() => {
        setIsLoading(true);
        region.latitudeDelta && region.longitudeDelta &&
            MapService.getPlacesWithTelegram(USER_TOKEN, USER_ID, region)
            .then((res) => res.data)
            .then((places) => {
                setPlaces(places)
                setError(null)
            })
            .catch((e) => {
                console.error('error!', e)
                setError(e)
            })
            .finally(() => {
                setIsLoading(false);
            })
    },[USER_TOKEN, USER_ID, region])

    return (
        <div className={styles['container']}>
            <h1>Laptop friendly places</h1>
            <div>
                <div
                    className={styles['slider-header']}
                >
                    <div className={styles['heading']}>near you</div>
                    <Button
                        type="plain"
                        onClick={() => console.log('')}
                        disabled={error}
                    >
                        See all
                    </Button>
                </div>
                {isLoading && 
                    <Slider>
                        <PlaceItemSkeleton/>
                    </Slider>
                }
                {!isLoading && !error &&
                        <Slider>
                            {places?.map((place) => (
                                <PlaceItem
                                    imgSrc={place.imagePreview}
                                    key={place.id}
                                    name={place.name}
                                    id={place.id}
                                    type={place.category}
                                    address={place.address}
                                />
                            ))}
                        </Slider>
                }
                {!isLoading && error &&
                        <div className={styles['error-container']}>
                            <ErrorBlock error="There is something wrong :("/>
                        </div>
                }
            </div>
            <div className={styles['bottom-button']}>
                <AddNewPlaceButton onClick={handleAddNewPlace}/>
            </div>
            {/* <div className='Container'>
                {error &&
                    <div className='Card'>
                        {error.response.status + ' ошибка, сверху тестовые данные (для отладки)'}
                    </div>
                }
            </div> */}
      </div>
  )
}
