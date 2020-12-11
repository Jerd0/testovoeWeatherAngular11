import {AppState, selectError, selectWeather} from '../reducers';
import {
  LoadDay,
  LoadDayFuture,
  LoadDayLeft,
  LoadDayLeftFuture,
  LoadDayMiddleFuture,
  LoadDayRight,
  LoadDayRightFuture,
} from './actions/date.actions';
import {Observable} from 'rxjs';
import {WeatherData} from '../models/weather-data/weather-data';
import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Router} from '@angular/router';
import {UrlData} from '../models/url-data/url-data';

export let dateInUrl: Date;
export let pageRefresh = true;

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})

export class WeatherComponent implements OnInit {

  data$: Observable<WeatherData>;
  urlDate: UrlData = new UrlData();
  error$: Observable<any>;
  href: any;
  currentDate = new Date();
  daysWeather: [number, number, number];

  constructor(private store: Store<AppState>, private router: Router) {
  }

  ngOnInit(): void {
    this.data$ = this.store.pipe(select(selectWeather));
    this.error$ = this.store.pipe(select(selectError));
    if (pageRefresh) {
      this.currentUrl();
      this.currentDay();
      this.dispatch();
      pageRefresh = false;
    }
  }


  dispatch(): void {
    const check = dateInUrl.getDate() - this.currentDate.getDate();
    if (check === -4) {
      this.store.dispatch(new LoadDay({urlDate: this.urlDate}));
      this.store.dispatch(new LoadDayRight({urlData: this.urlDate}));
    }
    if (check <= -2 && check > -4) {
      this.store.dispatch(new LoadDay({urlDate: this.urlDate}));
      this.store.dispatch(new LoadDayLeft({urlDate: this.urlDate}));
      this.store.dispatch(new LoadDayRight({urlData: this.urlDate}));
    }
    if (check === -1) {
      this.store.dispatch(new LoadDay({urlDate: this.urlDate}));
      this.store.dispatch(new LoadDayLeft({urlDate: this.urlDate}));
      this.store.dispatch(new LoadDayRightFuture({urlDate: this.urlDate}));
    }
    if (check === 0) {
      this.store.dispatch(new LoadDayMiddleFuture({urlDate: this.urlDate}));
      this.store.dispatch(new LoadDayLeft({urlDate: this.urlDate}));
    }
    if (check > 0 && check < 7) {
      this.store.dispatch(new LoadDayFuture({urlDate: this.urlDate}));
    }
    if (check === 7) {
      this.store.dispatch(new LoadDayLeftFuture({urlDate: this.urlDate}));
    }
  }

  currentUrl(): void {
    this.href = this.router.url.split('/');
    dateInUrl = new Date(this.href[1], this.href[2] - 1, +this.href[3]);
    this.urlDate.currentDate = new Date(dateInUrl.getTime() + (24 * 60 * 60 * 1000));
  }

  currentDay(): void {
    const daySeconds = 24 * 60 * 60 * 1000;
    this.daysWeather = [Math.floor(dateInUrl.getTime() - daySeconds),
      Math.floor((dateInUrl.getTime())),
      Math.floor((dateInUrl.getTime()) + daySeconds)];
  }

  update(): void {
    this.router.navigateByUrl(`${dateInUrl.getFullYear()}/${(dateInUrl.getMonth() + 1)}/${(dateInUrl.getDate() + 3)}`);
    pageRefresh = true;
  }
}
