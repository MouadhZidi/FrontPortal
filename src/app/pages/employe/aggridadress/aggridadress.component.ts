import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { GridApi } from "ag-grid-community";
import { Module } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { TokenStorage } from "src/app/core/services/token-storage.service";
import { PersonnelService } from "../personnel.service";
import * as jspdf from "jspdf";
import "jspdf-autotable";
import { UserOptions } from "jspdf-autotable";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { TranslateService } from "@ngx-translate/core";
@Component({
  selector: "app-aggridadress",
  templateUrl: "./aggridadress.component.html",
  styleUrls: ["./aggridadress.component.scss"],
})
export class AggridadressComponent implements OnInit {
  @ViewChild("htmlData") htmlData: ElementRef;

  public columns = ["Rue", "Gouvernorat"];
  row: any = [];

  gouv: any;
  title = "grid";
  api!: GridApi;
  rowData: any[] = [];
  codsoc: any;
  prs: any = [];
  perso11: any = {
    cod_soc: this.token.getUser().cod_soc,
    mat_pers: this.token.getUser().matpers,
  };

  constructor(
    public translate:TranslateService,
    private serv: PersonnelService,
    private token: TokenStorage,
    private modalService: NgbModal
  ) {}
  columnDefs = [
    {
      headerName: "Rue 2éme langue",
      field: "rue_a",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 450,
    },
    {
      headerName: "Rue",
      field: "rue",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 450,
    },
    {
      headerName: "Gouvernorat",
      field: "lib_gouv",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 330,
    },
  ];

  ngOnInit() {
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
    this.serv.getpersonnel(this.perso11).subscribe(
      (data: any[]) => {
        this.prs = data;
        this.rowData = this.prs.adresses_personnel;

        console.log(data);
        for (var k = 0; k < this.rowData.length; k++) {
          this.row.push([this.rowData[k].rue, this.rowData[k].lib_gouv]);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  public openPDF(): void {
    const doc = new jspdf("portrait", "px", "a4");
    doc.text(170, 15, "Liste des adresses:");

    doc.autoTable(this.columns, this.row);

    doc.save("Liste des adresses.pdf");
  }

  openModal(targetModal) {
    this.modalService.open(targetModal, {
      windowClass: "my-class",
      centered: true,
    });
  }

  modules: Module[] = [ClientSideRowModelModule];
}

