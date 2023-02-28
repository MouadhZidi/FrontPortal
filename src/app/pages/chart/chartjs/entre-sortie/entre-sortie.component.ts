import { Component, Input, OnInit } from '@angular/core';
import { ChartService } from '../../chart.service';
import { Color, Label } from 'ng2-charts';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-entre-sortie',
  templateUrl: './entre-sortie.component.html',
  styleUrls: ['./entre-sortie.component.scss']
})
export class EntreSortieComponent implements OnInit {

  @Input() ann:string


  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
 
  sortie:number[];
entree:number[];
  public barChartData: ChartDataSets[] = [
    { data: [], label: 'Nombre des entrées' },
    { data: [], label: 'Nombre des sorties' }

  ];
  list:any[]=[]
  // bread crumb items
  breadCrumbItems: Array<{}>;

  // Line Chart
  lineAreaChart: ChartType;
  // Bar Chart
  lineBarChart: ChartType;
  // Pie Chart
  pieChart: ChartType;
  // Donut Chart
  donutChart: ChartType;
  // Polar area Chart
  ScatterChart: ChartType;
  // Radar Chart
  radarChart: ChartType;
  // polarChart
  polarChart: ChartType;

  constructor(private serv :ChartService) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Charts' }, { label: 'Chartjs chart', active: true }];
this.onSelect()
   /**
    * Fetches the data
    */
    
  }
  // public barChartOptions: ChartOptions = {
  //   responsive: true,
  //   // We use these empty structures as placeholders for dynamic theming.
  //   scales: { xAxes: [{}], yAxes: [{}] },
  //   plugins: {
  //     datalabels: {
  //       anchor: 'end',
  //       align: 'end',
  //       font: {
  //         size: 20,
  //       }
  //     }
  //   }
  // };
  lineChartColors: Color[] = [
    {
      borderColor: '#34c38f',
      backgroundColor: '#556ee6', 
     
    },
  ];
  /**
   * Fetch chart's data
   */
  // private _fetchData() {
  //   // Line Chart data
  //   this.lineAreaChart = lineAreaChart;
  //   // Bar Chart data
  //   this.lineBarChart = lineBarChart;
  //   // Pie Chart data
  //   this.pieChart = pieChart;
  //   // Donut Chart
  //   this.donutChart = donutChart;

  //   // Radar Chart data
  //   this.radarChart = radarChart;
  //   // Financial Report
  //   this.polarChart = polarChart;
  // }
  onSelect(){
  this.barChartLabels=[]
    this.sortie=[]
    this.entree=[]

    this.serv.GetDepartEntreSortie().subscribe((data:Object[])=>{
      
     this.list=data
     console.log(this.list)
      data.forEach(element => {

        this.entree.push(element["entree"]);
        this.sortie.push(element["sortie"]);

        this.barChartLabels.push(element["date_HIST"]);


      });
       this.barChartData=[
         { data: this.entree,
            label: 'Nombre des entrées' },
            { data: this.sortie,
              label: 'Nombre des sorties' },
       ]
    })
  


  }
}
