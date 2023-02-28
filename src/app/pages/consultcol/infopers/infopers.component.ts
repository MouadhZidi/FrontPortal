import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from "@angular/core";
import { TokenStorage } from "src/app/core/services/token-storage.service";
import { FamilleService } from "../../Employe/famille.service";
import { PersonnelService } from "../../Employe/personnel.service";
import { RenseignementpersService } from "../../Employe/renseignementpers.service";
import { GridApi, SelectionChangedEvent } from "ag-grid-community";
import { Module } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { NivpersService } from "../../Employe/nivpers.service";
import { DomSanitizer } from "@angular/platform-browser";
import { HttpClient } from "@angular/common/http";
import * as jspdf from "jspdf";
import "jspdf-autotable";
import { UserOptions } from "jspdf-autotable";
import { TranslateService } from "@ngx-translate/core";
@Component({
  selector: "app-infopers",
  templateUrl: "./infopers.component.html",
  styleUrls: ["./infopers.component.scss"],
})
export class InfopersComponent implements OnInit {
  @ViewChild("htmlData") htmlData: ElementRef;
  public columns = ["Nom", "Prénom", "Groupe sanguin", "Lieu de naissance"];

  row: any = [];
  niv: any = [];
  z: any;
  api!: GridApi;
  rowData: any = [];
  n: any;
  gridOpen: boolean;
  rowSelection;
  cod_soc: any;
  mat_pers: any;
  conjoint: any = [];
  perso: any;
  get44: any;
  ad: any;
  affect: any;
  deb: any;
  fin: any;
  nat: any;
  etat: any;
  sexe: any;
  tab: any;
  gouv: any;
  tab2: any;
  getbymatcod: any;
  rens: any = [];
  photo: any;
  adrpersbycodeandmat: any = [];
  rensper: any;
  g: any;
  mat: any;
  perso11: any = {
    cod_soc: this.token.getUser().cod_soc,
    mat_pers: this.token.getUser().matpers,
  };
  imageUrl: any;
  imagel: any;
  columnDefs;
  gridApi;
  gridColumnApi;
  param;
  fiche: any;
  // bread crumb items
  collab: any;
  @Input() testdelay: Boolean = false;

  constructor(
    private servniv: NivpersService,
    private cd: ChangeDetectorRef,
    private token: TokenStorage,
    private serv: PersonnelService,
    private serv2: FamilleService,
    private serv3: RenseignementpersService,
    private modalService: NgbModal,
    private sanitizer: DomSanitizer,
    private http: HttpClient,
    public translatee: TranslateService
  ) {
    this.columnDefs = [
      {
        headerName: "Nom",
        field: "nom_pers",
        editable: true,
        resizable: true,
        sortable: true,
        filter: true,
        floatingFilter: true,
        width: 160,
      },
      {
        headerName: "Prénom",
        field: "pren_pers",
        editable: true,
        resizable: true,
        sortable: true,
        filter: true,
        floatingFilter: true,
        width: 160,
      },
      {
        headerName: "Prenom 2éme langue",
        field: "pren_pers_a",
        editable: true,
        resizable: true,
        sortable: true,
        filter: true,
        floatingFilter: true,
        width: 200,
      },
      {
        headerName: "Nom 2éme langue",
        field: "nom_pers_a",
        editable: true,
        resizable: true,
        sortable: true,
        filter: true,
        floatingFilter: true,
        width: 200,
      },
      {
        headerName: "Groupe sanguin",
        field: "grp_sang",
        editable: true,
        resizable: true,
        sortable: true,
        filter: true,
        floatingFilter: true,
        width: 200,
      },

      {
        headerName: "Lieu de naissance",
        field: "lieu_nais",
        editable: true,
        resizable: true,
        sortable: true,
        filter: true,
        floatingFilter: true,
        width: 200,
      },
      {
        headerName: "Etat active",
        field: "lib_etat_act",
        editable: true,
        resizable: true,
        sortable: true,
        filter: true,
        floatingFilter: true,
        width: 150,
      },
    ];
    this.rowSelection = "single";
  }

  columnDefs2 = [
    {
      headerName: "Rue",
      field: "rue",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 200,
    },
    {
      headerName: "Rue 2éme langue",
      field: "rue_a",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 200,
    },
    {
      headerName: "Nom et prénom",
      field: "libnompre",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 200,
    },
    {
      headerName: "Tél. Perso.",
      field: "tel_pers",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 200,
    },
    {
      headerName: "Gouvernorat",
      field: "lib_gouv",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 200,
    },
    {
      headerName: "Etat active",
      field: "lib_etat_act",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 160,
    },
  ];

