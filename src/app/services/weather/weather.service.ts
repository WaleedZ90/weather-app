import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
// import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private _baseUrl = "http://api.worldweatheronline.com/premium/v1/weather.ashx?key=9d1f74d88c094993aeb141716182910&format=json";

  constructor(private http: HttpClient) {}

  _getLocation(callback): void {
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        (position) => {
          callback(position.coords);
        },
        (failure) => {
          if (failure.message.indexOf("Only secure origins are allowed") == 0) {
            alert('Only secure origins are allowed by your browser.');
          }
        }
      );
    }
    else {
      console.log("Your browser doesn't support geolocation");
    }
  }

  getCityWeatherDetails(cityName: string = "Egypt") {
    return this.http.get(`${this._baseUrl}&num_of_days=5&includelocation=yes&tp=24&q=${cityName}`);
  }
}
