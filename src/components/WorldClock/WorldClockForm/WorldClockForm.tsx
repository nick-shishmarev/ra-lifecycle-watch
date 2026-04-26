import './WorldClockForm.css';
import type { City } from '../WorldClockControl';
import { useRef, useState } from 'react';
import { v4 } from 'uuid';

export interface FormProps {
  setCities: React.Dispatch<React.SetStateAction<City[]>>;
}

export const WorldClockForm = (formProps: FormProps) => {
  const { setCities } = formProps;
  const [city, setCity] = useState<string>('');
  const [timezone, setTimezone] = useState<number>(0);
  const inputCityRef = useRef<HTMLInputElement>(null); 

  return (
    <form className="form_box"
      onSubmit={(e) => {
        e.preventDefault();
        const id: string = v4();
        const newClock: City = { id, city, timezone };
        setCities(prev => [...prev, newClock]);
        inputCityRef.current!.focus();
        setCity('');
        setTimezone(0);
      }}
    >
      <div className='form_group'>
        <label htmlFor="city">Название</label>
        <input type="text" 
          id="city"
          ref={inputCityRef}
          placeholder='Укажите город'
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>
      <div className='form_group'>
        <label htmlFor="zone">Временная зона</label>
        <input type="number" 
          id="zone"
          value={timezone}
          onChange={(e) => setTimezone(Number(e.target.value))}
        />
      </div>
      <button type="submit" className='input_btn'>Добавить</button>
    </form>
  )
}
