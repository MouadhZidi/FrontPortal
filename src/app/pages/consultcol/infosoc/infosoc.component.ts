import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { TokenStorage } from "src/app/core/services/token-storage.service";
import { FamilleService } from "../../Employe/famille.service";
import { PersonnelService } from "../../Employe/personnel.service";
import { RenseignementpersService } from "../../Employe/renseignementpers.service";
import { GridApi, SelectionChangedEvent } from "ag-grid-community";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ComptepersService } from '../../Employe/comptepers.service';
import { AffilpersService } from '../../Employe/affilpers.service';
import { Module } from '@ag-grid-community/core';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-infosoc',
  templateUrl: './infosoc.component.html',
  styleUrls: ['./infosoc.component.scss']
})
export class InfosocComponent implements OnInit {
  enfant:any=[]
  aff:any=[]
  famsoc:any=[]
  cpt:any=[]
  cjt:any=[]
  row:any
    HighlightRow : Number;
    ClickedRow:any
    z:any
    api!: GridApi;
    rowData: any=[]
    n: any;
    gridOpen:boolean
    rowSelection
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
    adrpersbycodeandmat: any = [];
    rensper: any;
    g: any;
    mat: any;
    h: string = "10908";
    x: string = "01";
    perso11: any = {
      cod_soc: this.token.getUser().cod_soc,
      mat_pers: this.token.getUser().matpers,
    };
    columnDefs;
    gridApi
    gridColumnApi
    param
    fiche:any
    // bread crumb items
    collab: any
    @Input() testdelay: Boolean = false;

    constructor(
      private serv27: AffilpersService,
      private cd: ChangeDetectorRef,
      private token: TokenStorage,
      private serv: PersonnelService,
      private serv2: FamilleService,
      private serv3: RenseignementpersService,
      private modalService: NgbModal,
      private Comp:ComptepersService,
      private fam:FamilleService,
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
        width: 170,
      },
      {
        headerName: "Prénom",
        field: "pren_pers",
        editable: true,
        resizable: true,
        sortable: true,
        filter: true,
        floatingFilter: true,
        width: 170,
      },
      {
        headerName: "Prénom 2éme langue",
        field: "pren_pers_a",
        editable: true,
        resizable: true,
        sortable: true,
        filter: true,
        floatingFilter: true,
        width: 160,
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
        width: 165,
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
        width: 160,
      },

    ];
      this.rowSelection="single"
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
        headerName: "Tel. Perso.",
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
        width: 200,
      },


    ];

    ngOnInit() {


      this.getadrpers();
      this.getrenspers();
      this.getconjoint();
      this.getcollaborateur()
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
      this.serv.getpersonnel(this.perso11).subscribe(
        (data) => {
          this.perso11 = data;
          console.log("exected" + data);

          this.n = this.perso11.cod_serv;

          console.log("nnn" + this.n);
          this.getcollaborateur();

          //  this.adrpersbycodeandmat=this.perso11.adresses_personnel
          //this.rens=this.perso11.rens_pers
        },
        (err) => {
          console.log(err);
        }
      );
    }

    getadrpers() {

    }
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
        },
        (err) => {
          console.log(err);
        }
      );
    }

    smallModal(smallDataModal: any) {
      this.modalService.open(smallDataModal, { size: "sm", centered: true });
    }


    onSelectionChanged(event:SelectionChangedEvent) {

      var selectedRows = this.gridApi.getSelectedRows();
      console.log(selectedRows)
      var selectedRowsString = "";
      var selectedRowsMat = "";

      selectedRows.forEach(function(selectedRow, index) {
        if (index !== 0) {
          selectedRowsString += ", ";
        }
        selectedRowsString += selectedRow.cod_soc;
        selectedRowsMat += selectedRow.mat_pers;


      });

      this.serv.getpersonnelcol(selectedRowsString,selectedRowsMat).subscribe(
        (data: any[]) => {
          this.fiche = data;

        },
        (error) => {
          console.log(error);
        },

      );

        this.fam.getconjoint(selectedRowsString,selectedRowsMat).subscribe(
          (data:any[])=>{
            this.cjt = data;

            console.log("cjt"+this.cjt);

          }
        );
        this.fam.getEnfant(selectedRowsString,selectedRowsMat).subscribe(
          (data:any[])=>{
            this.enfant = data;

            console.log("cjt"+this.cjt);

          }
        );
        this.serv.getfamsoc(selectedRowsString,selectedRowsMat).subscribe(
          (data:any[])=>{
            this.famsoc = data;

            console.log("cjt"+this.cjt);

          }
        );
        this.serv27.getaffilpers(selectedRowsString,selectedRowsMat).subscribe(
          (data:any[])=>{
            this.aff = data;

            console.log("cjt"+this.cjt);

          }
        );









      this.gridOpen = !this.gridOpen;

    }





    action(code :any){
      this.fiche.cod_typ_bul=code
      console.log(this.fiche.cod_typ_bul)

      this.Comp.getEnfant(this.fiche.cod_soc,this.fiche.mat_pers,this.fiche.cod_typ_bul).subscribe(
        (data:any[])=>{
          this.cpt = data;

          console.log("ffff"+this.cpt.cpt_banq_pers);

        }
      );
     }



    modules: Module[] = [ClientSideRowModelModule];
  }
