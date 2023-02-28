import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { TokenStorage } from "src/app/core/services/token-storage.service";
import { FamilleService } from "../../Employe/famille.service";
import { PersonnelService } from "../../Employe/personnel.service";
import { RenseignementpersService } from "../../Employe/renseignementpers.service";
import { GridApi } from "ag-grid-community";
import { Module } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
@Component({
  selector: 'app-adrpersgrid',
  templateUrl: './adrpersgrid.component.html',
  styleUrls: ['./adrpersgrid.component.scss']
})
export class AdrpersgridComponent implements OnInit {
  z:any
  api!: GridApi;
  rowData: any=[]
  n: any;
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

  // bread crumb items
  collab: any
  @Input() testdelay: Boolean = false;

  constructor(
    private cd: ChangeDetectorRef,
    private token: TokenStorage,
    private serv: PersonnelService,
    private serv2: FamilleService,
    private serv3: RenseignementpersService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
 

    this.getpers();
    this.getadrpers();
    this.getrenspers();
    this.getconjoint();
    this.getcollaborateur();
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
  getpers() {
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
    this.serv.getpersonnel(this.perso11).subscribe(
      (data) => {
        this.adrpersbycodeandmat = this.perso11.adresses_personnel;
      },
      (err) => {
        console.log(err);
      }
    );
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
    this.serv.getadr(this.n, this.token.getUser().matpers).subscribe(
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

  columnDefs = [
    {
      headerName: "Rue",
      field: "fiche.adresses_personnel.rue",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 200,
    },
    {
      headerName: "Rue 2éme langue",
      field: "fiche.adresses_personnel.rue_a",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 200,
    },
    {
      headerName: "Nom et prenom",
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
      width: 200,
    },
    
    
  ];

  modules: Module[] = [ClientSideRowModelModule];
}
