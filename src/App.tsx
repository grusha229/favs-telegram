import './App.css';
import { TonConnectButton } from '@tonconnect/ui-react';
// import { useTonConnect } from './hooks/useTonConnect';
// import { useCounterContract } from './hooks/useCounterContract';
import '@twa-dev/sdk';
import { useEffect, useState } from 'react';
import MapService from './http/MapService';

function App() {
  // const { connected } = useTonConnect();
  // const { value, address, sendIncrement } = useCounterContract();
  //@ts-ignore
  const tg = window.Telegram.WebApp;
  // console.log(tg)

  const [token , setToken ] = useState(null);
  const [message , setMessage ] = useState(null);
  const [places , setPlaces ] = useState(null);
  const [coordinates, setCoordinates] = useState<Partial<GeolocationCoordinates>>(null)
  const ID = tg?.initDataUnsafe?.user?.id ?? 123
  useEffect(() => {

    navigator.geolocation.getCurrentPosition((position) => {
      setMessage(position.coords.latitude+';'+position.coords)
      setCoordinates({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      })
    })

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
      .then((data) => setPlaces(data))
  }

  return (
    <div className='App'>
      <div className='Container'>
        <TonConnectButton />

        <button onClick={handleClick}>Клик клак найти заведения рядом с вами</button>
      </div>
    </div>
  );
}

export default App
