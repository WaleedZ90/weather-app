import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather/weather.service';
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
    public selectedCountry: string = null;

    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true
    };

    public barChartLabels: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    public barChartType: string = 'bar';
    public barChartLegend: boolean = true;

    public barChartData: any[] = [
        { data: [], label: 'Avg Minimum Temperature' },
        { data: [], label: 'Avg Maximum Temperature' }
    ];

    weatherCalendar: any[];

    constructor(private _weatherService: WeatherService, private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.selectedCountry = params['id'];
            this._weatherService.getCityWeatherDetails(params['id'])
                .subscribe((res: any) => {
                    let weatherData =
                        res.data.weather.map(weather => {
                            const day = moment(weather.date, 'YYYY-MM-DD').format('dddd').toString();
                            return <any>{
                                day,
                                minTemp: weather.mintempC,
                                maxTemp: weather.maxtempC,
                                weatherIconUrl: weather.hourly[0].weatherIconUrl[0].value,
                                weatherDesc: weather.hourly[0].weatherDesc[0].value
                            };
                        });

                    this.weatherCalendar = weatherData;

                    let climateAverages = res.data.ClimateAverages.map(climate => {
                        return climate.month.map(c => {
                            return <any>{
                                name: c.name,
                                avgMinTemp: c.avgMinTemp,
                                absMaxTemp: c.absMaxTemp,
                                index: c.index
                            };
                        });
                    });

                    this.barChartLabels = climateAverages[0].map((c: any) => c.name);
                    let chartData = [
                        {
                            data: climateAverages[0].map((c: any) => c.avgMinTemp),
                            label: 'Avg Minimum Temperature'
                        },
                        {
                            data: climateAverages[0].map((c: any) => c.absMaxTemp),
                            label: 'Avg Maximum Temperature'
                        },
                    ];

                    let clone = JSON.parse(JSON.stringify(this.barChartData));
                    clone[0].data = chartData[0].data;
                    clone[1].data = chartData[1].data;
                    this.barChartData = clone;
                });
        });
    }

}
