import './App.css';
import { TonConnectButton } from '@tonconnect/ui-react';
// import { useTonConnect } from './hooks/useTonConnect';
// import { useCounterContract } from './hooks/useCounterContract';
import '@twa-dev/sdk';

function App() {
  // const { connected } = useTonConnect();
  // const { value, address, sendIncrement } = useCounterContract();
  //@ts-ignore
  const tg = window.Telegram.WebApp;
  // console.log(tg)

  return (
    <div className='App'>
      <div className='Container'>
        <TonConnectButton />

        <button onClick={() => tg.expand()}>Клик клак</button>


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
