import { Component, OnInit } from '@angular/core';
import { GridApi } from "ag-grid-community";
import { Module } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { TokenStorage } from 'src/app/core/services/token-storage.service';
import { PersonnelService } from '../personnel.service';
import * as jspdf from "jspdf";
import "jspdf-autotable";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-exprienceprof',
  templateUrl: './exprienceprof.component.html',
  styleUrls: ['./exprienceprof.component.scss']
})
export class ExprienceprofComponent implements OnInit {
  public columns = [ "Nom etablissement", "Fonction","Fonction equivalant","Date debut","Date fin","Année","Mois","Jour"];
  row:any=[]


  title = "grid";
  api!: GridApi;
  prs:any=[]
  rowData: any[]
  perso11 :any = {
    cod_soc:this.token.getUser().cod_soc,
    mat_pers:this.token.getUser().matpers
  };

  constructor(public translatee: TranslateService, private serv: PersonnelService,private token: TokenStorage) {}
  columnDefs = [
   

    {
      headerName: "Nom etablissement",
      field: "etablissement",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 200,
    },
   
      {
        headerName: "Fonction ",
        field: "emploi",
        editable: true,
        resizable: true,
        sortable: true,
        filter: true,
        floatingFilter: true,
        width: 150,
      },
    {
      headerName: "Fonction equivalant",
      field: "fonct_corr",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 150,
    },
    { headerName: "Date debut",
      field: "dat_emb",
      filter: "agDateColumnFilter",
      width:140,
      floatingFilter: true,

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
    }, {
      headerName: "Date fin",

      field: "dat_fin",
      filter: "agDateColumnFilter",
      width:150,
      floatingFilter: true,

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
      headerName: "Année",
      field: "wannee",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 100,
    },
    {
      headerName: "Mois",
      field: "wmois",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 100,
    },
    {
      headerName: "Jour",
      field: "wjours",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 100,
    },
   
  ];

  ngOnInit(): void {
    this.getFacture();
    this.serv.language$.subscribe((language) => {
      this.translateHeaderNames(language);
    });
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
  defaultColDef = {
    sortable: true,
    filter: true,
  };
  getFacture() {
    this.serv.getpersonnel(this.perso11).subscribe(
      (data: any[]) => {
        this.prs = data
        
        this.rowData=this.prs.etab


        console.log(this.prs.etab);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public openPDF():void {
 
    console.log(this.rowData);


    const doc = new jspdf("portrait", "px", "a4") 
    doc.text(170, 15, "Niveau d'instruction:")
  
      doc.autoTable(this.columns, this.prs.etab);
  
      doc.save("Niveau d'instruction.pdf");
  
    }

  modules: Module[] = [ClientSideRowModelModule];
}