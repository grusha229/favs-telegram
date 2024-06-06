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
import styles from './WelcomePage.module.scss';
import laptopGif from './../../assets/laptop--image.gif';
import { Text, Title } from '@telegram-apps/telegram-ui';

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
    <div className={styles['container']}>
      <div className={styles['image-container']}>
        <img src={laptopGif} alt=""/>
      </div>
      <h1>Laptop friendly places</h1>
      <div className={styles['subtitle']}>We need your location to show all places near you</div>
      <Button onClick={onClick}>
        Show all places near me
      </Button>
    </div>
  );
}

export default WelcomePage
