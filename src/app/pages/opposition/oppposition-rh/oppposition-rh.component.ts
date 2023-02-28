import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TokenStorage } from 'src/app/core/services/token-storage.service';
import { LigbsoinService } from '../../bsoin/services/ligbsoin.service';
import { PersonnelService } from '../../Employe/personnel.service';
import { OppositionserviceService } from '../services/oppositionservice.service';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { Module } from '@ag-grid-community/core';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-oppposition-rh',
  templateUrl: './oppposition-rh.component.html',
  styleUrls: ['./oppposition-rh.component.scss']
})
export class OpppositionRhComponent implements OnInit {

  [x: string]: any;
  idCessionPers:any={
    cod_soc:this.token.getUser().cod_soc,
    mat_pers:this.token.getUser().matpers,
    cod_pret: 1

  }
  idLpret:any={
    cod_soc:this.token.getUser().cod_soc,
    mat_pers:this.token.getUser().matpers,
    cod_pret: 1,
    l_pret:0

  }
  formDocument:FormGroup
  list:any;
  list1:any;

  data !:any;
  listPers:any;
  listlig:any;
  listL:any;
  dataL !:any;
  typ_pret:any[];
  perso11 :any = {
    cod_soc:this.token.getUser().cod_soc,
    mat_pers:this.token.getUser().matpers,
 
  }
  
    array : any;

  constructor(private serv :OppositionserviceService,public token:TokenStorage, private service:PersonnelService
    ,private serv1 : LigbsoinService,private formBuilder:FormBuilder,      public translatee: TranslateService
    ) {

  
   }

  ngOnInit() {

    this.formDocument = this.formBuilder.group({

      mat_pers: [""],
      cod_pret:[""],
      cod_soc: [""],
    });
    this.perso11.cod_pret=this.codepret
    this.getpers()


 
 
  // this.getCessionPerso()

 
    this.getgouv1()
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
   anotherFunction(event: Event ) {
   
    if (event){
    console.log(this.listlig.l_pret)
   
    }

    //throw new Error('Function not implemented.');
  }
  action(code :any){

    if (code){
      console.log(code)
      this.idLpret.l_pret=code
      console.log(this.idLpret.l_pret)

      this.getLpret()
      // this.getCessionPerso()
      }


  }
  getCessionPerso(){
    this.serv.fetchCessionPers(this.formDocument.value).subscribe(
      
        data => {
          this.list =data;
       //   this.list1=data;
          this.listlig=this.list.ligCession;

          console.log(" 1 :",this.listlig[0].l_pret); 
          

       
      },
      err => {
        console.log(err);
      }
      );

    }
    

    getLpret(){
      this.serv.fetchgetlpret(this.idLpret).subscribe(
        
          dataL => {
            this.listL =dataL;
  
            console.log(" l pret:",dataL); 
  
         
        },
        err => {
          console.log(err);
        }
        );
  
      }





    getpers(){

      this.service.getpersonnel(this.perso11).subscribe(
        data => {
          this.perso11 = data; console.log('exected' + data);
         this.adrpersbycodeandmat=this.perso11.adresses_personnel
         this.rens=this.perso11.rens_pers
          //console.log("dddddddd"+this.perso11.nom_pers)
        },
        err => {
          console.log(err);
        }
        );}

        
        saveCustomer() {}
    


        
  test(){
    this.idCessionPers.cod_pret=this.codepret
    this.getCessionPerso()
    console.log("test : ",this.idCessionPers.cod_pret);
  } 

  getgouv(){
    this.serv.bultSoinDet(this.idCessionPers).subscribe(
      data => {
        this.list =data;
       this.ligbult =this.list.ligBult
     //  this.array=this.list.numSoinParam
      // console.log("dddd : ",this.array );


       
      },
      err => {
        console.log(err);
      }
      );
}


getgouv1(){
  this.serv.fetchListCodPret(this.token.getUser().cod_soc,this.token.getUser().matpers).subscribe(
    data1 => {
      this.array =data1;
     //this.ligbult =this.list.ligBult
    // this.array=this.list.numSoinParam

      console.log("dddd : ",this.array );
     
    },
    err => {
      console.log(err);
    }
    );

  }

  columnDefs = [
    {
      headerName: "N Lig",
      field: "l_pret",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 150,
    },
    {
      headerName: "Type Bulletin",
      field: "cod_typ_bul",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 200,
    },
    {
      headerName: "Libellé",
      field: "libBulletin",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 200,
    },
    
    {
      headerName: "Date tranche réel",
      field: "mois_pret_prevu",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 200,
    },
    {
      headerName: "Retenue",
      field: "val_pret",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 200,
    },
    {
      headerName: "Rest cap prêt",
      field: "cap_rest",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 200,
    },
    {
      headerName: "Validé",
      field: "val_pret",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 200,
    },
    {
      headerName: "Régler",
      field: "reg_pret",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 180,
    },
   
  
  ];
  
  listObject:any
  modules: Module[] = [ClientSideRowModelModule];
  }