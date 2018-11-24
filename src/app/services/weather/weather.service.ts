import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';

@Injectable()

export class WeatherService {

  constructor(public http: HttpClient) { }

  getCurrentCity(): Subject<string> {
    const dataSubject = new Subject<string>();
    this.http.get(
      `http://api.ipapi.com/api/check?access_key=945de79e24884a58b9d11d736032eae0&fields=city&language=ua`)
      .subscribe((fields: any) => {
        dataSubject.next(String(fields.city));
      });
    return dataSubject;
  }
  getCurrentTemp(city: string): Subject<number> {
    const dataSubject = new Subject<number>();
    this.http.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=1f4c8fb14ddff2f1dce8233dbc5338df`)
      .subscribe((weather: any) => {
        dataSubject.next(Math.round(Number(weather.main.temp)));
      });
    return dataSubject;
  }
  getForecast(city: string): Subject<Array<any>> {
    const dataSubject = new Subject<Array<any>>();
    this.http.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=1f4c8fb14ddff2f1dce8233dbc5338df`)
      .subscribe((weather: any) => {
        dataSubject.next(weather.list);
      });
    return dataSubject;
  }
  getWeatherState(city: string): Subject<string> {
    const dataSubject = new Subject<string>();
    this.http.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=1f4c8fb14ddff2f1dce8233dbc5338df`)
      .subscribe((data) => {
        dataSubject.next(data['weather'][0].main);
      });
    return dataSubject;
  }
  getCurrentWind(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<number> {
    const dataSubject = new Subject<number>();
    this.http.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${metric}&APPID=1f4c8fb14ddff2f1dce8233dbc5338df`)
      .subscribe((weather: any) => {
        dataSubject.next(Math.round(Math.round(weather.wind.speed)));
      });
    return dataSubject;
  }
  getCurrentHum(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<number> {
    const dataSubject = new Subject<number>();
    this.http.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${metric}&APPID=1f4c8fb14ddff2f1dce8233dbc5338df`)
      .subscribe((weather: any) => {
        console.log(weather);
        dataSubject.next(weather.main.humidity);
      });
    return dataSubject;
  }


}
