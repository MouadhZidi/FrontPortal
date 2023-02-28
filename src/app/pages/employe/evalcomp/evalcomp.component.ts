import { Component, OnInit } from "@angular/core";
import { TokenStorage } from "src/app/core/services/token-storage.service";
import { FamilleService } from "../famille.service";
import { FicheevalcompService } from "../ficheevalcomp.service";
import { ModeleService } from "../modele.service";
import { PersonnelService } from "../personnel.service";
import { RenseignementpersService } from "../renseignementpers.service";
import { ValeurficheevalService } from "../valeurficheeval.service";
import { GridApi } from "ag-grid-community";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { Module } from "@ag-grid-community/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import Swal from "sweetalert2";

@Component({
  selector: "app-evalcomp",
  templateUrl: "./evalcomp.component.html",
  styleUrls: ["./evalcomp.component.scss"],
})
export class EvalcompComponent implements OnInit {
  a: any = "";
  e: any = "";

  x: any;
  list: any = [];

  title = "grid";
  api!: GridApi;
  rowData: any[] = [];
  mod: any = [];
  tac: any;
  ficheeval: any;
  fiche;
  y: any;
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
  user: any;
  h: string = "10908";
  perso11: any = {
    cod_soc: this.token.getUser().cod_soc,
    mat_pers: this.token.getUser().matpers,
  };

  val: any = {
    cod_soc: this.token.getUser().cod_soc,
    mat_pers: this.token.getUser().matpers,
    ref_mod: this.a,
    dat_eval: this.e,
  };
  formEval: FormGroup;
  // bread crumb items

  constructor(
    private token: TokenStorage,
    private servv: PersonnelService,
    private serv2: FamilleService,
    private serv3: RenseignementpersService,
    private servmod: ModeleService,
    private servficheeval: FicheevalcompService,
    private servval: ValeurficheevalService,
    private fb: FormBuilder,
    private translatee: TranslateService
  ) {}

  ngOnInit() {
    this.getpers();
    this.getadrpers();
    this.getrenspers();
    this.getconjoint();
    this.getallmodele();
    this.getficheeval();
    this.servv.language$.subscribe((language) => {
      this.translateHeaderNames(language);
    });
    const currentLang = this.translatee.getBrowserLang();
    this.translatee.onLangChange.subscribe(() => {
      this.columnDefs = this.columnDefs.map((col) => {
        col.headerName = this.translatee.instant(col.headerName, currentLang);
        return col;
      });
    });
  }
  changeLanguage() {
    const currentLanguage = this.servv.languageSubject.value;
    this.servv.setLanguage(currentLanguage === "en" ? "fr" : "en");
  }

  translateHeaderNames(language: string) {
    this.columnDefs = this.columnDefs.map((col) => {
      col.headerName = this.translatee.instant(col.headerName, language);
      return col;
    });
  }
  getpers() {
    this.servv.getpersonnel(this.perso11).subscribe(
      (data) => {
        this.perso11 = data;
        console.log("exected" + data);
        this.adrpersbycodeandmat = this.perso11.adresses_personnel;
        this.rens = this.perso11.rens_pers;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getadrpers() {
    this.servv.getpersonnel(this.perso11).subscribe(
      (data) => {
        this.adrpersbycodeandmat = this.perso11.adresses_personnel;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getrenspers() {
    this.servmod.getall().subscribe(
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
  getallmodele() {
    this.servmod.getall().subscribe(
      (data) => {
        this.mod = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getficheeval() {
    this.servficheeval.getFicheEval(this.token.getUser().matpers).subscribe(
      (data) => {
        this.ficheeval = data;

        this.formEval = this.fb.group({
          dat_eval: [this.ficheeval.dat_eval],
          ref_mod: [this.ficheeval.ref_mod],
          mat_pers: [this.token.getUser().matpers],
          cod_soc: [this.token.getUser().cod_soc],
        });
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  gettac() {
    this.servval.gettac(this.formEval.value).subscribe(
      (data) => {
        this.tac = data;
        console.log("vvvv" + data);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  columnDefs = [
    {
      headerName: "Code compétence",
      field: "cod_nat_comp",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 160,
    },
    {
      headerName: "Nbr des points",
      field: "nbr_point",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 150,
    },

    {
      headerName: "Acquis",
      field: "aquis_O_N",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 150,
    },
    {
      headerName: "Libellé critére",
      field: "lib_critere",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 170,
    },

    {
      field: "dat_eval",
      headerName: "Date evaluation",
      filter: "agDateColumnFilter",
      resizable: true,
      width: 150,
      sortable: true,
      floatingFilter: true,

      filterParams: {

        comparator: function (filterLocalDateAtMidnight: any, cellValue: any) {
          var dateAsString = cellValue;

          if (dateAsString == null) {
            return 0;
          }


          var dateParts = dateAsString.split("/");
          var year = Number(dateParts[2]);
          var month = Number(dateParts[1]) - 1;
          var day = Number(dateParts[0]);
          var cellDate = new Date(year, month, day);

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
      headerName: "Compétence",
      field: "lib_banq",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      enableRowGroup: true,
      width: 180,
    },
    {
      headerName: "Libélle evaluation",
      field: "libval",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 150,
    },
    {
      headerName: "C. Banque sociale",
      field: "cod_banq_soc",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 180,
    },

    {
      headerName: "C. Agence sociale",
      field: "cod_agc_soc",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 200,
    },
  ];

  defaultColDef = {
    sortable: true,
    filter: true,
  };


  GetConge22() {
    this.servval.getficheeval(this.formEval.value).subscribe(
      (data: any[]) => {
        this.rowData = data;
        this.gettac();

        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public onQuickFilterChanged($event: any) {
    this.api.setQuickFilter($event.target.value);
  }

  modules: Module[] = [ClientSideRowModelModule];
}
