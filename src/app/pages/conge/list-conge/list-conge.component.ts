import { Component, OnInit } from "@angular/core";
import { TokenStorage } from "src/app/core/services/token-storage.service";
import { CongeService } from "../conge.service";
import { GridApi } from "ag-grid-community";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ColumnApi, GridReadyEvent, Module } from "@ag-grid-community/core";
import { reduce } from "rxjs/operators";
import { PersonnelService } from "../../Employe/personnel.service";
import * as jspdf from "jspdf";
import "jspdf-autotable";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-list-conge",
  templateUrl: "./list-conge.component.html",
  styleUrls: ["./list-conge.component.scss"],
})
export class ListCongeComponent implements OnInit {
  public columns = ["Année congé", "Cumulé congé", "Congé pris", "Solde congé"];
  row: any = [];
  nom: any;
  prenom: any;
  ListTypeBull: any[] = [];
  rowData: any[] = [];
  breadCrumbItems: Array<{}>;

  api!: GridApi;
  public apii!: GridApi; 
  public columnApi!: ColumnApi; 
  private gridApi: GridApi;
  constructor(private translatee:TranslateService,private serv: CongeService, private tokenService: TokenStorage,private servv: PersonnelService) {}

  ngOnInit() {
    this.getnom();
    this.getprenom();
    this.GetCongeById();
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

    this.breadCrumbItems = [{ label: 'Espace de congé' }, { label: 'Solde de congé', active: true }];

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

  columnDefs = [
    {
      headerName: "Année congé",
      field: "id.annee_cng",
      width: 390,
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      pinned: true,
      
    },
    {
      headerName: "Cumule congé",
      field: "cum_cng",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 390,
      pinned: true,
    
    },

    {
      headerName: "Conge pris",
      field: "pris_cng",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 390,
      pinned: true,
     
    },

    {
      headerName: "Solde congé",
      field: "sold_cng",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 390,
      pinned: true,
     
    },


  ];

  defaultColDef = {
    sortable: true,
    filter: true,
    minWidth:10,
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
  GetCongeById() {
    this.serv
      .GetCongeById(
        this.tokenService.getUser().cod_soc,
        this.tokenService.getUser().matpers
      )
      .subscribe(
        (data: any[]) => {
          this.rowData = data;
          for (var k = 0; k < this.rowData.length; k++) {
            this.row.push([
              this.rowData[k].id.annee_cng,
              this.rowData[k].cum_cng,
              this.rowData[k].pris_cng,
              this.rowData[k].sold_cng,
            ]);
          }
          console.log(data);
        },
        (error) => {
          console.log(error);
        }
      );
  }



  onGridReady(params) {
    this.gridApi = params.api;
}
exportAsXLSX() {
  this.servv.exportAsExcelFile(this.rowData, "Solde de congé");
}

public openPDF(): void {
  const doc = new jspdf("portrait", "px", "a4");
  doc.text(170, 15, "Solde de congé:");
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
  doc.save("Solde de congé.pdf");
}

  modules: Module[] = [ClientSideRowModelModule];
}
