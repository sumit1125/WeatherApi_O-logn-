import { createSlice } from '@reduxjs/toolkit';

export const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    data: null,
    error: null
  },
  reducers: {
    setWeatherData: (state, action) => {
      state.data = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { setWeatherData, setError } = weatherSlice.actions;

export default weatherSlice.reducer;
