import { Component, OnInit } from '@angular/core';

import { ChartType } from './chartist.model';

import {
  linewithDataChart, basicColumChart, columnlabelChart, lineColumAreaChart,
  basicRadialBarChart, simplePieChart, donutChart, barChart, splineAreaChart, dashedLineChart,pieChart
} from './data';

@Component({
  selector: 'app-chartist',
  templateUrl: './chartist.component.html',
  styleUrls: ['./chartist.component.scss']
})

/**
 * Chartist-chart component
 */
export class ChartistComponent implements OnInit {

 // bread crumb items
 breadCrumbItems: Array<{}>;

 linewithDataChart: ChartType;
 basicColumChart: ChartType;
 columnlabelChart: ChartType;
 lineColumAreaChart: ChartType;
 basicRadialBarChart: ChartType;
 simplePieChart: ChartType;
 donutChart: ChartType;
 barChart: ChartType;
 splineAreaChart: ChartType;
 dashedLineChart: ChartType;

 pieChart: ChartType;

 constructor() { }

 ngOnInit() {
   this.breadCrumbItems = [{ label: 'Charts' }, { label: 'Apex charts', active: true }];

   /**
    * Fethches the chart data
    */
   this._fetchData();
 }

 /**
  * Fetches the chart data
  */
 private _fetchData() {
   this.linewithDataChart = linewithDataChart;
   this.basicColumChart = basicColumChart;
   this.columnlabelChart = columnlabelChart;
   this.lineColumAreaChart = lineColumAreaChart;
   this.basicRadialBarChart = basicRadialBarChart;
   this.simplePieChart = simplePieChart;
   this.donutChart = donutChart;
   this.barChart = barChart;
   this.splineAreaChart = splineAreaChart;
   this.dashedLineChart = dashedLineChart;

   this.pieChart = pieChart;
   
 }
}
