import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface WeatherState {
  data: {
    [key: string]: any;
  };
  history: any;
}
export const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    data: {} as any,
    history: {} as any,
  } as WeatherState,
  reducers: {
    add: (state, action) => {
      state.data = {
        [action.payload.location]: action.payload.data,
        ...state.data,
      };
    },
    remove: (state, action) => {
      delete state.data[action.payload.location];
    },
    updateHistory: (state, action) => {
      state.history = {
        [action.payload.location]: action.payload.data,
        ...state.history,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { remove, add, updateHistory } = weatherSlice.actions;

export const weatherData = (state: RootState) => state.weather.data;

export const weatherHistory = (state: RootState) => state.weather.history;

export default weatherSlice.reducer;
