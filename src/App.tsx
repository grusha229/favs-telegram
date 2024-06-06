import './App.css';
// import { useTonConnect } from './hooks/useTonConnect';
// import { useCounterContract } from './hooks/useCounterContract';
import '@twa-dev/sdk';
import { Outlet } from 'react-router-dom';
import '@telegram-apps/telegram-ui/dist/styles.css';
import { AppRoot } from '@telegram-apps/telegram-ui';
import { SDKProvider } from '@tma.js/sdk-react';

function App() {

  return (
    <AppRoot>
      <SDKProvider acceptCustomStyles debug>
        <div className='App'>
          <Outlet />
        </div>
      </SDKProvider>
    </AppRoot>
  );
}

export default App
