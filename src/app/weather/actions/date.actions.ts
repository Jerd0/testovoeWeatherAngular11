import {Action} from '@ngrx/store';
import {UrlData} from '../../models/url-data/url-data';

export enum DateActionTypes {
  LoadDay = '[Home Page] Load Day',
  LoadDayLeft = '[Home Page] Load Day Left',
  LoadDayRight = '[Home Page] Load Day Right',
  LoadDayRightFuture = '[Home Page] Load Day Future Right',
  LoadDayMiddleFuture = '[Home Page] Load Day Future Middle',
  LoadDayLeftFuture = '[Home Page] Load Day Future Left',
  LoadDayFuture = '[Home Page] Load Day Future',
  LoadDayError = '[Home Page] Load Day Error'
}

export class DataAction implements Action {
  type: string;
  payload: {
    urlData: UrlData,
    date: number,
    error: string
  };
}

export class LoadDay implements Action {
  readonly type = DateActionTypes.LoadDay;

  constructor(readonly payload: { urlDate: UrlData }) {

  }
}

export class LoadDayLeft implements Action {
  readonly type = DateActionTypes.LoadDayLeft;

  constructor(readonly payload: { urlDate: UrlData }) {

  }
}

export class LoadDayRight implements Action {
  readonly type = DateActionTypes.LoadDayRight;

  constructor(readonly payload: { urlData: UrlData }) {

  }
}

export class LoadDayRightFuture implements Action {
  readonly type = DateActionTypes.LoadDayRightFuture;

  constructor(readonly payload: { urlDate: UrlData }) {

  }
}

export class LoadDayMiddleFuture implements Action {
  readonly type = DateActionTypes.LoadDayMiddleFuture;

  constructor(readonly payload: { urlDate: UrlData }) {

  }
}

export class LoadDayLeftFuture implements Action {
  readonly type = DateActionTypes.LoadDayLeftFuture;

  constructor(readonly payload: { urlDate: UrlData }) {

  }
}

export class LoadDayFuture implements Action {
  readonly type = DateActionTypes.LoadDayFuture;

  constructor(readonly payload: { urlDate: UrlData }) {

  }
}

export class LoadDayError implements Action {
  readonly type = DateActionTypes.LoadDayError;

  constructor(readonly payload: { error: string }) {

  }
}


