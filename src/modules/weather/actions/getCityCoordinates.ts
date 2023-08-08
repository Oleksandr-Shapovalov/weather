import { $api } from '@/core/utils/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getErrorMessage } from '@/core/utils/get-error-message';
import { VITE_API_KEY } from '@/env';
import { CityCoordinates } from '../types/city-coordinates';

export const getCityCoordinates = createAsyncThunk<CityCoordinates[], { cityName: string }>(
  'getCityCoordinates',
  async (data, thunkApi) => {
    try {
      const response = await $api.get<CityCoordinates[]>(
        `geo/1.0/direct?${new URLSearchParams({
          appid: VITE_API_KEY,
          limit: '5',
          q: data.cityName,
        })}`
      );

      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(getErrorMessage(error));
    }
  }
);
