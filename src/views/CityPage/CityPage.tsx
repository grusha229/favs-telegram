import React, { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react'
import { calculateDeltas, getLocationPromise } from '../../utils/location'
import MapService from '../../http/MapService'
import { useSelector } from 'react-redux'
import { IStateInterface } from '../../store/store'
import { IPlaceApiResponse } from '../../models/Places'
import PlaceItem, { PlaceItemSkeleton } from '../../components/PlaceItem/PlaceItem'
import { useNavigate } from 'react-router-dom'
import AddNewPlaceButton from "../../components/AddNewPlaceButton/AddNewPlaceButton.tsx";
import styles from './CityPage.module.scss'
import ErrorBlock from '../../components/ErrorBlock/ErrorBlock.tsx'
import Button from '../../components/Button/Button.tsx'
import { Slider } from '@telegram-apps/telegram-ui';
import { Slider as CardSlider} from '../../components/Slider/Slider.tsx';
import walkIcon from "../../assets/walk-icon.svg"
import { debounce } from 'lodash';
import { useBackButton } from '@tma.js/sdk-react'

export default function CityPage() {
    // console.log('user ',window.navigator?.userAgentData?.platform);
    const [coordinates, setCoordinates] = useState<Partial<GeolocationCoordinates>>(null)
    const [error, setError] = useState(null)
    const [places, setPlaces] = useState<IPlaceApiResponse[]>([])
    const [isLoading, setIsLoading] = useState(false);

    const [radiusTime, setRadiusTime] = useState(20);
    const [radiusValue, setRadiusValue] = useState(400);

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
        return calculateDeltas(coordinates?.latitude, coordinates?.longitude, radiusValue)
    }, [coordinates, radiusValue])

    useEffect(() => {
        getLocationPromise
            .then((position) => setCoordinates(position?.coords))
    },[region])

    const token = localStorage.getItem("token");
    const user_id = localStorage.getItem("tg_id");

    function getPlaces() {
        setIsLoading(true);
        const AUTH_TOKEN = USER_TOKEN ?? token;
        const TG_USER_ID = USER_ID ?? parseInt(user_id);
        region.latitudeDelta && region.longitudeDelta &&
            MapService.getPlacesWithTelegram(AUTH_TOKEN, TG_USER_ID, region)
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
    }

    const handleSliderChange = useCallback(debounce((value: number) => {
        setRadiusTime(value);
        setRadiusValue(value * 80);
        getPlaces()
    }, 500),[])

    useEffect(() => {
        getPlaces()
    },[USER_TOKEN, USER_ID, region])

    return (
        <div className={styles['container']}>
            <h1>Laptop friendly places</h1>
                <Slider
                    min={0}
                    max={60}
                    defaultValue={20}
                    step={5}
                    onChange={handleSliderChange}
                    before={
                        <div className={styles['range']}>
                            <div className={styles['range-icon']}>
                                <img src={walkIcon}/>
                            </div>
                            <div className={styles['range-value']}>
                                {radiusTime} min 
                            </div>
                        </div>}
                    />
            <div>
                <div
                    className={styles['slider-header']}
                >
                    <div className={styles['heading']}>near you</div>
                    {/* <Button
                        type="plain"
                        onClick={() => console.log('')}
                        disabled={error}
                    >
                        See all
                    </Button> */}
                </div>
                {isLoading && 
                    <CardSlider>
                        <PlaceItemSkeleton/>
                    </CardSlider>
                }
                {!isLoading && !error &&
                        <CardSlider>
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
                        </CardSlider>
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
