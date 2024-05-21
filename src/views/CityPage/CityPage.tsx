import React, { useEffect, useState } from 'react'
import { getLocationPromise } from '../../utils/location'
import MapService from '../../http/MapService'
import { useSelector } from 'react-redux'
import { IStateInterface } from '../../store/store'

export default function CityPage() {
    // console.log('user ',window.navigator?.userAgentData?.platform);
    const [coordinates, setCoordinates] = useState<Partial<GeolocationCoordinates>>(null)
    const [places, setPlaces] = useState<[]>(null)
    const USER_TOKEN = useSelector((state: IStateInterface) => state.authentication.token)
    const USER_ID = useSelector((state: IStateInterface) => state.authentication.telegramID)

    useEffect(() => {
        getLocationPromise
            .then((position) => setCoordinates(position?.coords))
    },[])

    useEffect(() => {
        MapService.getPlacesWithTelegram(USER_TOKEN, USER_ID, {
            latitude: coordinates?.latitude,
            longitude: coordinates?.longitude
        })
        .then((res) => res.data)
        .then((places) => {
            console.log(places)
            setPlaces(places)
        })
    },[USER_TOKEN, USER_ID, coordinates])

  return (
    <div>
        <div className='Container'>
            <h1>City page</h1>
            <div className='Card'>
                {coordinates?.latitude}
            </div>
            <div className='Card'>
                {coordinates?.longitude}
            </div>
            {
                places?.map((place) => (
                    <div className='Card'>
                        {place?.name}
                    </div>
                ))
            }
        </div>
    </div>
  )
}