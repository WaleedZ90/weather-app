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
    public barChartLabels: string[] = ["January", 'February', "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    public barChartType = 'bar';
    public barChartLegend = true;
    public barChartData: any[] = [
        { data: [], label: 'Avg Minimum Temperature' },
        { data: [], label: 'Avg Maximum Temperature' }
    ];
    public barChartColors: Array<any> = [
        { // Purple
            backgroundColor: 'rgba(155,89,182,0.4)',
            borderColor: 'rgba(155,89,182,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(155,89,182,0.8)'
        },
        { // Blue
            backgroundColor: 'rgba(11,131,218,0.4)',
            borderColor: 'rgba(11,131,218,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(11,131,218,0.8)'
        }
    ];

    weatherCalendar: any[];

    // lineChart
    public lineChartData: Array<any> = [
        { data: [10, 15, 18, 15, 25, 31, 23, 40, 30, 25, 16], label: 'Temperature in Celsius' }
    ];
    public lineChartLabels: Array<any> = ['12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM'];
    public lineChartOptions: any = {
        responsive: true
    };
    public lineChartColors: Array<any> = [
        { // Purple
            backgroundColor: 'rgba(155,89,182,0.2)',
            borderColor: 'rgba(155,89,182,0.4)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(155,89,182,0.8)'
        }
    ];
    public lineChartLegend = true;
    public lineChartType = 'line';

    constructor(private _weatherService: WeatherService, private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.selectedCountry = params['id'];
            this._weatherService.getCityWeatherDetails(params['id'])
                .subscribe((res: any) => {
                    const weatherData =
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

                    const climateAverages = res.data.ClimateAverages.map(climate => {
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
                    const chartData = [
                        {
                            data: climateAverages[0].map((c: any) => c.avgMinTemp),
                            label: 'Avg Minimum Temperature'
                        },
                        {
                            data: climateAverages[0].map((c: any) => c.absMaxTemp),
                            label: 'Avg Maximum Temperature'
                        },
                    ];

                    const clone = JSON.parse(JSON.stringify(this.barChartData));
                    clone[0].data = chartData[0].data;
                    clone[1].data = chartData[1].data;
                    this.barChartData = clone;
                });
        });
    }

}
