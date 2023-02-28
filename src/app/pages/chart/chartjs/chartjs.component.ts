import { Component, OnInit,ViewChild,ChangeDetectorRef } from "@angular/core";
import { ChartService } from "../chart.service";
import { Color, Label } from "ng2-charts";
import { ChartDataSets, ChartType ,ChartOptions} from "chart.js";
import { BaseChartDirective } from 'ng2-charts/ng2-charts';

@Component({
  selector: "app-chartjs",
  templateUrl: "./chartjs.component.html",
  styleUrls: ["./chartjs.component.scss"],
})
export class ChartjsComponent implements OnInit {
  public barChartLabelsDef: Label[] = [];
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = "pie";
  public barChartLabelsEntreSortie: Label[] = [];
  public barChartTypeEntreSortie: ChartType = "bar";
  public barChartTypeDef: ChartType = 'horizontalBar';

  @ViewChild("baseChart", { static: false }) chart: BaseChartDirective;


  public barChartLabelsByLib: Label[] = [];
  public chartLabels: Label[] = [];

  public barChartTypeByLib: ChartType = 'bar';
  lstNbrByLib:number[];
  lstNbrrByLib:number[];
  lstNbrDef:number[];
  lstNbrr:number[];

  lstNbr: number[];
  sortie: number[];
  entree: number[];
  public barChartDataDef: ChartDataSets[] = [
    { data: [], label: 'Series A' },

  ];

  public barChartData: ChartDataSets[] = [{ data: [], label: "Series A" }];
  public barChartDataEntreSortie: ChartDataSets[] = [
    { data: [], label: "Nombre des entrées" },
    { data: [], label: "Nombre des sorties" },
  ];
  list: any[] = [];

  public barChartDataByLib: ChartDataSets[] = [
    { data: [], label: 'Series A' },

  ];

  breadCrumbItems: Array<{}>;
  lineAreaChart: ChartType;
  lineBarChart: ChartType;
  pieChart: ChartType;
  donutChart: ChartType;
  ScatterChart: ChartType;
  radarChart: ChartType;
  polarChart: ChartType;

  constructor(private serv: ChartService,private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.breadCrumbItems = [
      { label: "Charts" },
      { label: "Chartjs chart", active: true },
    ];
    this.onSelectEntreSortie();
    this.chart
  }
  lineChartColorsEntreSortie: Color[] = [
    {
      borderColor: "#34c38f",
      backgroundColor: "#556ee6",
    },
  ];

  lineChartColors: Color[] = [
    {
      borderColor: ["#556ee6", "#86C7F3"],
      backgroundColor: ["#556ee6", "#86C7F3"],
    },
  ];


