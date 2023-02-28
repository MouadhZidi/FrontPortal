import { Component, OnInit, ViewChild } from '@angular/core';
import { emailSentBarChart, monthlyEarningChart } from './data';
import { ChartType } from './dashboard.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventService } from '../../../core/services/event.service';

import { ConfigService } from '../../../core/services/config.service';
import { PersonnelService } from '../../Employe/personnel.service';
import { TokenStorage } from 'src/app/core/services/token-storage.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {
listsanc:any=[]
soldactueele:any



selectedElement: string = 'element1';
elements = [
  {
    libelle:'Code echelon',
    avatar:'mdi mdi-account-alert',
    color:'bg-info',
    code:'cod_ech'
  },
  {
    libelle:'Date echelon',
    avatar:'mdi mdi-alert-decagram',
    color:'bg-danger',
    code:'dat_ech'
  },
  {
    libelle:'Nombre enfant',
    avatar:'mdi mdi-update',
    color:'bg-dark',
    code:'nbre_enf'
  },

  {
    libelle:'Niveau salariale',
    avatar:'mdi mdi-sleep',
    color:'bg-primary',
    code:'niv_sal'
  },
  {
    libelle:'Solde actuelle',
    avatar:'mdi mdi-update',
    color:'bg-success',
    code:'lastsoldecng'
  },
  {
    libelle:'Numéro retraite',
    avatar:'mdi mdi-altimeter',
    color:'bg-primary',
    code:'num_retr'
  },
  {
    libelle:'Date ambauche',
    avatar:'mdi mdi-animation-outline',
    color:'bg-secondary',
    code:'dat_emb'
  },
  {
    libelle:'Date grade',
    avatar:'mdi mdi-arch',
    color:'bg-warning',
    code:'dat_grad'
  }
 
]
selectedElements = {
  'Code echelon':true,
  'Date echelon':true,
 'Nombre enfant':true,
  'Niveau salariale':true,
  'Solde actuelle':false,
  'Numéro retraite':false,
  'Date ambauche':false,
  'Date grade':false
};


soldeConge:any=[]
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
  pers:any = {
    cod_soc:this.token.getUser().cod_soc,
    mat_pers:this.token.getUser().matpers}
  isVisible: string;

  emailSentBarChart: ChartType;
  monthlyEarningChart: ChartType;
  transactions: Array<[]>;
  statData: Array<[]>;
role=this.token.getUser().role_portail
  isActive: string;

  @ViewChild('content') content;
  constructor(private modalService: NgbModal, private configService: ConfigService, private eventService: EventService,
    private serv:PersonnelService,private token:TokenStorage) {
  }

  ngOnInit() {
    this.getsoldeactuelle()
    this.GetSanction();
    this.getpers();
    this.getSoldeConge();

    /**
     * horizontal-vertical layput set
     */
     const attribute = document.body.getAttribute('data-layout');

     this.isVisible = attribute;
     const vertical = document.getElementById('layout-vertical');
     if (vertical != null) {
       vertical.setAttribute('checked', 'true');
     }
     if (attribute == 'horizontal') {
       const horizontal = document.getElementById('layout-horizontal');
       if (horizontal != null) {
         horizontal.setAttribute('checked', 'true');
         console.log(horizontal);
       }
     }

    /**
     * Fetches the data
     */
    this.fetchData();
  }

  getsoldeactuelle(){ this.serv.getlassolde(this.token.getUser().cod_soc,this.token.getUser().matpers).subscribe(
    (data:any) => {
      this.soldactueele=data[0];
  


    },
    err => {
      console.log(err);
    }
  )
}
  

  // ngAfterViewInit() {
  //   setTimeout(() => {
  //     this.openModal();
  //   }, 2000);
  // }

  /**
   * Fetches the data
   */
  private fetchData() {
    this.emailSentBarChart = emailSentBarChart;
    this.monthlyEarningChart = monthlyEarningChart;

    this.isActive = 'year';
    this.configService.getConfig().subscribe(data => {
      this.transactions = data.transactions;
      this.statData = data.statData;
    });
  }

  openModal() {
    this.modalService.open(this.content, { centered: true });
  }
  getpers(){

    this.serv.getpersonnel(this.pers).subscribe(
      data => {
        this.pers = data; console.log('PERSSSS' + data);
       
      },
      err => {
        console.log(err);
      }
      );}

      getSoldeConge(){
    this.serv.getSoldeConge(this.token.getUser().matpers,this.token.getUser().cod_soc).subscribe(
      data => {
        this.soldeConge=data;
        console.log (this.soldeConge)
      },
      err => {
        console.log(err);
      }
    )
  }

  GetSanction(){
    this.serv.getSanction(this.token.getUser().matpers,this.token.getUser().cod_soc).subscribe(
      data => {
        this.listsanc=data;
        console.log (this.listsanc)
      },
      err => {
        console.log(err);
      }
    )
  }

  weeklyreport() {
    this.isActive = 'week';
    this.emailSentBarChart.series =
      [{
        name: 'Series A',
         data: [44, 55, 41, 67, 22, 43, 36, 52, 24, 18, 36, 48]
      }, {
        name: 'Series B',
        data: [11, 17, 15, 15, 21, 14, 11, 18, 17, 12, 20, 18]
      }, {
        name: 'Series C',
        data: [13, 23, 20, 8, 13, 27, 18, 22, 10, 16, 24, 22]
      }];
  }

  monthlyreport() {
    this.isActive = 'month';
    this.emailSentBarChart.series =
      [{
        name: 'Series A',
         data: [44, 55, 41, 67, 22, 43, 36, 52, 24, 18, 36, 48]
      }, {
        name: 'Series B',
        data: [13, 23, 20, 8, 13, 27, 18, 22, 10, 16, 24, 22]
      }, {
        name: 'Series C',
        data: [11, 17, 15, 15, 21, 14, 11, 18, 17, 12, 20, 18]
      }];
  }

  yearlyreport() {
    this.isActive = 'year';
    this.emailSentBarChart.series =
      [{
        name: 'Series A',
         data: [13, 23, 20, 8, 13, 27, 18, 22, 10, 16, 24, 22]
      }, {
        name: 'Series B',
        data: [11, 17, 15, 15, 21, 14, 11, 18, 17, 12, 20, 18]
      }, {
        name: 'Series C',
        data: [44, 55, 41, 67, 22, 43, 36, 52, 24, 18, 36, 48]
      }];
  }  


  /**
   * Change the layout onclick
   * @param layout Change the layout
   */
   changeLayout(layout: string) {
    this.eventService.broadcast('changeLayout', layout);
  }

}
