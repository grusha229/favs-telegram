import './App.css';
// import { useTonConnect } from './hooks/useTonConnect';
// import { useCounterContract } from './hooks/useCounterContract';
import '@twa-dev/sdk';
import { Outlet } from 'react-router-dom';

function App() {

  return (
    
    <div className='App'>
      <Outlet />
    </div>
  );
}

export default App
