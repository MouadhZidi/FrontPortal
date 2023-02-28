import { Component, OnInit } from '@angular/core';
import { GridApi } from "ag-grid-community";
import { Module } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { CompreelService } from '../compreel.service';
import { TokenStorage } from 'src/app/core/services/token-storage.service';
import { PersonnelService } from '../personnel.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-aggridcompreel',
  templateUrl: './aggridcompreel.component.html',
  styleUrls: ['./aggridcompreel.component.scss']
})
export class AggridcompreelComponent implements OnInit {

  gouv:any
  title = "grid";
  api!: GridApi;
  rowData: any[] = [];
  codsoc:any
  prs:any=[]
  perso11 :any = {
    cod_soc:this.token.getUser().cod_soc,
    mat_pers:this.token.getUser().matpers
  };


  constructor(private servv:PersonnelService,private translatee:TranslateService,private serv: CompreelService, private token: TokenStorage) {



  }
  changeLanguage() {
    const currentLanguage = this.servv.languageSubject.value;
    this.servv.setLanguage(currentLanguage === 'en' ? 'fr' : 'en');
  }

  translateHeaderNames(language: string) {
    this.columnDefs = this.columnDefs.map((col) => {
      col.headerName = this.translatee.instant(col.headerName, language);
      return col;
    });
  }
  columnDefs = [



 
    {
      headerName: "Libellé Compétence",
      field: "libcomp",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 500,
    },
    {
      headerName: "Niveau",
      field: "libnivcmp",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 200,
    },
    {
      headerName: "Appreciation",
      field: "appreciation",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 250,
    },
    { headerName: "Date validation",
    field: "dat_valid",
    filter: "agDateColumnFilter",
    width:200,
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
  }

  ];


  ngOnInit() {

    this.getFacture();
    this.servv.language$.subscribe((language) => {
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
  defaultColDef = {
    sortable: true,
    filter: true,
  };
  getFacture() {
    this.serv.getcompreel(this.token.getUser().matpers).subscribe(
      (data: any[]) => {
        this.rowData=data



        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }




  modules: Module[] = [ClientSideRowModelModule];
}