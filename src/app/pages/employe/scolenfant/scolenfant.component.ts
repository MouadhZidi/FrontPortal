import { Component, OnInit } from '@angular/core';
import { TokenStorage } from 'src/app/core/services/token-storage.service';
import { PersonnelService } from '../personnel.service';
import { GridApi } from "ag-grid-community";
import { Module } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-scolenfant',
  templateUrl: './scolenfant.component.html',
  styleUrls: ['./scolenfant.component.scss']
})
export class ScolenfantComponent implements OnInit {
  title = "grid";
  api!: GridApi;
  prs:any=[]
  rowData: any[] = [];
  perso11 :any = {
    cod_soc:"01",
    mat_pers:"07879"
  };

  constructor(public translate:TranslateService,private serv: PersonnelService,private token: TokenStorage) {}
  columnDefs = [
   

    {
      headerName: "Nom&Prénom",
      field: "libprenom",
with:200,
      filter: true,
      floatingFilter: true,
    },
   
    {
      headerName: "annee_scolaire",
      field: "annee_scolaire",
      width:200,

      filter: true,
      floatingFilter: true,
    },
    {
      headerName: "resultat_niveau",
      field: "result_niv",
with:200,
      filter: true,
      floatingFilter: true,
    },
   
    {
      headerName: "boursier",
      field: "boursier",
with:200,
      filter: true,
      floatingFilter: true,
    },
   {
      headerName: "Date fin indeminité",

      field: "date_ind_fin",
      filter: "agDateColumnFilter",
      floatingFilter: true,
      width:330,
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
      cellEditor: "primeCellEditor",
    },
    
    
    
    
   
  ];

  ngOnInit(): void {
    this.getFacture();
    this.serv.language$.subscribe((language) => {
      this.translateHeaderNames(language);
    });
    const currentLang = this.translate.getBrowserLang();
    this.translate.onLangChange.subscribe(() => {
      this.columnDefs = this.columnDefs.map((col) => {
        col.headerName = this.translate.instant(col.headerName,currentLang);
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
      col.headerName = this.translate.instant(col.headerName, language);
      return col;
    });
  }
  defaultColDef = {
    sortable: true,
    filter: true,
  };
  getFacture() {
    this.serv.getfamsoc(this.token.getUser().cod_soc,this.token.getUser().matpers).subscribe(
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