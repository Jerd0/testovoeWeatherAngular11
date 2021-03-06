import {WeatherData} from '../../models/weather-data/weather-data';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UrlData} from '../../models/url-data/url-data';
import {environment} from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  currentDay = new Date();
  weatherData: WeatherData = new WeatherData();

  constructor(private http: HttpClient) {
  }

  getWeatherFromPast(urlData: UrlData): Observable<WeatherData> {
    return this.getPastData(urlData).pipe(
      map((value) => {
        this.weatherData.currentConditions.day = value.current?.dt;
        this.weatherData.currentConditions.temp = value.current?.temp;
        this.weatherData.currentConditions.pressure = value.current?.pressure;
        this.weatherData.currentConditions.windDirection = this.getWindDirectionFromDegreeAngle(value.current?.wind_deg);
        this.weatherData.currentConditions.windSpeed = value.current?.wind_speed;
        this.weatherData.currentConditions.clouds = value.current?.clouds;
        this.weatherData.currentConditions.humidity = value.current?.humidity;
        return this.weatherData;
      })
    );
  }

  getWeatherFromPustRight(urlData: UrlData): Observable<WeatherData> {
    return this.getPastDataAfter(urlData).pipe(
      map((value) => {
        this.weatherData.futureCondtitions.day = value.current?.dt;
        this.weatherData.futureCondtitions.temp = value.current?.temp;
        this.weatherData.futureCondtitions.pressure = value.current?.pressure;
        this.weatherData.futureCondtitions.windDirection = this.getWindDirectionFromDegreeAngle(value.current?.wind_deg);
        this.weatherData.futureCondtitions.windSpeed = value.current?.wind_speed;
        this.weatherData.futureCondtitions.clouds = value.current?.clouds;
        this.weatherData.futureCondtitions.humidity = value.current?.humidity;
        return this.weatherData;
      })
    );
  }

  getWeatherFromPustLeft(urlData: UrlData): Observable<WeatherData> {
    return this.getPastDataBefore(urlData).pipe(
      map((value) => {
        this.weatherData.pastCondtitions.day = value.current?.dt;
        this.weatherData.pastCondtitions.temp = value.current?.temp;
        this.weatherData.pastCondtitions.pressure = value.current?.pressure;
        this.weatherData.pastCondtitions.windDirection = this.getWindDirectionFromDegreeAngle(value.current?.wind_deg);
        this.weatherData.pastCondtitions.windSpeed = value.current?.wind_speed;
        this.weatherData.pastCondtitions.clouds = value.current?.clouds;
        this.weatherData.pastCondtitions.humidity = value.current?.humidity;
        return this.weatherData;
      })
    );
  }

  getWeatherFromFutureRight(urlDate: UrlData): Observable<WeatherData> {
    return this.getCurrentWeatherOpenWeatherMapAPI(urlDate).pipe(
      map((value => {
        this.weatherData.futureCondtitions.day = value.daily[(urlDate.currentDate.getDate() - this.currentDay.getDate() + 1)]?.dt;
        this.weatherData.futureCondtitions.temp = value.daily[(urlDate.currentDate.getDate() - this.currentDay.getDate() + 1)]?.temp.day;
        // tslint:disable-next-line:max-line-length
        this.weatherData.futureCondtitions.pressure = value.daily[(urlDate.currentDate.getDate() - this.currentDay.getDate() + 1)]?.pressure;
        // tslint:disable-next-line:max-line-length
        this.weatherData.futureCondtitions.windDirection = this.getWindDirectionFromDegreeAngle(value.daily[(urlDate.currentDate.getDate() - this.currentDay.getDate() + 1)]?.wind_deg);
        // tslint:disable-next-line:max-line-length
        this.weatherData.futureCondtitions.windSpeed = value.daily[(urlDate.currentDate.getDate() - this.currentDay.getDate() + 1)]?.wind_speed;
        this.weatherData.futureCondtitions.clouds = value.daily[(urlDate.currentDate.getDate() - this.currentDay.getDate() + 1)]?.clouds;
        // tslint:disable-next-line:max-line-length
        this.weatherData.futureCondtitions.humidity = value.daily[(urlDate.currentDate.getDate() - this.currentDay.getDate() + 1)]?.humidity;
        return this.weatherData;
      }))
    );
  }

  getWeatherFromFuture(urlDate: UrlData): Observable<WeatherData> {
    return this.getCurrentWeatherOpenWeatherMapAPI(urlDate).pipe(
      map((value => {
        this.weatherData.pastCondtitions.day = value.daily[(urlDate.currentDate.getDate() - this.currentDay.getDate() - 1)]?.dt;
        this.weatherData.pastCondtitions.temp = value.daily[(urlDate.currentDate.getDate() - this.currentDay.getDate() - 1)]?.temp.day;
        this.weatherData.pastCondtitions.pressure = value.daily[(urlDate.currentDate.getDate() - this.currentDay.getDate() - 1)]?.pressure;
        // tslint:disable-next-line:max-line-length
        this.weatherData.pastCondtitions.windDirection = this.getWindDirectionFromDegreeAngle(value.daily[(urlDate.currentDate.getDate() - this.currentDay.getDate() - 1)]?.wind_deg);
        // tslint:disable-next-line:max-line-length
        this.weatherData.pastCondtitions.windSpeed = value.daily[(urlDate.currentDate.getDate() - this.currentDay.getDate() - 1)]?.wind_speed;
        this.weatherData.pastCondtitions.clouds = value.daily[(urlDate.currentDate.getDate() - this.currentDay.getDate() - 1)]?.clouds;
        this.weatherData.pastCondtitions.humidity = value.daily[(urlDate.currentDate.getDate() - this.currentDay.getDate() - 1)]?.humidity;
        this.weatherData.currentConditions.day = value.daily[(urlDate.currentDate.getDate() - this.currentDay.getDate())]?.dt;
        this.weatherData.currentConditions.temp = value.daily[(urlDate.currentDate.getDate() - this.currentDay.getDate())]?.temp.day;
        this.weatherData.currentConditions.pressure = value.daily[(urlDate.currentDate.getDate() - this.currentDay.getDate())]?.pressure;
        // tslint:disable-next-line:max-line-length
        this.weatherData.currentConditions.windDirection = this.getWindDirectionFromDegreeAngle(value.daily[(urlDate.currentDate.getDate() - this.currentDay.getDate())]?.wind_deg);
        this.weatherData.currentConditions.windSpeed = value.daily[(urlDate.currentDate.getDate() - this.currentDay.getDate())]?.wind_speed;
        this.weatherData.currentConditions.clouds = value.daily[(urlDate.currentDate.getDate() - this.currentDay.getDate())]?.clouds;
        this.weatherData.currentConditions.humidity = value.daily[(urlDate.currentDate.getDate() - this.currentDay.getDate())]?.humidity;
        this.weatherData.futureCondtitions.day = value.daily[(urlDate.currentDate.getDate() - this.currentDay.getDate() + 1)]?.dt;
        this.weatherData.futureCondtitions.temp = value.daily[(urlDate.currentDate.getDate() - this.currentDay.getDate() + 1)]?.temp.day;
        // tslint:disable-next-line:max-line-length
        this.weatherData.futureCondtitions.pressure = value.daily[(urlDate.currentDate.getDate() - this.currentDay.getDate() + 1)]?.pressure;
        // tslint:disable-next-line:max-line-length
        this.weatherData.futureCondtitions.windDirection = this.getWindDirectionFromDegreeAngle(value.daily[(urlDate.currentDate.getDate() - this.currentDay.getDate() + 1)]?.wind_deg);
        // tslint:disable-next-line:max-line-length
        this.weatherData.futureCondtitions.windSpeed = value.daily[(urlDate.currentDate.getDate() - this.currentDay.getDate() + 1)]?.wind_speed;
        this.weatherData.futureCondtitions.clouds = value.daily[(urlDate.currentDate.getDate() - this.currentDay.getDate() + 1)]?.clouds;
        // tslint:disable-next-line:max-line-length
        this.weatherData.futureCondtitions.humidity = value.daily[(urlDate.currentDate.getDate() - this.currentDay.getDate() + 1)]?.humidity;
        return this.weatherData;
      }))
    );
  }


  getWeatherFromFutureMiddle(urlDate: UrlData): Observable<WeatherData> {
    return this.getCurrentWeatherOpenWeatherMapAPI(urlDate).pipe(
      map((value => {
        this.weatherData.currentConditions.day = value.daily[(urlDate.currentDate.getDate() - this.currentDay.getDate())]?.dt;
        this.weatherData.currentConditions.temp = value.daily[(urlDate.currentDate.getDate() - this.currentDay.getDate())]?.temp.day;
        this.weatherData.currentConditions.pressure = value.daily[(urlDate.currentDate.getDate() - this.currentDay.getDate())]?.pressure;
        // tslint:disable-next-line:max-line-length
        this.weatherData.currentConditions.windDirection = this.getWindDirectionFromDegreeAngle(value.daily[(urlDate.currentDate.getDate() - this.currentDay.getDate())]?.wind_deg);
        this.weatherData.currentConditions.windSpeed = value.daily[(urlDate.currentDate.getDate() - this.currentDay.getDate())]?.wind_speed;
        this.weatherData.currentConditions.clouds = value.daily[(urlDate.currentDate.getDate() - this.currentDay.getDate())]?.clouds;
        this.weatherData.currentConditions.humidity = value.daily[(urlDate.currentDate.getDate() - this.currentDay.getDate())]?.humidity;
        this.weatherData.futureCondtitions.day = value.daily[(urlDate.currentDate.getDate() - this.currentDay.getDate()) + 1]?.dt;
        this.weatherData.futureCondtitions.temp = value.daily[(urlDate.currentDate.getDate() - this.currentDay.getDate()) + 1]?.temp.day;
        // tslint:disable-next-line:max-line-length
        this.weatherData.futureCondtitions.pressure = value.daily[(urlDate.currentDate.getDate() - this.currentDay.getDate()) + 1]?.pressure;
        // tslint:disable-next-line:max-line-length
        this.weatherData.futureCondtitions.windDirection = this.getWindDirectionFromDegreeAngle(value.daily[(urlDate.currentDate.getDate() - this.currentDay.getDate()) + 1]?.wind_deg);
        // tslint:disable-next-line:max-line-length
        this.weatherData.futureCondtitions.windSpeed = value.daily[(urlDate.currentDate.getDate() - this.currentDay.getDate()) + 1]?.wind_speed;
        this.weatherData.futureCondtitions.clouds = value.daily[(urlDate.currentDate.getDate() - this.currentDay.getDate()) + 1]?.clouds;
        // tslint:disable-next-line:max-line-length
        this.weatherData.futureCondtitions.humidity = value.daily[(urlDate.currentDate.getDate() - this.currentDay.getDate()) + 1]?.humidity;
        return this.weatherData;
      }))
    );
  }

  getWeatherFromFutureLeft(urlDate: UrlData): Observable<WeatherData> {
    return this.getCurrentWeatherOpenWeatherMapAPI(urlDate).pipe(
      map((value => {
        this.weatherData.currentConditions.day = value.daily[(urlDate.currentDate.getDate() - this.currentDay.getDate())]?.dt;
        this.weatherData.currentConditions.temp = value.daily[(urlDate.currentDate.getDate() - this.currentDay.getDate())]?.temp.day;
        this.weatherData.currentConditions.pressure = value.daily[(urlDate.currentDate.getDate() - this.currentDay.getDate())]?.pressure;
        // tslint:disable-next-line:max-line-length
        this.weatherData.currentConditions.windDirection = this.getWindDirectionFromDegreeAngle(value.daily[(urlDate.currentDate.getDate() - this.currentDay.getDate())]?.wind_deg);
        this.weatherData.currentConditions.windSpeed = value.daily[(urlDate.currentDate.getDate() - this.currentDay.getDate())]?.wind_speed;
        this.weatherData.currentConditions.clouds = value.daily[(urlDate.currentDate.getDate() - this.currentDay.getDate())]?.clouds;
        this.weatherData.currentConditions.humidity = value.daily[(urlDate.currentDate.getDate() - this.currentDay.getDate())]?.humidity;
        this.weatherData.pastCondtitions.day = value.daily[(urlDate.currentDate.getDate() - this.currentDay.getDate()) - 1]?.dt;
        this.weatherData.pastCondtitions.temp = value.daily[((urlDate.currentDate.getDate() - this.currentDay.getDate())) - 1].temp.day;
        this.weatherData.pastCondtitions.pressure = value.daily[(urlDate.currentDate.getDate() - this.currentDay.getDate()) - 1].pressure;
        // tslint:disable-next-line:max-line-length
        this.weatherData.pastCondtitions.windDirection = this.getWindDirectionFromDegreeAngle(value.daily[(urlDate.currentDate.getDate() - this.currentDay.getDate()) - 1].wind_deg);
        // tslint:disable-next-line:max-line-length
        this.weatherData.pastCondtitions.windSpeed = value.daily[(urlDate.currentDate.getDate() - this.currentDay.getDate()) - 1].wind_speed;
        this.weatherData.pastCondtitions.clouds = value.daily[(urlDate.currentDate.getDate() - this.currentDay.getDate()) - 1].clouds;
        this.weatherData.pastCondtitions.humidity = value.daily[(urlDate.currentDate.getDate() - this.currentDay.getDate()) - 1].humidity;
        this.weatherData.futureCondtitions.day = undefined;
        this.weatherData.futureCondtitions.temp = undefined;
        this.weatherData.futureCondtitions.clouds = undefined;
        this.weatherData.futureCondtitions.humidity = undefined;
        this.weatherData.futureCondtitions.pressure = undefined;
        this.weatherData.futureCondtitions.windDirection = undefined;
        this.weatherData.futureCondtitions.windSpeed = undefined;
        return this.weatherData;
      }))
    );
  }

  getWindDirectionFromDegreeAngle(degreeAngle: number): string {
    let windDirection: string;
    if (degreeAngle >= 0 && degreeAngle < 90) {
      windDirection = 'С-В';
    } else if (degreeAngle >= 90 && degreeAngle < 180) {
      windDirection = 'Ю-В';
    } else if (degreeAngle >= 180 && degreeAngle < 270) {
      windDirection = 'Ю-З';
    } else if (degreeAngle >= 270 && degreeAngle <= 360) {
      windDirection = 'С-З';
    }
    return windDirection;
  }

  getPastData(urlDate: UrlData): Observable<any> {
    const APIKey = environment.openWeatherMapAPIKey;
    // tslint:disable-next-line:max-line-length
    const metadataURL = `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=51&lon=21&dt=${Math.floor(urlDate.currentDate.getTime() / 1000)}&appid=${APIKey}`;
    return this.http.get(metadataURL)
      .pipe(
        catchError(({error}) => {
          return throwError(error.message);
        })
      );
  }

  getPastDataAfter(urlDate: UrlData): Observable<any> {
    const APIKey = environment.openWeatherMapAPIKey;
    // tslint:disable-next-line:max-line-length
    const metadataURL = `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=51&lon=21&dt=${Math.floor((urlDate.currentDate.getTime() + (24 * 60 * 60 * 1000)) / 1000)}&appid=${APIKey}`;
    return this.http.get(metadataURL)
      .pipe(
        catchError(({error}) => {
          return throwError(error.message);
        })
      );
  }

  getPastDataBefore(urlData: UrlData): Observable<any> {
    const APIKey = environment.openWeatherMapAPIKey;
    // tslint:disable-next-line:max-line-length
    const metadataURL = `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=51&lon=21&dt=${Math.floor((urlData.currentDate.getTime() - (24 * 60 * 60 * 1000)) / 1000)}&appid=${APIKey}`;
    return this.http.get(metadataURL)
      .pipe(
        catchError(({error}) => {
          return throwError(error.message);
        })
      );
  }


  getCurrentWeatherOpenWeatherMapAPI(urlDate: UrlData): Observable<any> {
    const APIKey = environment.openWeatherMapAPIKey;
    // tslint:disable-next-line:max-line-length
    const openWeatherMapAPIURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${urlDate.latitude}&lon=${urlDate.longitude}&exclude=minutely,hourly,alerts&appid=${APIKey}`;
    return this.http.get(openWeatherMapAPIURL)
      .pipe(
        catchError(({error}) => throwError(error.message))
      );
  }

}
