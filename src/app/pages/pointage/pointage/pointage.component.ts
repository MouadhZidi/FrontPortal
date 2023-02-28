import { Component, OnInit } from '@angular/core';
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";

import { Module } from "@ag-grid-community/core";
import { PointageService } from '../pointage.service';
import { TokenStorage } from 'src/app/core/services/token-storage.service';
import * as moment from 'moment';
import { PersonnelService } from '../../Employe/personnel.service';
import * as jspdf from "jspdf";
import "jspdf-autotable";
import { DemandeService } from '../../demande/demande.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-pointage',
  templateUrl: './pointage.component.html',
  styleUrls: ['./pointage.component.scss']
})
export class PointageComponent implements OnInit {
  perso11 :any = {
    cod_soc:this.tokenService.getUser().cod_soc,
    mat_pers:this.tokenService.getUser().matpers}
    n:any
    matchef:any
 
  rowData: any[] = [];
  row: any = [];
  public columns = ["Matricule", "Numéro pointage", "Date pointage", "Heure pointage","Minute pointage","Numéro carte"];
  constructor(public translatee: TranslateService,private serv: PointageService , private tokenService: TokenStorage, private ser: PersonnelService,private demserv:DemandeService) { }

  ngOnInit() {
   
    this.getpers()
   
    const currentLang = this.translatee.getBrowserLang();
      this.translatee.onLangChange.subscribe(() => {
        this.columnDefs = this.columnDefs.map((col) => {
          col.headerName = this.translatee.instant(col.headerName,currentLang);
          return col;
        });
      });
    }
    changeLanguage() {
      const currentLanguage = this.serv.languageSubject.value;
      this.serv.setLanguage(currentLanguage === 'en' ? 'fr' : 'en');
    }
  
    translateHeaderNames(language: string) {
      this.columnDefs = this.columnDefs.map((col) => {
        col.headerName = this.translatee.instant(col.headerName, language);
        return col;
      });
    }
  getpers(){

    this.ser.getpersonnel(this.perso11).subscribe(
      data => {
        this.perso11 = data; console.log('exected' + data);
        this.n=this.perso11.cod_serv
        console.log("codserv"+this.n)
    this.GetPointageById()

      },
      err => {
        console.log(err);
      }
      );}
  GetPointageById() {
   
     
    this.serv.GetPointageById(this.n,this.tokenService.getUser().matpers).subscribe(
      (data: any[]) => {
        this.rowData = data;
        console.log("ddd"+this.rowData)

        for (var k = 0; k < this.rowData.length; k++) {
          this.row.push([
            this.rowData[k].id.mat_pers,
            this.rowData[k].num_point,
            this.rowData[k].id.date_point,
            this.rowData[k].id.h_point,
            this.rowData[k].id.min_point,
            this.rowData[k].n_carte,
        
          ]);
        }
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  columnDefs = [
    {
      headerName: "Matricule",
      field: "id.mat_pers",
      width: 170,
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
     
      
    },
    {
      headerName: "Numéro pointage",
      field: "num_point",
      width: 170,
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
     
      
    },
    {
      headerName: "Date pointage",
      field: "id.date_point",
      cellRenderer: (data) => {
        return moment(data.createdAt).format('DD/MM/YYYY')
    },
      filter: "agDateColumnFilter",
      resizable: true,
      sortable: true,
      floatingFilter: true,
      
      width: 200,

      filterParams: {
        // provide comparator function
        comparator: function (filterLocalDateAtMidnight: any, cellValue: any) {
          var dateAsString = cellValue;

          if (dateAsString == null) {
            return 0;
          }

          // In the example application, dates are stored as dd/mm/yyyy
          // We create a Date object for comparison against the filter date
          var dateParts = dateAsString.split("/");
          var year = Number(dateParts[2]);
          var month = Number(dateParts[1]) - 1;
          var day = Number(dateParts[0]);
          var cellDate = new Date(year, month, day);

          // Now that both parameters are Date objects, we can compare
          if (cellDate < filterLocalDateAtMidnight) {
            return -1;
          } else if (cellDate > filterLocalDateAtMidnight) {
            return 1;
          }
          return 0;
        },
      },
      editable: true,
      cellEditor: "primeCellEditor",
    },

    {
      headerName: "Heure pointage",
      field: "id.h_point",
      width: 300,
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      
      
    },

    {
      headerName: "Minute pointage",
      field: "id.min_point",
      width: 320,
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
     
      
    },

    {
      headerName: "Numéro carte",
      field: "n_carte",
      width: 300,
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      
      
    },
    
    
  ];

  defaultColDef = {
    sortable: true,
    filter: true,
  };


  exportAsXLSX() {
    this.ser.exportAsExcelFile(this.rowData, "Liste des Pointages");
  }

  public openPDF(): void {
    const doc = new jspdf("portrait", "px", "a4");
    doc.text(170, 15, "Liste des Pointages:");
    doc.autoTable(this.columns, this.row);
    let now=new Date()
    var today = now.getDate()+"/"+(now.getMonth()+1)+"/"+now.getFullYear();
    doc.setFont("serif");
    doc.setFontSize(10);
    var newdat = "Date: "+ today;
    doc.text(350,15,newdat);
    var pageCount = doc.internal.getNumberOfPages(); //Total Page Number
for(let i = 0; i < pageCount; i++) { 
  doc.setPage(i); 
  let pageCurrent = doc.internal.getCurrentPageInfo().pageNumber; //Current Page
  doc.setFontSize(12);
  doc.text('page: ' + pageCurrent + '/' + pageCount, 10, 10);
}
    doc.save("Liste des Pointages.pdf");
  }



  modules: Module[] = [ClientSideRowModelModule];
}
