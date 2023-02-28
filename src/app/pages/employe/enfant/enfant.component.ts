import { Component, OnInit } from '@angular/core';
import { GridApi } from "ag-grid-community";
import { Module } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { TokenStorage } from 'src/app/core/services/token-storage.service';
import { FamilleService } from '../famille.service';
import { PersonnelService } from '../personnel.service';

import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-enfant',
  templateUrl: './enfant.component.html',
  styleUrls: ['./enfant.component.scss']
})
export class EnfantComponent implements OnInit {
  title = "grid";
  api!: GridApi;
  rowData: any[] = [];
  enf: any[] = [];
  sexe:string=''

  constructor(public translate:TranslateService,public serve :PersonnelService,private serv: FamilleService,private tokenService:TokenStorage) {
    
  }
  columnDefs = [
   
    
    {
      headerName: "Prénom",
      field: "prenom",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 200,
      
     
    },
    {
      headerName: "Date de naissance",
      field: "dat_naiss",
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
      headerName: "Activité",
      field: "libactt",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 200,
      
     
    },
    {
      headerName: "handicap",
      field: "handicap",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 200,
      
     
    },
    {
      headerName: "Boursier",
      field: "boursier",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      enableRowGroup: true,
      width: 200,
      

     
    },
    {
      headerName: "Sexe",
      field: "sexe",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 100,
    },

    
    
    
   
  
    
  
    {
      headerName: "Date fin fiche handicap",
      field: "dat_fin_fich_hand",
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

 

    {headerName: "Dat effet fiche handicap",
      field: "Date dat_eff_fich_hand",
      filter: "agDateColumnFilter",
      resizable: true,
      width: 200,
      sortable: true,
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
    {headerName: "Date décé",
    field: "dat_dece",
    filter: "agDateColumnFilter",
    resizable: true,
    width: 200,
    sortable: true,
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
      headerName: "Lieu de naissance",
      field: "lieu_naiss",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      enableRowGroup: true,
      width: 200,
      

     
    },
   
    {
      headerName: "Etat",
      field: "etat_fam",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      enableRowGroup: true,
      width: 200,
      

     
    },
  


    


    

   
   
    {
      headerName: "Numéro fiche",
      field: "num_fich_hand",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 200,
    },

  ];

  ngOnInit(): void {
    this.GetConge();
    this.serve.language$.subscribe((language) => {
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
    const currentLanguage = this.serve.languageSubject.value;
    this.serve.setLanguage(currentLanguage === 'en' ? 'fr' : 'en');
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
  /* getFacture() {
    this.factureService.GetChambreByCode().subscribe(
      (data: any[]) => {
        this.rowData = data;

        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
 */
  GetConge() {
    this.serv.getEnfant(this.tokenService.getUser().cod_soc,this.tokenService.getUser().matpers).subscribe(
      (data: any[]) => {
        this.rowData = data
       
       

        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public onQuickFilterChanged($event: any) {
    this.api.setQuickFilter($event.target.value);
}

  modules: Module[] = [ClientSideRowModelModule];
}