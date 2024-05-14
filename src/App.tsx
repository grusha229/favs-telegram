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
  const [places , setPlaces ] = useState(null);
  const ID = tg?.initDataUnsafe?.user?.id ?? 123
  useEffect(() => {
    MapService.loginWithTelegram(ID)
      .then((resp) => setToken(resp.data) )
  }, [])

  const handleClick = () => {
    MapService.getPlacesWithTelegram(token, ID)
      .then((res) => res.data)
      .then((data) => setPlaces(data))
  }

  return (
    <div className='App'>
      <div className='Container'>
        <TonConnectButton />

        <button onClick={handleClick}>Клик клак найти заведения в милане</button>
        {
          places && places.map((place) => (
            <div className='Card'>
              <b>{place.name}</b>
              <br/>
              {place.address}
            </div>
          ))
        }

        <div className='Card'>
          <b>id</b>
          <br/>
          {
            tg?.initDataUnsafe?.user?.id
          }
        </div>

        <div className='Card'>
          <b>name</b>
          <br/>
          {
            tg?.initDataUnsafe?.user?.first_name
          }
        </div>

        <div className='Card'>
          <b>username</b>
          <br/>
          {
            tg?.initDataUnsafe?.user?.username
          }
        </div>

        <div className='Card'>
          <b>token</b>
          <br/>
          {
            token
          }
        </div>
        

        {/* <div className='Card'>
          <b>Counter Value</b>
          <div>{value ?? 'Loading...'}</div>
        </div> */}
{/* 
        <a
          className={`Button ${connected ? 'Active' : 'Disabled'}`}
          onClick={() => {
            sendIncrement();
          }}
        >
          Increment
        </a> */}
      </div>
    </div>
  );
}

export default App
