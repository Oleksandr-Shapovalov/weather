import styles from './CityAutocompleteItem.module.css';
import { CityCoordinates } from '../../types/city-coordinates';
import { useAppDispatch } from '@/core/hooks/redux';
import { getCurrentWeather } from '../../actions/getCurrentWeather';

const CityAutocompleteItem = ({ name, country, state, lat, lon }: CityCoordinates) => {
  const dispatch = useAppDispatch();

  const itemClickHandler = () => {
    dispatch(getCurrentWeather({ lat, lon }));
  };

  return (
    <div onClick={itemClickHandler} className={styles.container}>
      <div className={styles.fullName}>
        {name}, {state}, {country}
      </div>

      <div className={styles.info}>
        lat: {lat} lon:{lon}
      </div>
    </div>
  );
};

export default CityAutocompleteItem;
