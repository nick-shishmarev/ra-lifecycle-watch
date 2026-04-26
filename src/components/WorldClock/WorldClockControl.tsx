import './WorldClockControl.css';
import { useEffect, useState } from 'react';
import { WorldClockDigital } from './WorldClockDigital/WorldClockDigital';
import { WorldClockForm } from './WorldClockForm/WorldClockForm';
import { WorldClockAnalog } from './WorldClockAnalog/WorldClockAnalog';
import digital from './assets/digital.svg';
import analog from './assets/analog.svg';

export interface City  {
  id: string;
  city: string;
  timezone: number;
}

const timeUtc = () => {
  const time = new Date();
  const utc = new Date(time.getTime() + time.getTimezoneOffset() * 60000);
  return utc;
}

export const WorldClockControl = () => {
  const [isDidital, setIsDigital] = useState<boolean>(false);
  const [now, setNow] = useState<Date>(timeUtc);
  const [cities, setCities] = useState<City[]>([
    {id: '1', city: 'Гринвич', timezone: 0},
    {id: '2', city: 'Москва', timezone: 3},
  ]);

  useEffect((() => {
    const intervalId = setInterval((() => {
      setNow(timeUtc);
    }), 1000);

    return () => {
      clearInterval(intervalId);
    }
  }), []) 

  return (
    <div className='clock_container'>

      <div className='switch_clock'
        onClick={() => {setIsDigital(prev => !prev)}}
      >

        <img className='switch_img'
          src={isDidital ? analog : digital} 
          title={isDidital ? 'Перейти на аналоговый вид' : 'Перейти на цифровой вид'}
        />

      </div>

      <WorldClockForm setCities={setCities} />

      <div className="clocks-box">
        {!isDidital &&  cities.map(city => <WorldClockAnalog {...{...city, time: now, setCities}} key={city.id}/>)}
        {isDidital &&  cities.map(city => <WorldClockDigital {...{...city, time: now, setCities}} key={city.id}/>)} 
      </div>
    </div>
  )
}
