import { $api } from '@/core/utils/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getErrorMessage } from '@/core/utils/get-error-message';
import { VITE_API_KEY } from '@/env';
import { Coord, CurrentWeather } from '../types/current-weather';

export const getCurrentWeather = createAsyncThunk<CurrentWeather, Coord, { rejectValue: string }>(
  'getCurrentWeather',
  async (data, thunkApi) => {
    try {
      const response = await $api.get<CurrentWeather>(
        `data/2.5/weather?${new URLSearchParams({
          appid: VITE_API_KEY,
          units: 'metric',
          lon: data.lon.toString(),
          lat: data.lat.toString(),
        })}`
      );

      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(getErrorMessage(error));
    }
  }
);
