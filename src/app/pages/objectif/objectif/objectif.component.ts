import { Component, OnInit } from '@angular/core';

import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { Module } from "@ag-grid-community/core";
import { TokenStorage } from "src/app/core/services/token-storage.service";
import { Obejectif } from "../obejectif";
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import Swal from "sweetalert2";
import { MiseAObejectifService } from '../mise-a-obejectif.service';
import { TranslateService } from '@ngx-translate/core';
import { PersonnelService } from '../../Employe/personnel.service';

@Component({
  selector: 'app-objectif',
  templateUrl: './objectif.component.html',
  styleUrls: ['./objectif.component.scss']
})
export class ObjectifComponent implements OnInit {
  [x: string]: any;
  list:any
  listObject:any
private code !: GridApi<Obejectif>
constructor( private servv:PersonnelService,     public translatee: TranslateService
,  public serv :MiseAObejectifService,public token:TokenStorage) { }

ngOnInit(): void {
  this.getListOjectif()
  const currentLang = this.translatee.getBrowserLang();
  this.translatee.onLangChange.subscribe(() => {
    this.columnDefs = this.columnDefs.map((col) => {
      col.headerName = this.translatee.instant(col.headerName,currentLang);
      return col;
    });
  });
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
getListOjectif(){

  this.serv.fetchListObjectif(this.token.getUser().cod_soc,this.token.getUser().matpers)
  .subscribe(
    (data :any) =>

    {

      this.list=data
      this.code=data
      console.log("objeeeectiiiiiiiiiiiiiiiiiiiif"+this.list)


    }
  )
}

getListOjectifSelected(){

 
}

columnDefs = [
  {
    headerName: "Matricule",
    field: "mat_pers",
    editable: true,
    resizable: true,
    sortable: true,
    filter: true,
    floatingFilter: true,
    width: 250,
  },
  {
    headerName: "Nom & prénom",
    field: "nom_pren",
    editable: true,
    resizable: true,
    sortable: true,
    filter: true,
    floatingFilter: true,
    width: 850,
  },
  {
    headerName: "Année",
    field: "annee",
    editable: true,
    resizable: true,
    sortable: true,
    filter: true,
    floatingFilter: true,
    width: 250,
  },
  
  // {
  //   headerName: "Code Service",
  //   field: "cod_serv",
  //   editable: true,
  //   resizable: true,
  //   sortable: true,
  //   filter: true,
  //   floatingFilter: true,
  //   width: 250,
  // },
  
  {
    headerName: "Num objectif",
    field: "num_objectif",
    editable: true,
    resizable: true,
    sortable: true,
    filter: true,
    floatingFilter: true,
    width: 250,
  },
];


modules: Module[] = [ClientSideRowModelModule];
onCellClicked(cellData){
console.log(cellData.value);
this.serv.fetchListObjectifPers(this.token.getUser().cod_soc,this.token.getUser().matpers,cellData.value)
  .subscribe(
    (data :any) =>
    {
      this.listObject=null

   
      this.listObject=data
      this.code=data
      console.log("objeeeectiiiiiiiiiiiiiiiiiiiif"+this.listObject)


    }
  )

}

list1:any
//clear 
submit() { 

this.obj = {
  cod_soc: this.token.getUser().cod_soc,
  mat_pers: this.token.getUser().matpers,
  annee:2022,
  num_objectif: this.objectif,
  lib_objectif:this.libele


}
console.log("init"+this.objectif+"    "+this.libele);

this.serv.addObj(this.obj).subscribe(
  (event: any) => {
    this.objectif=''
    this.libele=''
console.log("hhhhhhhhhhhhhhhhtttt"+event)

    if (event=null) {
     
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Votre objectif à été bien enregistrer !',
          showConfirmButton: false,
          timer: 2000
        }
        
        );
      
        }
         else {
       // this.toastr.error('Echec ajout', 'Problème de suppression.');
      }
        // Short link via api response

    
}

  );

}





tmpo;
count = 0;
arrayOfObj = [];

obj:Obejectif ;


onAddRow(){

//this.listObject=null
this.tmpo=1;
this.count ++;
console.log("yytttttttttttt"+this.objectif)

if(this.count==1){
this.arrayOfObj.push(this.count);


}
if(this.count>=2){
this.objectif=''
this.libele=''
console.log("init"+this.objectif+"    "+this.libele);

}

}

}
