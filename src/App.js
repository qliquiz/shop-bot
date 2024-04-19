import './App.css';
import { useEffect } from 'react';
import { useTelegram } from './components/hooks/useTelegram';
import Header from './components/Header/Header';

function App() {
  const {onToggleButton, tg} = useTelegram();

  useEffect(() => {tg.ready()}, []);

  return (
    <div className='app'>
      <Header/>
      <button onClick={onToggleButton}>toggle</button>
    </div>
  );
}

export default App;