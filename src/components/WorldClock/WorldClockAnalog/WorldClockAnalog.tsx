import './WorldClockAnalog.css';
import type { ClockProps } from '../WorldClockDigital/WorldClockDigital';
import clockFace from '../assets/clockface.png';

export const WorldClockAnalog = (clockProps: ClockProps) => {
  const { id, timezone, city, time, setCities } = clockProps;
  const localTime = new Date(time.getTime() + timezone * 3600000);
  const styleClock = {backgroundImage: `url(${clockFace})`};

  const secs = localTime.getSeconds();
  const secsDegrees = ((secs / 60) * 360);
  const secsStyle = {transform: `rotate(${secsDegrees}deg)`}

  const mins = localTime.getMinutes();
  const minsDegrees = ((mins / 60) * 360) + ((secs / 60) * 6);
  const minsStyle = {transform: `rotate(${minsDegrees}deg)`}

  const hour = localTime.getHours() % 12;
  const hoursDegrees = ((hour / 12) * 360) + ((mins / 60) * 30);
  const hoursStyle = {transform: `rotate(${hoursDegrees}deg)`}

  return (
    <div className="analog-clock_box">
      <div className="analog-close_btn"
        data-id={id}
        onClick={() => {
          setCities(prev => prev.filter(card => card.id !== id))
        }}
      >
        <div className='btn'>&times;</div>
      </div>

      <div className="analog-city_str">{city}</div>
      
      <div className="clock">
        <div className="clock_face" style={styleClock}>
          <div className="hand hand_hour"
            style={hoursStyle}
          ></div>
          <div className="hand hand_min"
            style={minsStyle}
          ></div>
          <div className="hand hand_sec"
            style={secsStyle}
          ></div>
          <div className="clock_center"></div>
        </div>
      </div>

    </div>
  )
}
