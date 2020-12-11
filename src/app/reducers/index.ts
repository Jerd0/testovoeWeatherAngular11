import {environment} from '../environments/environment';
import {WeatherData} from '../models/weather-data/weather-data';
import {WeatherAction, WeatherActionTypes} from '../weather/actions/weather.actions';
import {DataAction, DateActionTypes} from '../weather/actions/date.actions';
import {ActionReducerMap, MetaReducer} from '@ngrx/store';
import {UrlData} from '../models/url-data/url-data';


export interface WeatherState {
  weatherData: WeatherData | null;
}

const initialWeatherState: WeatherState = {
  weatherData: null
};

export interface UrlState {
  url: UrlData | null;
  error: string | null;
}

const initialLocationState: UrlState = {
  url: null,
  error: null
};

export interface AppState {
  weather: WeatherState;
  url: UrlState;
}

export function weatherReducer(state: WeatherState = initialWeatherState, action: WeatherAction): WeatherState {
  switch (action.type) {
    case WeatherActionTypes.LoadWeather:
      return {
        weatherData: action.payload.weatherData
      };
    case WeatherActionTypes.LoadWeatherRight:
      return {
        weatherData: action.payload.weatherData
      };
    case WeatherActionTypes.LoadWeatherLeft:
      return {
        weatherData: action.payload.weatherData
      };
    case WeatherActionTypes.LoadWeatherFuture:
      return {
        weatherData: action.payload.weatherData
      };
    case WeatherActionTypes.LoadWeatherLeftFuture:
      return {
        weatherData: action.payload.weatherData
      };
    case WeatherActionTypes.LoadWeatherMiddleFuture:
      return {
        weatherData: action.payload.weatherData
      };
    case WeatherActionTypes.LoadWeatherRightFuture:
      return {
        weatherData: action.payload.weatherData
      };

    default:
      return state;
  }
}

export function urlReducer(state: UrlState = initialLocationState, action: DataAction): UrlState {
  switch (action.type) {
    case DateActionTypes.LoadDay:
      return {
        url: action.payload.urlData,
        error: null
      };
    case DateActionTypes.LoadDayLeft:
      return {
        url: action.payload.urlData,
        error: null
      };
    case DateActionTypes.LoadDayRight:
      return {
        url: action.payload.urlData,
        error: null
      };
    case DateActionTypes.LoadDayRightFuture:
      return {
        url: action.payload.urlData,
        error: null
      };
    case DateActionTypes.LoadDayMiddleFuture:
      return {
        url: action.payload.urlData,
        error: null
      };
    case DateActionTypes.LoadDayLeftFuture:
      return {
        url: action.payload.urlData,
        error: null
      };
    case DateActionTypes.LoadDayFuture:
      return {
        url: action.payload.urlData,
        error: null
      };

    case DateActionTypes.LoadDayError:
      return {
        url: null,
        error: action.payload.error
      };

    default:
      return state;
  }
}

export const reducers: ActionReducerMap<AppState> = {

  weather: weatherReducer,
  url: urlReducer
};

export const selectWeather = (state: AppState) => state.weather.weatherData;

export const selectError = (state: AppState) => state.url.error;

export const metaReducers: MetaReducer<any>[] = !environment.production ? [] : [];
