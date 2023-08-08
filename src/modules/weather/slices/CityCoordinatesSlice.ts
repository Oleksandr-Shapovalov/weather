import { createSlice } from '@reduxjs/toolkit';
import { CityCoordinates } from '../types/city-coordinates';
import { getCityCoordinates } from '../actions/getCityCoordinates';

type CityCoordinatesState = {
  cityCoordinates: CityCoordinates[];
  isLoading: boolean;
  error: string | null;
};

const initialState: CityCoordinatesState = { cityCoordinates: [], isLoading: false, error: null };

export const cityCoordinatesSlice = createSlice({
  name: 'cityCoordinatesSlice',
  initialState,
  reducers: {
    reset: (state) => {
      state.cityCoordinates = [];
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCityCoordinates.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCityCoordinates.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.cityCoordinates = action.payload;
      })
      .addCase(getCityCoordinates.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});
