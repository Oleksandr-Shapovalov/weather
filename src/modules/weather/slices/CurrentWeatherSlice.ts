import { createSlice } from '@reduxjs/toolkit';
import { CurrentWeather } from '../types/current-weather';
import { getCurrentWeather } from '../actions/getCurrentWeather';

type CurrentWeatherState = {
  currentWeather: CurrentWeather | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: CurrentWeatherState = { currentWeather: null, isLoading: false, error: null };

export const currentWeatherSlice = createSlice({
  name: 'cityCoordinatesSliceSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentWeather.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCurrentWeather.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.currentWeather = action.payload;
      })
      .addCase(getCurrentWeather.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});
