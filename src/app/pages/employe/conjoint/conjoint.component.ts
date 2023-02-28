import { Component, OnInit } from '@angular/core';
import { GridApi } from "ag-grid-community";
import { Module } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { TokenStorage } from 'src/app/core/services/token-storage.service';
import { PersonnelService } from '../personnel.service';
import { FamilleService } from '../famille.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-conjoint',
  templateUrl: './conjoint.component.html',
  styleUrls: ['./conjoint.component.scss']
})
export class ConjointComponent implements OnInit {
  title = "grid";
  api!: GridApi;
  rowData: any[] = [];

  constructor(public translate:TranslateService,private serve:PersonnelService,private serv: FamilleService,private tokenService:TokenStorage) {
    
  }
  columnDefs = [
   
    {
      headerName: "Numéro famille",
      field: "num_fam",
      editable: true,
      resizable: true,
      filter: true,
      floatingFilter: true,
      width:200,


    },
    
    
    {
      headerName: "Prénom",
      field: "prenom",
      editable: true,
      resizable: true,
      filter: true,
      floatingFilter: true,
      width:150


      
      
     
    },
    {
      headerName: "Nom",
      field: "nom_jf",
      resizable: true,
      filter: true,
      floatingFilter: true,
      width:150,

      
      
     
    },
    
    {
      headerName: "Date de naissance",
      field: "dat_naiss",
      filter: "agDateColumnFilter",
      width:200,
      resizable: true,

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
      headerName: "Date cin",
      field: "dat_cin",
      filter: "agDateColumnFilter",
      floatingFilter: true,
      width:200,
      resizable: true,

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
      field: "dat_mar",
      headerName: "Date de mariage",
      filter: "agDateColumnFilter",
      floatingFilter: true,
      width:200,
      resizable: true,

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
      headerName: "Prenom 2éme langue",
      field: "prenom_a",
      editable: true,
      filter: true,
      floatingFilter: true,
      width:200,
      resizable: true,
      

     
    },
    {
      headerName: "Cin",
      field: "cin",
      width:150,
      resizable: true,

      filter: true,
      floatingFilter: true,
    },{
      headerName: "Lieu emission",
      field: "lieu_cin",
      width:200,
      filter: true,
      floatingFilter: true,
    },



    


    

    {
      headerName: "Nom 2eme langue",
      field: "nom_jf_a",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width:200

    },

    {
      headerName: "Num. assurance conjoint",
      field: "num_ass_conj",
      editable: true,
      sortable:true,
      resizable: true,
      filter: true,
      floatingFilter: true,
      width:280

  
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
    this.serv.getconjoint(this.tokenService.getUser().cod_soc,this.tokenService.getUser().matpers).subscribe(
      (data: any[]) => {
        this.rowData = data;

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
