import { Component, OnInit } from "@angular/core";
import { GridApi } from "ag-grid-community";
import { Module } from "@ag-grid-community/core";
import { PersonnelService } from "../personnel.service";
import { TokenStorage } from "src/app/core/services/token-storage.service";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import * as jspdf from "jspdf";
import "jspdf-autotable";
import { UserOptions } from "jspdf-autotable";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { TranslateService } from "@ngx-translate/core";
import { TopbarComponent } from "src/app/layouts/topbar/topbar.component";
@Component({
  selector: "app-indimnite",
  templateUrl: "./indimnite.component.html",
  styleUrls: ["./indimnite.component.scss"],
})
export class IndimniteComponent implements OnInit {
  title = "grid";
  api!: GridApi;
  prs: any = [];
  rowData: any[] = [];
  perso11: any = {
    cod_soc: "01",
    mat_pers: "07879",
  };
  row: any = [];
  
headerNameva:any="Bonjour"
  public columns = ["Abréviation Fixe", "Libélle", "Montant", "Date Indemnité","Numéro Niveau","Code Niveau","Type Rubrique"];
  vart!: string;
   
  constructor(public translatee: TranslateService,private serv: PersonnelService, private token: TokenStorage,private modalService: NgbModal) {}
  columnDefs = [
    {
      headerName:"Abriviation fixe",
      field: "abrv_fixe",

      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 150,
    },
    {
      headerName:"Libelle",
    
      field: "lib_ind",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 400,
      

    },
    {
      headerName: "Montant",
      field: "montant",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      type: 'rightAligned',
      floatingFilter: true,
      width: 120,
    },
    {
      headerName: "Date indemnité",
      field: "date_ind",
      filter: "agDateColumnFilter",
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
      headerName: "Date fin indeminité",
      
      floatingFilter: true,

      field: "date_ind_fin",
      filter: "agDateColumnFilter",
      width: 170,
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
      headerName: "Numéro niveau",
      field: "num_niv",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 150,
    },
    {
      headerName: "Code niveau",
      field: "cod_niv",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 150,
    },

    {
      headerName: "Type rubrique",
      field: "type_par",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 150,
    },
  ];
  

  ngOnInit(): void {
    this.getFacture();
    console.log('lang curren ',this.translatee.currentLang)
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

  meth(header:any):any{
     this.translatee.onLangChange.subscribe(
      ((data:string)=>{console.log("tttt"+data)
    this.vart=data
  console.log("vat ",this.vart
  );
  })
    )
    return this.vart; 
  }
  exportAsXLSX() {
    this.serv.exportAsExcelFile(this.rowData, "Document Indemnité");
  }

  public openPDF(): void {
    const doc = new jspdf("portrait", "px", "a4");
    doc.text(170, 15, "Liste des Indemnités:");
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
    doc.save("Document Indemnité.pdf");
  }



  defaultColDef = {
    sortable: true,
    filter: true,
  };
  getFacture() {
    this.serv.getpersonnel(this.perso11).subscribe(
      (data: any[]) => {
        this.prs = data;
        this.rowData = this.prs.possede;
        for (var k = 0; k < this.rowData.length; k++) {
          this.row.push([
            this.rowData[k].abrv_fixe,
            this.rowData[k].lib_ind,
            this.rowData[k].montant,
            this.rowData[k].date_ind,
            this.rowData[k].num_niv,
            this.rowData[k].cod_niv,
            this.rowData[k].type_par,
          ]);
        }
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

  modules: Module[] = [ClientSideRowModelModule];
}
