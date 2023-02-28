import { Component, OnDestroy, OnInit,ViewChild ,HostListener} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { PaieService } from "../paie.service";
import { AgGridAngular } from '@ag-grid-community/angular';
import {  ColDef,
  ColumnApi,
  GridApi,
  GridReadyEvent,
  Module } from "@ag-grid-community/core";
import { TokenStorage } from "src/app/core/services/token-storage.service";
import { ComptepersService } from "../../Employe/comptepers.service";
import { aggridModules } from '../../../aggrid-modules';
import { Subject } from 'rxjs';
import * as jspdf from "jspdf";
import "jspdf-autotable";
import { PersonnelService } from "../../Employe/personnel.service";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-etat-apres-paie',
  templateUrl: './etat-apres-paie.component.html',
  styleUrls: ['./etat-apres-paie.component.scss']
})
export class EtatApresPaieComponent implements OnInit ,OnDestroy{
  @ViewChild(AgGridAngular) aggrid: AgGridAngular;

  readonly modulesAggrid: Module[] = aggridModules;

  private readonly destroyed$ = new Subject<void>();

  row: any = [];
  ereur=false
  

  public columns = ["Abréviation Fixe", "Libélle", "Montant", "Date Indemnité","Numéro Niveau","Code Niveau","Type Rubrique"];
  gridApi: GridApi;
  columnApi: ColumnApi;


list:any=[]
  listInfo: any;
  ListTypeBull!: any[];

  api!: GridApi;
  rowData: any[] = [];
  bul: any = [];
  possVH: any;
  nom: any;
  prenom: any;


  dt_bul: any;
  mat_pers: any;
  nom_pers: any;
  cod_serv: any;
  lib_serv: any;
  adm_tech: any;
  lib_adm_tech: any;
  cod_sit: any;
  cod_cat: any;
  cod_grad: any;
  charg_all: any;
  charg_enf: any;
  cod_ech: any;
  nbr_enf: any;
  formDocument!: FormGroup;
  dateBul?: String;
  cod_typ_bul?: String;
  tab: number = 1;
  x: string = "";
  a!: string;

  constructor(
    public translatee: TranslateService,private servv: PersonnelService,
    private serv: PaieService,
    private serv2: ComptepersService,

    private tokenService: TokenStorage,
    private formBuilder: FormBuilder,
    private ser: PersonnelService
  ) {}

  ngOnInit(): void {
    // this.GetConge22()
    this.formDocument = this.formBuilder.group({
      dateBul: [""],
      cod_typ_bul: [""],
      mat_pers: [this.tokenService.getUser().matpers, Validators.required],
      cod_soc: [this.tokenService.getUser().cod_soc],
    });
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

    // this.getTypeBull();
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

  columnDefs = [
    {
      headerName: "Rubrique",
      field: "abrv_fixe",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 200,
      pinned: true,
      checkboxSelection: true,
    },
    {
      headerName: "Libélle rubrique",
      field: "lib_rebrique",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 680,
      pinned: true,
    
    },


    // {
    //   headerName: "Libellé bulletin",
    //   field: "lib_bul",
    //   editable: true,
    //   resizable: true,
    //   sortable: true,
    //   filter: true,
    //   floatingFilter: true,
    //   width: 300,
    //   pinned: true,
    // },
    {
      headerName: "Nombre",
      field: "nombre",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 120,
      pinned: true,
    },

    {
      headerName: "Taux",
      field: "taux",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 120,
      pinned: true,
    },

    {
      headerName: "Prime",
      field: "mnt_gain",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 120,
      pinned: true,
    },

    {
      headerName: "Retenue",
      field: "mnt_charge",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 120,
      pinned: true,
    },

    {
      headerName: "Montant",
      field: "montant",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 120,
      pinned: true,
    },
  ];

  // getTypeBull() {
  //   this.serv.GetTypeBull().subscribe(
  //     (data: any) => {
  //       this.ListTypeBull = data;

  //       console.log(this.ListTypeBull);
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // }

  addHotel() {
    this.serv.GetBull(this.formDocument.value).subscribe(
      (data: any) => {
        this.listInfo = data;
        this.ereur=false
        this.rowData = this.listInfo.possVH;
        for (var k = 0; k < this.rowData.length; k++) {
          this.row.push([
            this.rowData[k].abrv_fixe,
            this.rowData[k].lib_rebrique,
            this.rowData[k].nombre,
            this.rowData[k].taux,
            this.rowData[k].mnt_gain,
            this.rowData[k].mnt_charge,
            this.rowData[k].montant,
          ]);
        }
        console.log(data);
      },
      (error) => {
        console.log(error);
        this.ereur=true
        this.listInfo=null
      }
    );
  }
  // GetConge22() {
  //   this.serv2.getall().subscribe(
  //     (data: any[]) => {
  //       this.list = data;

  //       console.log(data);
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // }

  defaultColDef = {
    sortable: true,
    filter: true,
  };


  @HostListener('window:beforeunload')
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  onGridReady(params: GridReadyEvent): void {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
  }

  exportAsXLSX() {
    this.ser.exportAsExcelFile(this.rowData, "Liste des bulletain");
  }

  public openPDF(): void {
    const doc = new jspdf("portrait", "px", "a4");
    doc.text(170, 15, "Liste des bulletain:");
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
    doc.save("Liste des bulletain.pdf");
  }
  modules: Module[] = [ClientSideRowModelModule];
}
