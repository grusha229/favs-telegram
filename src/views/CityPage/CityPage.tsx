import React, { useEffect, useMemo, useState } from 'react'
import { getDelta, getLocationPromise } from '../../utils/location'
import MapService from '../../http/MapService'
import { useSelector } from 'react-redux'
import { IStateInterface } from '../../store/store'
import { IPlaceApiResponse } from '../../models/Places'
import PlaceItem from '../../components/PlaceItem/PlaceItem'
import Slider from '../../components/Slider/Slider'
import { useNavigate } from 'react-router-dom'
import AddNewPlaceButton from "../../components/AddNewPlaceButton/AddNewPlaceButton.tsx";
import styles from './CityPage.module.scss'

export default function CityPage() {
    // console.log('user ',window.navigator?.userAgentData?.platform);
    const [coordinates, setCoordinates] = useState<Partial<GeolocationCoordinates>>(null)
    const [error, setError] = useState(null)
    const [places, setPlaces] = useState<IPlaceApiResponse[]>([])
    const USER_TOKEN = useSelector((state: IStateInterface) => state.authentication.token)
    const USER_ID = useSelector((state: IStateInterface) => state.authentication.telegramID)

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
    },[USER_TOKEN, USER_ID, region])

  return (
      <div className={styles['container']}>
          <div>
              <h1>Laptop friendly places</h1>
          </div>
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
          {(error?.response?.status === 401 || error?.response?.status === 404 || error?.response?.status === 500) &&
              <Slider>
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
                  <PlaceItem
                      name='test'
                      id={'21412'}
                      type={'test'}
                      address={'test'}
                  />
                  <PlaceItem
                      name='test'
                      id={'2141224'}
                      type={'test'}
                      address={'test'}
                  />
              </Slider>
          }
          <div>
              <AddNewPlaceButton onClick={handleAddNewPlace}/>
          </div>
          <div className='Container'>
              {error &&
                  <div className='Card'>
                      {error.response.status + ' ошибка, сверху тестовые данные (для отладки)'}
                  </div>
              }
          </div>
      </div>
  )
}
