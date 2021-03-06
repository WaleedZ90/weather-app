import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather/weather.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  weatherDetailsArray: any = [];
  searchQuery: string = "";
  hasError: boolean = false;
  errorMessage: string = "";

  constructor(private _weatherService: WeatherService) { }

  ngOnInit() {
    // Detecting Location here
    this._weatherService._getLocation(position => this.detectLocation(position));
    // Dummy Location
    this._weatherService.getCityWeatherDetails('London')
      .subscribe((res: any) => {
        const weatherDetails = this.mapWeatherResponse(res);
        this.weatherDetailsArray.push(weatherDetails);
      });
  }

  detectLocation (position) {
    const latLang = `${position.latitude},${position.longitude}`;
    this._weatherService.getCityWeatherDetails(latLang)
      .subscribe((res: any) => {
        const weatherDetails = this.mapWeatherResponse(res);
        this.weatherDetailsArray.push(weatherDetails);
      });
  }

  searchCountry() {
    this._weatherService.getCityWeatherDetails(this.searchQuery)
      .subscribe((res: any) => {
        if (res.data.error) {
          this.hasError = true;
          this.errorMessage = res.data.error[0].msg;
          return;
        }

        this.weatherDetailsArray = [];
        const weatherDetails = this.mapWeatherResponse(res);
        this.weatherDetailsArray.push(weatherDetails);
      });
  }

  mapWeatherResponse(res: any): any {
    const weatherDetails = {
      latitude: res.data.nearest_area[0].latitude,
      longitude: res.data.nearest_area[0].latitude,
      country: res.data.nearest_area[0].country[0].value,
      areaName: res.data.nearest_area[0].areaName[0].value,
      current_condition: {
        temp_C: res.data.current_condition[0].temp_C,
        weatherCode: res.data.current_condition[0].weatherCode,
        weatherIconUrl: res.data.current_condition[0].weatherIconUrl[0].value,
        weatherDesc: res.data.current_condition[0].weatherDesc[0].value,
        FeelsLikeC: res.data.current_condition[0].FeelsLikeC,
        windspeedKmph: res.data.current_condition[0].windspeedKmph,
        winddir16Point: res.data.current_condition[0].winddir16Point,
        humidity: res.data.current_condition[0].humidity,
        visibility: res.data.current_condition[0].visibility,
        pressure: res.data.current_condition[0].pressure,
        cloudcover: res.data.current_condition[0].cloudcover
      }
    };

    return weatherDetails;
  }
}
