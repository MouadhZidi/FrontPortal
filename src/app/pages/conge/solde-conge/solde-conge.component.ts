import { Component, OnInit } from "@angular/core";
import { TokenStorage } from "src/app/core/services/token-storage.service";
import { CongeService } from "../conge.service";
import { GridApi } from "ag-grid-community";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { Module } from "@ag-grid-community/core";
import * as moment from "moment";
import { PersonnelService } from "../../Employe/personnel.service";
import * as jspdf from "jspdf";
import "jspdf-autotable";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-solde-conge",
  templateUrl: "./solde-conge.component.html",
  styleUrls: ["./solde-conge.component.scss"],
})
export class SoldeCongeComponent implements OnInit {
  nom: any;
  prenom: any;
  ListTypeBull: any[] = [];
  rowData: any[] = [];
  api!: GridApi;
  row: any = [];
  

  public columns = ["Année congé", "Libélle congé", "Date Congé", "Date début","Date fin","Nbr Jours","Date retour prévu","Date Retour","Motif congé"];


  constructor(private translatee:TranslateService,private serv: CongeService, private tokenService: TokenStorage,private ser: PersonnelService, private modalService: NgbModal) {}

  ngOnInit() {
    this.getnom();
    this.getprenom();
    this.GetCongeById();
    this.GetConge();
    this.ser.language$.subscribe((language) => {
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
    const currentLanguage = this.ser.languageSubject.value;
    this.ser.setLanguage(currentLanguage === 'en' ? 'fr' : 'en');
  }

  translateHeaderNames(language: string) {
    this.columnDefs = this.columnDefs.map((col) => {
      col.headerName = this.translatee.instant(col.headerName, language);
      return col;
    });
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
  openModal(targetModal) {
    this.modalService.open(targetModal, {
      windowClass: "my-class",
      centered: true,
    });
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

  GetCongeById() {
    this.serv
      .GetCongeById(
        this.tokenService.getUser().cod_soc,
        this.tokenService.getUser().matpers
      )
      .subscribe(
        (data: any[]) => {
          this.rowData = data;

          console.log(data);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  GetConge() {
    this.serv.GetConge(this.tokenService.getUser().cod_soc,this.tokenService.getUser().matpers).subscribe(
      (data: any[]) => {
        this.rowData = data;
        for (var k = 0; k < this.rowData.length; k++) {
          this.row.push([
            this.rowData[k].anne_cng,
            this.rowData[k].lib_cng,
            this.rowData[k].dat_dcng,
            this.rowData[k].dat_debut,
            this.rowData[k].dat_fin,
            this.rowData[k].nbr_jours,
            this.rowData[k].type_par,
            this.rowData[k].dat_prev_ret,
            this.rowData[k].dat_retour,
            this.rowData[k].motif_cng,
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
      headerName: "Année congé",
      field: "anne_cng",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 150,

      checkboxSelection: true,
      
     
    },
    {
      headerName: "Libélle congé",
      field: "lib_cng",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 250,
     
    },
    
    {
      headerName: "Date Congé",
      field: "dat_dcng",
      cellRenderer: (data) => {
        return moment(data.createdAt).format("DD/MM/YYYY");
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
          var day = Number(dateParts[1]) - 1;
          var month = Number(dateParts[0]);
          var cellDate = new Date(year, day, month);

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
       filter: 'agDateColumnFilter',
      resizable: true,
      width: 150,
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
          var month = Number(dateParts[1]);
          var day = Number(dateParts[0]);
          var cellDate = new Date(day,month,year);

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
     
      

     
    },


    {
      headerName: "Date retour prévu",
      field: "dat_prev_ret",
      
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
      headerName: "Date Retour",
      field: "dat_retour",
      filter: "agDateColumnFilter",
      resizable: true,
      width: 150,
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
      headerName: "Motif congé",
      field: "motif_cng",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 400,
      
    },
  ];

  defaultColDef = {
    sortable: true,
    filter: true,
  };


  exportAsXLSX() {
    this.ser.exportAsExcelFile(this.rowData, "Liste des demande");
  }

  public openPDF(): void {
    const doc = new jspdf("portrait", "px", "a4");
    doc.text(170, 15, "Liste des demande:");
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
    doc.save("Liste des demande.pdf");
  }

  modules: Module[] = [ClientSideRowModelModule];
}
