import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { DashboardService } from '../../services/dashboard.service';
import { AirConditionerService } from '../../services/air-conditioner.service';
import * as Chartist from 'chartist';
import { LightsService } from '../../services/lights.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // variables
  airConditioners: any;
  lights: any;
  constructor(
    private _LightsService: LightsService,
    private _DashboardService: DashboardService,
    private _AirConditionerService: AirConditionerService
  ) { }

  ngOnInit() {
    this._LightsService.getLights().subscribe(data => {
      this.lights = data.data
    });

    this._AirConditionerService.getAirConditioners().subscribe(data => {
      this.airConditioners = data.data;

      this.setCharts();
    })
  }


  mathRandom() {
    return Math.random() * (100 - 1);
  }


  setCharts() {
    const dataDailySalesChart: any = {
      labels: ['', '', '', '', '', '', ''],
      series: [
        [17, 25, 22, 30, 23, 30, 17]
      ]
    };

    const optionsDailySalesChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
    }

    var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

    this.startAnimationForLineChart(dailySalesChart);


    const dataDailySalesChart1: any = {
      labels: ['', '', '', '', '', '', ''],
      series: [
        [30, 30, 25, 17, 23, 22, 17]
      ]
    };

    const optionsDailySalesChart1: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
    }

    var dailySalesChart = new Chartist.Line('#dailySalesChart1', dataDailySalesChart1, optionsDailySalesChart1);

    this.startAnimationForLineChart(dailySalesChart);



    const dataDailySalesChart2: any = {
      labels: ['', '', '', '', '', '', ''],
      series: [
        [17, 30, 17, 30, 23, 28, 30]
      ]
    };

    const optionsDailySalesChart2: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
    }

    var dailySalesChart = new Chartist.Line('#dailySalesChart2', dataDailySalesChart2, optionsDailySalesChart2);

    this.startAnimationForLineChart(dailySalesChart);


  }

  startAnimationForLineChart(chart) {
    let seq: any, delays: any, durations: any;
    seq = 0;
    delays = 80;
    durations = 500;

    chart.on('draw', function (data) {
      if (data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } else if (data.type === 'point') {
        seq++;
        data.element.animate({
          opacity: {
            begin: seq * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq = 0;
  };
}
