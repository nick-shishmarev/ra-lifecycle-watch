import './WorldClockDigital.css';
import type { City } from '../WorldClockControl';

export interface ClockProps extends City{
  time: Date;
  setCities: React.Dispatch<React.SetStateAction<City[]>>;
}

export const WorldClockDigital = (clockProps: ClockProps) => {
  const { id, timezone, city, time, setCities } = clockProps;
  const localTime = new Date(time.getTime() + timezone * 3600000);
  const hours = String(localTime.getHours()).padStart(2, '0');
  const minutes = String(localTime.getMinutes()).padStart(2, '0');
  const seconds = String(localTime.getSeconds()).padStart(2, '0');
  const timeToShow = `${hours}:${minutes}:${seconds}`;

  return (
    <div className="clock_box">
      <div className="close_btn"
        data-id={id}
        onClick={() => {
          setCities(prev => prev.filter(card => card.id !== id))
        }}
      >
        <div className='btn'>&times;</div>
      </div>

      <div className="city_str">{city}</div>
      <div className="time_str">{timeToShow}</div>

    </div>
  )
}
