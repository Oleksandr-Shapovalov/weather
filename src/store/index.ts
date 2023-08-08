import { configureStore } from '@reduxjs/toolkit';
import { cityCoordinatesSlice, currentWeatherSlice } from '@/modules/weather/slices';

export const store = configureStore({
  reducer: {
    currentWeather: currentWeatherSlice.reducer,
    cityCoordinates: cityCoordinatesSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
