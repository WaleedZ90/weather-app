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
  private currentLocation: any = {};

  constructor(private http: HttpClient) {
    // this._getLocation(this._setLocation);
    // this.getWeatherByLocation();
  }

  // TODO: getWeatherByLocation
  _setLocation(position: any) {
    debugger;
    this.currentLocation = position;

  }

  _getLocation(callback): void {
    if (window.navigator.geolocation) {
      // navigator.geolocation.getCurrentPosition(function(position) {
      //   if(callback) {
      //     callback(position.coords);
      //   }
      // });

      window.navigator.geolocation.getCurrentPosition(
        (position) => {
          /* Location tracking code */
          this.currentLocation = position.coords;
          // callback(position.coords);
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

  getWeatherByLocation(): void {
    debugger;
  }

  getCityWeatherDetails(cityName: string = "Egypt") {
    return this.http.get(`${this._baseUrl}&num_of_days=5&includelocation=yes&tp=24&q=${cityName}`);
  }

  sayHi() {
    console.log("Hi from the weather service");
  };
}
