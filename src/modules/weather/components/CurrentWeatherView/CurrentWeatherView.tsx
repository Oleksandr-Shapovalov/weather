import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AiOutlineSetting } from 'react-icons/ai';
import styles from './CurrentWeatherView.module.css';
import { useAppDispatch, useAppSelector } from '@/core/hooks/redux';
import { InitialLoader, PortalContainer } from '@/core/components';
import { getCurrentWeather } from '../../actions/getCurrentWeather';
import { Coord } from '../../types/current-weather';
import { Unit } from '../../types/units';
import { getIconUrl } from '../../utils/getIconUrl';
import { CelsiusFormatter, FahrenheitFormatter } from '../../utils/TemperatureFormatter';
import { useTemperatureFormatter } from '../../hooks';

const celsiusFormatter = new CelsiusFormatter();
const fahrenheitFormatter = new FahrenheitFormatter();

const unitName: Record<Unit, string> = { C: 'Celsius', F: 'Fahrenheit' };

const CurrentWeatherView = () => {
  const dispatch = useAppDispatch();
  const { weather } = useAppSelector((state) => ({ weather: state.currentWeather }));

  const temperatureFormatter = useTemperatureFormatter(celsiusFormatter);

  const settingsBtnRef = useRef<HTMLButtonElement>(null);
  const [settingsVisible, setSettingsVisible] = useState(false);

  const [coords, setCoords] = useState<Coord | null>(null);
  const [unit, setUnit] = useState<Unit>('C');

  useEffect(() => {
    if (coords) {
      dispatch(getCurrentWeather(coords));
    }
  }, [coords]);

  useEffect(() => {
    if (unit === 'C') temperatureFormatter.setTemperatureFormatter(celsiusFormatter);
    if (unit === 'F') temperatureFormatter.setTemperatureFormatter(fahrenheitFormatter);
  }, [unit]);

  const handleGeolocationSuccess: PositionCallback = (position) => {
    const { latitude, longitude } = position.coords;
    setCoords({ lat: latitude, lon: longitude });
  };

  const handleGeolocationError = (error: any) => {
    console.error('Geolocation error:', error);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(handleGeolocationSuccess, handleGeolocationError);
    }
  }, []);

  if (weather.isLoading || !weather.currentWeather)
    return (
      <div className={styles.container} style={{ flexGrow: 1 }}>
        <InitialLoader type="fullBlock" />
      </div>
    );

  if (weather.error)
    return (
      <div className={styles.container}>
        <div className={styles.error}>{weather.error}</div>
      </div>
    );

  return (
    <div className={styles.container}>
      <button
        ref={settingsBtnRef}
        onClick={() => setSettingsVisible(true)}
        className={styles.settingsBtn}
      >
        <AiOutlineSetting />
      </button>

      {settingsVisible &&
        settingsBtnRef.current &&
        createPortal(
          <PortalContainer
            top={settingsBtnRef.current.offsetTop - 80}
            left={settingsBtnRef.current.offsetLeft - 80}
            height={'auto'}
            width={120}
            onBackDropClick={() => setSettingsVisible(false)}
          >
            {(['C', 'F'] as Unit[]).map((item) => (
              <button key={item} className={styles.temperatureUnit} onClick={() => setUnit(item)}>
                {unitName[item]}
              </button>
            ))}
          </PortalContainer>,
          document.body
        )}

      <div className={styles.location}>
        Loacation : {weather.currentWeather.name}/{weather.currentWeather.sys.country}
      </div>
      <div className={styles.tempAndIconContainer}>
        <div className={['ibg', styles.icon].join(' ')}>
          <img src={getIconUrl(weather.currentWeather.weather[0].icon ?? '')} alt="icon" />
        </div>
        <div className={styles.tempContainer}>
          <div className={styles.temp}>
            {temperatureFormatter
              .formatTemperature(weather.currentWeather.main.temp ?? 0)
              .toFixed(0)}{' '}
            {unit}°
          </div>
          <div className={styles.feelsLike}>
            Feels{' '}
            {temperatureFormatter
              .formatTemperature(weather.currentWeather.main.feels_like ?? 0)
              .toFixed(0)}{' '}
            {unit}°
          </div>
        </div>
      </div>
      <div className={styles.description}>{weather.currentWeather.weather[0].description}</div>
    </div>
  );
};

export default CurrentWeatherView;
