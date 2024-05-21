import { TonConnectButton } from '@tonconnect/ui-react';
// import { useTonConnect } from './hooks/useTonConnect';
// import { useCounterContract } from './hooks/useCounterContract';
import '@twa-dev/sdk';
import { useCallback, useEffect, useState } from 'react';
import MapService from '../../http/MapService';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';

const getLocationPromise = new Promise<GeolocationPosition>((resolve, reject) => {
  navigator.geolocation.getCurrentPosition((position) => {
    resolve(position)
  }, (error) => {
    reject(error);
  })
});

function WelcomePage() {
  // const { connected } = useTonConnect();
  // const { value, address, sendIncrement } = useCounterContract();
  //@ts-ignore
  const tg: WebApp  = window.Telegram.WebApp;
  // console.log(tg)

  const [token , setToken ] = useState(null);
  const [message , setMessage ] = useState(null);
  const [places , setPlaces ] = useState(null);
  const [coordinates, setCoordinates] = useState<Partial<GeolocationCoordinates>>(null)
  const navigate = useNavigate();
  const ID = tg?.initDataUnsafe?.user?.id ?? 123
  useEffect(() => {

    if ("geolocation" in navigator) {
      setMessage('ok')
    } else {
      setMessage('not ok')
    }

    MapService.loginWithTelegram(ID)
      .then((resp) => setToken(resp.data) )
  }, [])


  const handleClick = () => {
    // navigator.geolocation.getCurrentPosition((position) => {
    //   setMessage(position.coords.latitude+';'+position.coords.longitude)
    // })
    MapService.getPlacesWithTelegram(token, ID, {latitude: coordinates.latitude, longitude: coordinates.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421})
      .then((res) => res.data)
      .then((data) => {
        if (data) {
          setPlaces(data)
        } else {
          throw new Error('Не найдено')
        }
      })

      .catch((e) => console.log(e))
  }

  const onClick = useCallback(() => {
    getLocationPromise
      .then((position) => {
        setCoordinates({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
      })
      .catch((e) => {
        alert(e)
      })
      .finally(() => {
        tg.expand()
        navigate('./city')
      })

  },[])

  return (
    <div className='App'>
      <div className='Container'>
        <h1>Laptop friendly places</h1>
        <p>We need your location to show all places near you</p>
        <Button onClick={onClick}>
          Show all places near me
        </Button>
      </div>
    </div>
  );
}

export default WelcomePage
