// import { TonConnectButton } from '@tonconnect/ui-react';
// import { useTonConnect } from './hooks/useTonConnect';
// import { useCounterContract } from './hooks/useCounterContract';
import '@twa-dev/sdk';
import { useCallback, useEffect, useState } from 'react';
import MapService from '../../http/MapService';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';

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
    MapService.loginWithTelegram(ID)
      .then((resp) => setToken(resp.data) )
  }, [])

  const onClick = useCallback(() => {
    const getLocationPromise = new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((position) => {
        resolve(position)
      }, (error) => {
        reject(error);
      })
    });

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