  ngOnInit() {
    this.getadrpers();
    this.getrenspers();
    this.getconjoint();
    this.getcollaborateur();
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
  update() {
    this.delayedTest();
    this.cd.detectChanges();
  }
  delayedTest() {
    console.log(this.testdelay);
    this.testdelay = true;
    this.cd.markForCheck();
  }

  defaultColDef = {
    sortable: true,
    filter: true,
  };
  getpers(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    console.log(this.gridApi)
    console.log(this.gridColumnApi)

    this.serv.getpersonnel(this.perso11).subscribe(
      (data) => {
        this.perso11 = data;

        this.n = this.perso11.cod_serv;

        this.getcollaborateur();

        //  this.adrpersbycodeandmat=this.perso11.adresses_personnel
        //this.rens=this.perso11.rens_pers
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getadrpers() {}
  getrenspers() {
    this.serv.getpersonnel(this.perso11).subscribe(
      (data) => {
        this.rens = this.perso11.rens_pers;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getconjoint() {
    this.serv2
      .getconjoint(this.token.getUser().cod_soc, this.token.getUser().matpers)
      .subscribe(
        (data) => {
          this.conjoint = this.perso11.rens_pers;
        },
        (err) => {
          console.log(err);
        }
      );
  }
  getcollaborateur() {
    this.serv.getcollab(this.n, this.token.getUser().matpers).subscribe(
      (data) => {
        this.rowData = data;
        for (var k = 0; k < this.rowData.length; k++) {
          this.row.push([
            this.rowData[k].nom_pers,
            this.rowData[k].pren_pers,

            this.rowData[k].grp_sang,
            this.rowData[k].lieu_nais,
          ]);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  smallModal(smallDataModal: any) {
    this.modalService.open(smallDataModal, { size: "sm", centered: true });
  }

  onSelectionChanged(event: SelectionChangedEvent) {
    var selectedRows = this.gridApi.getSelectedRows();
    console.log(selectedRows);
    var selectedRowsString = "";
    var selectedRowsMat = "";

    selectedRows.forEach(function (selectedRow, index) {
      if (index !== 0) {
        selectedRowsString += ", ";
      }
      selectedRowsString += selectedRow.cod_soc;
      selectedRowsMat += selectedRow.mat_pers;
    });
    console.log("ii" + selectedRowsString);
    console.log("pp" + selectedRowsMat);
    this.serv.getpersonnelcol(selectedRowsString, selectedRowsMat).subscribe(
      (data: any[]) => {
        this.fiche = data;
      },
      (error) => {
        console.log(error);
      }
    );
    this.servniv.getnivpers(selectedRowsString, selectedRowsMat).subscribe(
      (data: any[]) => {
        this.niv = data;
      },
      (error) => {
        console.log(error);
      }
    );

    this.serv.getImage(selectedRowsMat).subscribe(
      (data) => {
        let objectURL = URL.createObjectURL(data);
        this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      },
      (err) => {
        console.log(err);
      }
    );

    this.gridOpen = !this.gridOpen;
  }

  exportAsXLSX() {
    this.serv.exportAsExcelFile(this.rowData, "Document Indemnité");
  }

  public openPDF(): void {
    const doc = new jspdf("portrait", "px", "a4");
    doc.text(170, 15, "Liste des collaborateurs:");
    doc.autoTable(this.columns, this.row);
    let now=new Date()
    var today = now.getDate()+"/"+(now.getMonth()+1)+"/"+now.getFullYear();
    doc.setFont("serif");
    doc.setFontSize(10);
    var newdat = "Date: "+ today;
    doc.text(350,15,newdat);
    var pageCount = doc.internal.getNumberOfPages(); //Total Page Number
    for (let i = 0; i < pageCount; i++) {
      doc.setPage(i);
      let pageCurrent = doc.internal.getCurrentPageInfo().pageNumber; //Current Page
      doc.setFontSize(12);
      doc.text("page: " + pageCurrent + "/" + pageCount, 10, 10);
    }

    doc.save("Liste des employées.pdf");
  }

  modules: Module[] = [ClientSideRowModelModule];
}
