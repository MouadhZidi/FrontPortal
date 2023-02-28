import { Component, OnInit } from '@angular/core';
import { TokenStorage } from 'src/app/core/services/token-storage.service';
import { PointageService } from '../../pointage.service';
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import * as moment from 'moment';
import { Module } from "@ag-grid-community/core";
import { PersonnelService } from 'src/app/pages/Employe/personnel.service';
import * as jspdf from "jspdf";
import "jspdf-autotable";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-autorisation',
  templateUrl: './autorisation.component.html',
  styleUrls: ['./autorisation.component.scss']
})
export class AutorisationComponent implements OnInit {
  public columns = ["Matricule", "Date début", "Libélle autorisation", "Heure retour","Min sortie","Min retour","Durée"];

  rowData: any[] = [];
  row: any = [];

  constructor(private serv: PointageService , private tokenService: TokenStorage
    ,private ser: PersonnelService,private translatee:TranslateService) { }

  ngOnInit(){
    this.GeAutorisationById();

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

  GeAutorisationById() {
    this.serv.GeAutorisationById("1F0", "10326").subscribe(
      (data: any[]) => {
        this.rowData = data;
        for (var k = 0; k < this.rowData.length; k++) {
          this.row.push([
            this.rowData[k].id.mat_pers,
            this.rowData[k].dat_debut_aut,
            this.rowData[k].lib_aut,
            this.rowData[k].heur_r,
            this.rowData[k].id.min_point,
            this.rowData[k].min_s,
            this.rowData[k].min_r,
            this.rowData[k].duree_m,
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
      headerName: "Date début",
      field: "dat_debut_aut",
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
      headerName: "Libélle autorisation",
      field: "lib_aut",
      width: 580,
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      
      
    },

    {
      headerName: "Heure retour",
      field: "heur_r",
      width: 150,
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      
      
    },

    {
      headerName: "Min sortie",
      field: "min_s",
      width: 150,
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
    
      
    },

    
    
    {
      headerName: "Min retour",
      field: "min_r",
      width: 170,
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
     
      
    },


    {
      headerName: "Durée",
      field: "duree_m",
      width: 130,
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
  
      
    },


  ];


  exportAsXLSX() {
    this.ser.exportAsExcelFile(this.rowData, "Liste des autorisations");
  }

  public openPDF(): void {
    const doc = new jspdf("portrait", "px", "a4");
    doc.text(170, 15, "Liste des autorisations:");
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
    doc.save("Liste des autorisations.pdf");
  }

  defaultColDef = {
    sortable: true,
    filter: true,
  };



  modules: Module[] = [ClientSideRowModelModule];
}

