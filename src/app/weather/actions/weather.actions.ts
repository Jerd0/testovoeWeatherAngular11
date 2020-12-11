import {WeatherData} from '../../models/weather-data/weather-data';
import {Action} from '@ngrx/store';

export enum WeatherActionTypes {
  LoadWeather = '[Home Page] Load Weather',
  LoadWeatherLeft = '[Home Page] Load Weather Left',
  LoadWeatherRight = '[Home Page] Load Weather Right',
  LoadWeatherRightFuture = '[Home Page] Load Weather Future Right',
  LoadWeatherFuture = '[Home Page] Load Weather Future',
  LoadWeatherMiddleFuture = '[Home Page] Load Weather Future Middle',
  LoadWeatherLeftFuture = '[Home Page] Load Weather Future Left',
}

export class WeatherAction implements Action {
  type: string;
  payload: {
    weatherData: WeatherData
  };
}

export class LoadWeather implements Action {
  readonly type = WeatherActionTypes.LoadWeather;

  constructor(readonly payload: { weatherData: WeatherData }) {

  }
}

export class LoadWeatherLeft implements Action {
  readonly type = WeatherActionTypes.LoadWeatherLeft;

  constructor(readonly payload: { weatherData: WeatherData }) {

  }
}

export class LoadWeatherRight implements Action {
  readonly type = WeatherActionTypes.LoadWeatherRight;

  constructor(readonly payload: { weatherData: WeatherData }) {

  }
}


export class LoadWeatherFutureRight implements Action {
  readonly type = WeatherActionTypes.LoadWeatherRightFuture;

  constructor(readonly payload: { weatherData: WeatherData }) {

  }
}

export class LoadWeatherFuture implements Action {
  readonly type = WeatherActionTypes.LoadWeatherFuture;

  constructor(readonly payload: { weatherData: WeatherData }) {

  }
}

export class LoadWeatherFutureLeft implements Action {
  readonly type = WeatherActionTypes.LoadWeatherLeftFuture;

  constructor(readonly payload: { weatherData: WeatherData }) {

  }
}

export class LoadWeatherFutureMiddle implements Action {
  readonly type = WeatherActionTypes.LoadWeatherMiddleFuture;

  constructor(readonly payload: { weatherData: WeatherData }) {

  }
}

