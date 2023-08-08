import { CitySearchAutocomplete } from '../components/CitySearchAutocomplete';
import { CurrentWeatherView } from '../components/CurrentWeatherView';

const CurrentWeatherPage = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        alignSelf: 'stretch',
        gap: '2rem',
        padding: '1.5rem 0',
      }}
    >
      <CitySearchAutocomplete />

      <CurrentWeatherView />
    </div>
  );
};

export default CurrentWeatherPage;
