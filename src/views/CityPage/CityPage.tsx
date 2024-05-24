import React, { useEffect, useMemo, useState } from 'react'
import { getDelta, getLocationPromise } from '../../utils/location'
import MapService from '../../http/MapService'
import { useSelector } from 'react-redux'
import { IStateInterface } from '../../store/store'
import { IPlaceApiResponse } from '../../models/Places'
import PlaceItem from '../../components/PlaceItem/PlaceItem'
import styles from "./CityPage.module.scss"

export default function CityPage() {
    // console.log('user ',window.navigator?.userAgentData?.platform);
    const [coordinates, setCoordinates] = useState<Partial<GeolocationCoordinates>>(null)
    const [error, setError] = useState<string>(null)
    const [places, setPlaces] = useState<IPlaceApiResponse[]>(null)
    const USER_TOKEN = useSelector((state: IStateInterface) => state.authentication.token)
    const USER_ID = useSelector((state: IStateInterface) => state.authentication.telegramID)

    const region = useMemo(() => {
        return getDelta(coordinates?.latitude, coordinates?.longitude, 5000)
    }, [coordinates])

    useEffect(() => {
        getLocationPromise
            .then((position) => setCoordinates(position?.coords))
    },[])

    useEffect(() => {
        region.latitudeDelta && region.longitudeDelta &&
            MapService.getPlacesWithTelegram(USER_TOKEN, USER_ID, region)
            .then((res) => res.data)
            .then((places) => {
                console.log(places)
                setPlaces(places)
            })
            .catch((e) => {
                console.error('error!', e)
                setError(`${e?.response?.status}, ${e?.response?.statusText}`)
            })
    },[USER_TOKEN, USER_ID, region])

  return (
    <div>
        <div className='Container'>
            <h1>City page</h1>
            { coordinates &&
                <>
                    <div className='Card'>
                        {coordinates?.latitude}
                    </div>
                    <div className='Card'>
                        {coordinates?.longitude}
                    </div>
                </>
            }
            <div className={styles['slider']}>
                {places?.map((place) => (
                    <PlaceItem
                        key={place.id}
                        name={place.name}
                        id={place.id}
                        type={place.category}
                        address={place.address}
                    />
                ))}
                <PlaceItem
                        name='test'
                        id={'214124'}
                        type={'test'}
                        address={'test'}
                    />
                    <PlaceItem
                        name='test'
                        id={'2141224'}
                        type={'test'}
                        address={'test'}
                    />
            </div>
            {error && 
                    <div className='Card'>
                            {error}
                    </div>
            }
            
        </div>
    </div>
  )
}