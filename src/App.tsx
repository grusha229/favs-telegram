import './App.css';
// import { useTonConnect } from './hooks/useTonConnect';
// import { useCounterContract } from './hooks/useCounterContract';
import '@twa-dev/sdk';
import { Outlet } from 'react-router-dom';
import '@telegram-apps/telegram-ui/dist/styles.css';
import { AppRoot } from '@telegram-apps/telegram-ui';

function App() {

  return (
    <AppRoot>
      <div className='App'>
        <Outlet />
      </div>
    </AppRoot>
  );
}

export default App
