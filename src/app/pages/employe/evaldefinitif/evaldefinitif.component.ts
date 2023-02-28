import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TokenStorage } from 'src/app/core/services/token-storage.service';
import { FamilleService } from '../famille.service';
import { FicheevalcompService } from '../ficheevalcomp.service';
import { ModeleService } from '../modele.service';
import { PersonnelService } from '../personnel.service';
import { RenseignementpersService } from '../renseignementpers.service';
import { Module } from "@ag-grid-community/core";
import { ValeurficheevalService } from '../valeurficheeval.service';
import { GridApi } from 'ag-grid-community';
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-evaldefinitif',
  templateUrl: './evaldefinitif.component.html',
  styleUrls: ['./evaldefinitif.component.scss']
})
export class EvaldefinitifComponent implements OnInit {

  a:any=""
  e:any=""
  
    x:any
    list:any=[]
  
    title = "grid";
    api!: GridApi;
    rowData: any[] = [];
    mod:any=[]
    tac:any
    ficheeval:any
    fiche
   y:any
    cod_soc:any
    mat_pers:any
  conjoint:any=[]
    perso:any
    get44:any
    ad:any
    affect:any
    deb:any
    fin:any
    nat:any
    etat:any
    sexe:any
    tab: any;
     gouv: any ;
    tab2: any;
    getbymatcod:any
    rens:any=[]
    adrpersbycodeandmat:any=[]
    rensper:any
    g:any;
    mat:any
    user:any
  h:string="10908"
    perso11 :any = {
      cod_soc:this.token.getUser().cod_soc,
      mat_pers:this.token.getUser().matpers}
  
      val :any = {
        cod_soc:this.token.getUser().cod_soc,
        mat_pers:this.token.getUser().matpers,
     
        annee:this.e
    }
   formEval:FormGroup
    // bread crumb items
  
  
    constructor(private translatee:TranslateService,private token:TokenStorage,private serv:PersonnelService,private serv2:FamilleService,private serv3:RenseignementpersService,
      private servmod:ModeleService,private servficheeval:FicheevalcompService,private servval:ValeurficheevalService,private fb:FormBuilder) { }
  
    ngOnInit() {
  
      this.getpers()
      this.getadrpers()
      this.getrenspers()
      this.getconjoint()
      this.getallmodele()
      this.getficheeval()
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
    getpers(){
  
      this.serv.getpersonnel(this.perso11).subscribe(
        data => {
          this.perso11 = data; console.log('exected' + data);
         this.adrpersbycodeandmat=this.perso11.adresses_personnel
         this.rens=this.perso11.rens_pers
          
        },
        err => {
          console.log(err);
        }
        );}
        getadrpers(){
  
          this.serv.getpersonnel(this.perso11).subscribe(
            data => {
  
             this.adrpersbycodeandmat=this.perso11.adresses_personnel
            },
            err => {
              console.log(err);
            }
            );
  
  
  
  
  
  
    }
    getrenspers(){
  
      this.servmod.getall().subscribe(
        data => {
  
         this.rens=this.perso11.rens_pers
        },
        err => {
          console.log(err);
        }
        );
  
  
  
  
  
  
  }
  getconjoint(){
    this.serv2.getconjoint(this.token.getUser().cod_soc,this.token.getUser().matpers).subscribe(
      data => {
  
       this.conjoint=this.perso11.rens_pers
      },
      err => {
        console.log(err);
      }
      );
  
  
  
  
  
  }
  getallmodele(){
  
  
    this.servmod.getall().subscribe(
      data => {
  
       this.mod=data
      },
      err => {
        console.log(err);
      }
      );
  
  
  }
  getficheeval(){
    this.servficheeval.getFicheEval(this.token.getUser().matpers).subscribe(
      data => {
  
       this.ficheeval=data
  
       this.formEval = this.fb.group({
        annee: [this.ficheeval.dat_eval],
        mat_pers: [this.token.getUser().matpers],
        cod_soc: [this.token.getUser().cod_soc],
      });
       console.log(data)
      },
      err => {
        console.log(err);
      }
      );
  
  
  
  
  }
  gettac()
  {
    this.servval.gettac(this.formEval.value).subscribe(
      data => {
  
       this.tac=data
       console.log("vvvv"+data)
      },
      err => {
        console.log(err);
      }
      );
  
  
  
  
  }
  
  columnDefs = [
    {
      headerName: "Année",
      field: "annee",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 200,
    },
    {
      headerName: "Taux reel.Obj",
      field: "taux_real_obj",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 230,
    },
    
    
    {
      headerName: "Taux App. Comp",
      field: "taux_app_comp",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 150,
      
     
    },
    {
      headerName: "Taux Eval. Def",
      field: "taux_eval_def",
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
      width: 180,
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
      headerName: "Lib. Val",
      field: "libval",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 150,
    },{
      headerName: "Code banque sociale",
      field: "cod_banq_soc",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 180,
    },
  
  
  
    
  
  
    
  
    {
      headerName: "Code agence sociale",
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
  
  GetConge22() {
    this.servval.evaldef(this.formEval.value).subscribe(
      (data: any[]) => {
        this.rowData = data;
        this.gettac()
  
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