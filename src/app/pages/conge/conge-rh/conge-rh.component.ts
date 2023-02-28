import { Component, OnInit } from '@angular/core';
import { TokenStorage } from "src/app/core/services/token-storage.service";
import { CongeService } from "../conge.service";
import { GridApi } from "ag-grid-community";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { Module } from "@ag-grid-community/core";
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-conge-rh',
  templateUrl: './conge-rh.component.html',
  styleUrls: ['./conge-rh.component.scss']
})
export class CongeRhComponent implements OnInit {

  nom: any;
  ereur=false
  prenom: any;
  ListTypeBull: any[] = [];
  rowData: any[];
  api!: GridApi;
form:FormGroup
  constructor(private serv: CongeService, private tokenService: TokenStorage,private formBuilder:FormBuilder) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      mat_pers: [""],
      cod_soc: [""],
    });
    this.getnom();
    this.getprenom();
  }


  
  getnom() {
    this.serv
      .getNom(
        this.tokenService.getUser().cod_soc,
        this.tokenService.getUser().matpers
      )
      .subscribe(
        (data: any) => {
          this.nom = data;

          console.log(data);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  getprenom() {
    this.serv
      .getPrenom(
        this.tokenService.getUser().cod_soc,
        this.tokenService.getUser().matpers
      )
      .subscribe(
        (data: any) => {
          this.prenom = data;

          console.log(data);
        },
        (error) => {
          console.log(error);
        }
      );
  }




  GetCongeRh() {
    this.serv.GetConge(this.form.value.cod_soc,this.form.value.mat_pers).subscribe(
      (data: any[]) => {
        this.rowData = data;
        this.ereur=false

      },
      (error) => {
        this.ereur=true
        this.rowData=null
      }
    );
  }

  columnDefs = [
    {
      headerName: "Année congé",
      field: "anne_cng",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 180,
      pinned: true,
      checkboxSelection: true,
      
     
    },
    
    {
      headerName: "Date Congé",
      field: "dat_dcng",
      filter: "agDateColumnFilter",
      resizable: true,
      sortable: true,
      floatingFilter: true,
      pinned: true,
      width: 150,

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
      headerName: "Date début",
      field: "dat_debut",
      filter: "agDateColumnFilter",
      resizable: true,
      width: 150,
      sortable: true,
      floatingFilter: true,
      pinned: true,

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
      field: "dat_fin",
      headerName: "Date fin",
      filter: "agDateColumnFilter",
      resizable: true,
      width: 200,
      sortable: true,
      floatingFilter: true,
      pinned: true,

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
      headerName: "Nbr Jours",
      field: "nbr_jours",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      enableRowGroup: true,
      width: 120,
      pinned: true,
      

     
    },


    {
      headerName: "Date retour prévu",
      field: "dat_prev_ret",
      
      filter: "agDateColumnFilter",
      resizable: true,
      width: 200,
      sortable: true,
      floatingFilter: true,
      
      pinned: true,

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
      headerName: "Date Retour",
      field: "dat_retour",
      filter: "agDateColumnFilter",
      resizable: true,
      width: 150,
      sortable: true,
      floatingFilter: true,
      pinned: true,

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
      headerName: "Motif congé",
      field: "motif_cng",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 400,
      pinned: true,
    },
  ];

  defaultColDef = {
    sortable: true,
    filter: true,
  };



 

  modules: Module[] = [ClientSideRowModelModule];
}
