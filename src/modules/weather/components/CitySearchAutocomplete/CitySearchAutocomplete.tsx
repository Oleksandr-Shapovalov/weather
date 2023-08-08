import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './CitySearchAutocomplete.module.css';
import { useDebounceValue } from '@/core/hooks';
import { useAppDispatch, useAppSelector } from '@/core/hooks/redux';
import { InitialLoader, PortalContainer } from '@/core/components';
import { getCityCoordinates } from '../../actions/getCityCoordinates';
import { CityAutocompleteItem } from '../CityAutocompleteItem';
import { cityCoordinatesSlice } from '../../slices';

const CitySearchAutocomplete = () => {
  const dispatch = useAppDispatch();
  const { cityCoordinates } = useAppSelector((state) => ({
    cityCoordinates: state.cityCoordinates,
  }));

  const inputRef = useRef<HTMLInputElement>(null);

  const [cityName, setCityName] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const cityNameDebounced = useDebounceValue(cityName);

  const [citiesListVisible, setCitiesListVisible] = useState(false);

  useEffect(() => {
    if (cityNameDebounced) {
      dispatch(getCityCoordinates({ cityName: cityNameDebounced }));
    } else {
      dispatch(cityCoordinatesSlice.actions.reset());
    }
  }, [cityNameDebounced]);

  useEffect(() => {
    if (isInputFocused && cityName) setCitiesListVisible(true);
  }, [isInputFocused, cityName]);

  return (
    <div>
      <input
        ref={inputRef}
        onFocus={() => setIsInputFocused(true)}
        onBlur={() => setIsInputFocused(false)}
        className={styles.input}
        placeholder="City"
        name="city"
        type="text"
        value={cityName}
        onChange={(e) => setCityName(e.target.value)}
      />

      {citiesListVisible &&
        inputRef.current &&
        createPortal(
          <PortalContainer
            top={inputRef.current.offsetTop + inputRef.current.offsetHeight}
            left={inputRef.current.offsetLeft}
            height={'auto'}
            width={inputRef.current.offsetWidth}
            onBackDropClick={() => setCitiesListVisible(false)}
          >
            {cityCoordinates.error ? (
              <div className={styles.error}>{cityCoordinates.error}</div>
            ) : cityCoordinates.isLoading ? (
              <div style={{ height: 200 }}>
                <InitialLoader type="fullBlock" />
              </div>
            ) : (
              cityCoordinates.cityCoordinates.map((item) => (
                <CityAutocompleteItem key={item.name + item.lat} {...item} />
              ))
            )}
          </PortalContainer>,
          document.body
        )}
    </div>
  );
};

export default CitySearchAutocomplete;
