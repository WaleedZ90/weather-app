import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  _baseUrl = "http://api.worldweatheronline.com/premium/v1/weather.ashx?key=9d1f74d88c094993aeb141716182910&";
  currentLocation: any = {};

  constructor() {
    this._getLocation(this._setLocation);
    // this.getWeatherByLocation();
  }

  // TODO: getWeatherByLocation
  _setLocation(position: any) {
    debugger;
    this.currentLocation = position;
    
  }

  _getLocation(callback) {
    if (window.navigator.geolocation) {
      // navigator.geolocation.getCurrentPosition(function(position) {
      //   if(callback) {
      //     callback(position.coords);
      //   }
      // });

      window.navigator.geolocation.getCurrentPosition(
        (position) => {
          /* Location tracking code */
          debugger;
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

  getWeatherByLocation() {
    debugger;
  }

  sayHi() {
    console.log("Hi from the weather service");
  };
}
