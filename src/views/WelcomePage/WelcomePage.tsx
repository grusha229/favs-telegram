// import { TonConnectButton } from '@tonconnect/ui-react';
// import { useTonConnect } from './hooks/useTonConnect';
// import { useCounterContract } from './hooks/useCounterContract';
import '@twa-dev/sdk';
import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import { getLocationPromise } from '../../utils/location';
import AuthService from '../../http/AuthService';
import { useDispatch } from 'react-redux';
import { setToken, setUser } from '../../store/features/Auth/AuthSlice';

function WelcomePage() {
  // const { connected } = useTonConnect();
  // const { value, address, sendIncrement } = useCounterContract();
  const tg: WebApp  = window.Telegram.WebApp;
  const navigate = useNavigate();
  const ID = tg?.initDataUnsafe?.user?.id ?? 123
  const dispatch = useDispatch();

  useEffect(() => {
    AuthService.loginWithTelegram(ID)
      .then((resp) => {
        dispatch(setToken(resp.data))
        dispatch(setUser(ID))
      })
  }, [ID])

  const onClick = useCallback(() => {

    getLocationPromise
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
