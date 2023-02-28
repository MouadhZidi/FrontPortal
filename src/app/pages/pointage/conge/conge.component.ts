import { Component, OnInit } from '@angular/core';
import { TokenStorage } from 'src/app/core/services/token-storage.service';
import { PointageService } from '../pointage.service';
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { Module } from "@ag-grid-community/core";
import * as moment from 'moment';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PersonnelService } from '../../Employe/personnel.service';
import * as jspdf from "jspdf";
import "jspdf-autotable";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-conge',
  templateUrl: './conge.component.html',
  styleUrls: ['./conge.component.scss']
})
export class CongeComponent implements OnInit {
  public columns = ["Année congé", "Code motif", "Libélle congé", "Date congé","Date début","Date fin","Nbr jour"];
  mat_pers: any;
  nom_pers: any;
  formDocument:FormGroup
  rowData: any[] ;
  row: any = [];
  matchef:any
  perso11 :any = {
    cod_soc:this.tokenService.getUser().cod_soc,
    mat_pers:this.tokenService.getUser().matpers}

  n:any
  constructor(private translatee : TranslateService,private serv: PointageService , private tokenService: TokenStorage,private  fb:FormBuilder,private ser:PersonnelService) { }
  ngOnInit() {
    this.formDocument = this.fb.group({
      codeServ:[""],
      matChef:[""],
      mat_pers: [""],
      cod_soc: [""],
      nom_prenom:[""],

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
  // getpers(){

  //   this.ser.getpersonnel(this.perso11).subscribe(
  //     data => {
  //       this.perso11 = data; console.log('exected' + data);
  //       this.n=this.perso11.cod_serv
  //       console.log("codserv"+this.n)
  //       this.formDocument.patchValue({
  //         codeServ:this.n,
  //         matChef:this.tokenService.getUser().matpers,
        
    
  //       });
    
  //       this.GetConge()

  //     },
  //     err => {
  //       console.log(err);
  //     }
  //     );}
      GetConge() {
        this.serv.GetConge(this.formDocument.value).subscribe(
          (data: any[]) => {
            this.rowData = data;
            for (var k = 0; k < this.rowData.length; k++) {
              this.row.push([
                this.rowData[k].anne_cng,
                this.rowData[k].code_m,
                this.rowData[k].lib_cng,
                this.rowData[k].dat_dcng,
                this.rowData[k].dat_debut,
                this.rowData[k].dat_fin,
                this.rowData[k].nbr_jours,
              ]);
            }
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
      width: 150,
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,


    },
    {
      headerName: "Code motif",
      field: "code_m",
      width: 150,
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,


    },
    {
      headerName: "Libélle congé",
      field: "lib_cng",
      width: 350,
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,


    },
    {
      headerName: "Date congé",
      field: "dat_dcng",
      cellRenderer: (data) => {
        return moment(data.createdAt).format('MM/DD/YYYY')
    },
      filter: "agDateColumnFilter",
      resizable: true,
      sortable: true,
      floatingFilter: true,

      width: 230,

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
      cellRenderer: (data) => {
        return moment(data.createdAt).format('MM/DD/YYYY')
    },
      filter: "agDateColumnFilter",
      resizable: true,
      sortable: true,
      floatingFilter: true,

      width: 230,

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
      headerName: "Date fin",
      field: "dat_fin",
      cellRenderer: (data) => {
        return moment(data.createdAt).format('MM/DD/YYYY')
    },
      filter: "agDateColumnFilter",
      resizable: true,
      sortable: true,
      floatingFilter: true,

      width: 230,

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
      headerName: "Nbr jour",
      field: "nbr_jours",
      width: 230,
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,


    },



  ];

  exportAsXLSX() {
    this.ser.exportAsExcelFile(this.rowData, "Liste des congés");
  }

  public openPDF(): void {
    const doc = new jspdf("portrait", "px", "a4");
    doc.text(170, 15, "Liste des congés:");
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
    doc.save("Liste des congés.pdf");
  }


  defaultColDef = {
    sortable: true,
    filter: true,
  };



  modules: Module[] = [ClientSideRowModelModule];

}