  public barChartOptionsByLib: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{ticks: {  beginAtZero: true }}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
        font: {
          size: 20,
        }
      }
    }
  };


  public barChartLegendByLib = true;

  lineChartColorsByLib: Color[] = [
    {
      borderColor: '#34c38f',
      backgroundColor: '#556ee6', 
    },
  ];

  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public barChartOptionsDef: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{ticks: {  beginAtZero: true }}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
        font: {
          size: 20,
        }
      }
    }
  };
  public barChartLegendDef = true;

  lineChartColorsDef: Color[] = [
    {
      borderColor: '#34c38f',
      backgroundColor: '#86c7f3', 
    },
  ];

  public randomize(): void {
    // Only Change 3 values
    const data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    const clone = JSON.parse(JSON.stringify(this.barChartDataByLib));
    clone[0].data = data;
    this.barChartDataByLib = clone;
    /**
     * (My guess), for Angular to recognize the change in the dataset
     * it has to change the dataset variable directly,
     * so one way around it, is to clone the data, change it and then
     * assign it;
     */
  }


  onSelect(event: any) {
    this.barChartLabels = [];
    this.lstNbr = [];

    this.serv
      .GetAbsantiesmeBySexe(event.target.value)
      .subscribe((data: Object[]) => {
        this.list = data;
        console.log(this.list);
        data.forEach((element) => {
          this.lstNbr.push(element["d"]);
          this.barChartLabels.push(element["sexe"]);
        });
        this.barChartData = [
          { data: this.lstNbr, label: "Nombre de jour de congé" },
        ];
      });
  }

  onSelectEntreSortie() {
    this.barChartLabelsEntreSortie = [];
    this.sortie = [];
    this.entree = [];

    this.serv.GetDepartEntreSortie().subscribe((data: Object[]) => {
      this.list = data;
      console.log(this.list);
      data.forEach((element) => {
        this.entree.push(element["entree"]);
        this.sortie.push(element["sortie"]);

        this.barChartLabelsEntreSortie.push(element["date_HIST"]);
      });
      this.barChartDataEntreSortie = [
        { data: this.entree, label: "Nombre des entrées" },
        { data: this.sortie, label: "Nombre des sorties" },
      ];
    });
  }

  getChartt(event:any){
    this.barChartLabelsByLib=[]
  
      this.lstNbrByLib=[]
      this.serv.GetAbsantiesmeByLibelle(event.target.value).subscribe((data:Object[])=>{
        
       this.list=data
       console.log(this.list)
        data.forEach(element => {
  
          this.lstNbrByLib.push(element["nombre"]);
          this.barChartLabelsByLib.push(element["lib_mot"]);
  
  
  
        });
  
        this.lstNbrrByLib = this.lstNbrByLib
        this.cdRef.detectChanges();
        this.chartLabels = this.barChartLabelsByLib
         this.barChartDataByLib=[
           { data: this.lstNbrrByLib,
              label: 'Nombre de jour de congé' },
         ]
      })
    
  
  
    }

    getChartDef(event:any){
      this.barChartLabelsDef=[]
          this.lstNbrDef=[]
          this.serv.GetDepartDefinitive(event.target.value).subscribe((data:Object[])=>{
            
           this.list=data
           console.log(this.list)
            data.forEach(element => {
      
              this.lstNbrDef.push(element["total"]);
              this.barChartLabelsDef.push(element["lib_TYP_DEPART"]);
      
      
      
            });
      
      
             this.barChartDataDef=[
               { data: this.lstNbrDef,
                  label: 'Nombre de jour de congé' },
             ]
          })
        
      
      
        }
   getChart(event:any){
          this.barChartLabels = [];
          this.lstNbr = [];

          this.barChartLabelsByLib=[]
          this.barChartLabelsDef=[]
          this.lstNbrDef=[]
          this.lstNbrByLib=[]
          this.serv
            .GetAbsantiesmeBySexe(event.target.value)
            .subscribe((data: Object[]) => {
              this.list = data;
              console.log(this.list);
              data.forEach((element) => {
                this.lstNbr.push(element["d"]);
                this.barChartLabels.push(element["sexe"]);
              });
              this.barChartData = [
                { data: this.lstNbr, label: "Nombre de jour de congé" },
              ];
            });


            this.serv.GetAbsantiesmeByLibelle(event.target.value).subscribe((data:Object[])=>{
        
              this.list=data
              console.log(this.list)
               data.forEach(element => {
         
                 this.lstNbrByLib.push(element["nombre"]);
                 this.barChartLabelsByLib.push(element["lib_mot"]);
         
         
         
               });
         
               this.lstNbrrByLib = this.lstNbrByLib
               this.cdRef.detectChanges();
               this.chartLabels = this.barChartLabelsByLib
                this.barChartDataByLib=[
                  { data: this.lstNbrrByLib,
                     label: 'Nombre de jour de congé' },
                ]
             })

             this.serv.GetDepartDefinitive(event.target.value).subscribe((data:Object[])=>{
            
              this.list=data
              console.log(this.list)
               data.forEach(element => {
         
                 this.lstNbrDef.push(element["total"]);
                 this.barChartLabelsDef.push(element["lib_TYP_DEPART"]);
         
         
         
               });
         
         
                this.barChartDataDef=[
                  { data: this.lstNbrDef,
                     label: 'Nombre de jour de congé' },
                ]
             })
        }
}
