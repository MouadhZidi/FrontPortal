import { ChartService } from "../../chart/chart.service";
import { AfterViewInit, Component, OnInit } from "@angular/core";
import { Color, Label } from "ng2-charts";
import { ChartDataSets, ChartType } from "chart.js";
import { TokenStorage } from "src/app/core/services/token-storage.service";

@Component({
  selector: "app-saas",
  templateUrl: "./saas.component.html",
  styleUrls: ["./saas.component.scss"],
})
export class SaasComponent implements OnInit, AfterViewInit {
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = "bar";

  sortie: number[];
  entree: number[];
  public barChartData: ChartDataSets[] = [{ data: [], label: "" }];
  list: any[] = [];
  breadCrumbItems: Array<{}>;
  lineAreaChart: ChartType;
  lineBarChart: ChartType;
  pieChart: ChartType;
  donutChart: ChartType;
  ScatterChart: ChartType;
  radarChart: ChartType;
  polarChart: ChartType;

  constructor(private serv: ChartService, private token: TokenStorage) {}
  ngAfterViewInit(): void {
    throw new Error("Method not implemented.");
  }

  ngOnInit() {
    this.breadCrumbItems = [
      { label: "Charts" },
      { label: "Chartjs chart", active: true },
    ];
    this.onSelect();
  }

  lineChartColors: Color[] = [
    {
      borderColor: "#34c38f",
      backgroundColor: "#556ee6",
    },
  ];

  onSelect() {
    this.barChartLabels = [];
    this.sortie = [];
    this.entree = [];

    this.serv
      .getConge(this.token.getUser().cod_soc, this.token.getUser().matpers)
      .subscribe((data: Object[]) => {
        this.list = data;
        console.log(this.list);
        data.forEach((element) => {
          this.entree.push(element["sold_cng"]);

          this.barChartLabels.push(element["annee_cng"]);
        });
        this.barChartData = [
          { data: this.entree, label: "Solde de congée par année" },
        ];
      });
  }
}
