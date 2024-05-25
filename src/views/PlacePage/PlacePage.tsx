import React, { useEffect, useState } from 'react'
import MapService from '../../http/MapService'
import { useSelector } from 'react-redux'
import { IStateInterface } from '../../store/store'
import { IPlaceApiResponse } from '../../models/Places'
// import styles from "./CityPage.module.scss"
import { useParams } from 'react-router-dom'

export default function PlacePage() {
    const params = useParams();
    const [error, setError] = useState<string>(null)
    const USER_TOKEN = useSelector((state: IStateInterface) => state.authentication.token)
    const USER_ID = useSelector((state: IStateInterface) => state.authentication.telegramID)
    const PLACE_ID = params?.place_id
    const [ placeData, setPlaceData ] = useState<IPlaceApiResponse>(null)


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

  return (
    <div>
        <div className='Container'>
            <h1>Laptop friendly places</h1>
            {placeData && Object.keys(placeData).map((value) => {
                if ((typeof placeData[value] === "string") || (typeof placeData[value] === "number")) {
                    return (
                        <div className='Card'>
                            {placeData[value]}
                        </div>
                    )
                }
            })
            }
            {error && 
                <div className='Card'>
                        {error}
                </div>
            }
            
        </div>
    </div>
  )
}