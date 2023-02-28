import { Component, OnInit } from '@angular/core';
import { GridApi } from "ag-grid-community";
import { Module } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { TokenStorage } from 'src/app/core/services/token-storage.service';
import { ObjempService } from '../objemp.service';
import { TranslateService } from '@ngx-translate/core';
import { PersonnelService } from '../personnel.service';

@Component({
  selector: 'app-aggridobjagent',
  templateUrl: './aggridobjagent.component.html',
  styleUrls: ['./aggridobjagent.component.scss']
})
export class AggridobjagentComponent implements OnInit {

  gouv:any
  title = "grid";
  api!: GridApi;
  rowData: any[] = [];
  codsoc:any
  prs:any=[]
  perso11 :any = {
    cod_soc:this.token.getUser().cod_soc,
    mat_pers:this.token.getUser().matpers
  };


  constructor(private servv:PersonnelService,private translatee:TranslateService,private serv: ObjempService, private token: TokenStorage) {



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
      headerName: "Année",
      field: "annee",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 250,
    },
    {
      headerName: "Numero objectif",
      field: "num_objectif",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 300,
    },
    {
      headerName: "Libellé objectif",
      field: "app",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 700,
    },


  ];


  ngOnInit() {

    this.getFacture();
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
  }
  defaultColDef = {
    sortable: true,
    filter: true,
  };
  getFacture() {
    this.serv.getobj(this.token.getUser().cod_soc,this.token.getUser().matpers).subscribe(
      (data: any[]) => {
        this.rowData=data



        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }




  modules: Module[] = [ClientSideRowModelModule];
}
