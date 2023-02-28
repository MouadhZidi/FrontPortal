import { Component, OnInit } from '@angular/core';
import { GridApi, SelectionChangedEvent } from "ag-grid-community";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { Module } from "@ag-grid-community/core";
import { TokenStorage } from 'src/app/core/services/token-storage.service';
import { ComptepersService } from '../comptepers.service';
import { PersonnelService } from '../personnel.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-comptepers',
  templateUrl: './comptepers.component.html',
  styleUrls: ['./comptepers.component.scss']
})
export class ComptepersComponent implements OnInit {
  x:any
  list:any=[]
   gridApi;
   gridColumnApi;
    rowSelection;
    gridOpen:boolean
   columnDefs;
   defaultColDef;
   detailCellRendererParams;
  title = "grid";
  api!: GridApi;
  rowData: any[] = [];
  perso11 :any = {
    cod_soc:this.tokenService.getUser().cod_soc,
    mat_pers:this.tokenService.getUser().matpers}
  constructor(public translate:TranslateService, private serve:PersonnelService,private serv: ComptepersService,private tokenService:TokenStorage) {

    this.columnDefs = [

      {
        headerName: "Compte bancaire perso",
        field: "lib_bul",
        editable: true,
        resizable: true,
        sortable: true,
        filter: true,
        floatingFilter: true,
        width: 230,
      },
      
      
    
      {
        headerName: "Code banque",
        field: "cod_typ_bul",
        editable: true,
        resizable: true,
        sortable: true,
        filter: true,
        floatingFilter: true,
        width: 300,
        
       
      },

      
    ];
  
    this.defaultColDef = {
      flex: 1,
      minWidth: 100,
    };
    this.rowSelection = 'single';
    
  }
  
  

  ngOnInit() {
    this.GetConge();
    this.GetConge22()
    this.serve.language$.subscribe((language) => {
      this.translateHeaderNames(language);
      this.translateHeaderNamess(language);
    });
    const currentLang = this.translate.getBrowserLang();
    this.translate.onLangChange.subscribe(() => {
      this.columnDefs = this.columnDefs.map((col) => {
        col.headerName = this.translate.instant(col.headerName,currentLang);
        return col;
      }
      
      
      
      
      
      );
      
    });


    this.serve.language$.subscribe((language) => {
      
    });
   
    this.translate.onLangChange.subscribe(() => {
      this.columnDefss = this.columnDefss.map((col2) => {
        col2.headerName = this.translate.instant(col2.headerName,currentLang);
        return col2;
      }
      
      
      
      
      
      );
      
    });
   

  }



  changeLanguage() {
    const currentLanguage = this.serve.languageSubject.value;
    this.serve.setLanguage(currentLanguage === 'en' ? 'fr' : 'en');
  }

  translateHeaderNames(language: string) {
    this.columnDefs = this.columnDefs.map((col) => {
      col.headerName = this.translate.instant(col.headerName, language);
      return col;
    });
  }
  translateHeaderNamess(language: string) {
    this.columnDefss = this.columnDefss.map((col) => {
      col.headerName = this.translate.instant(col.headerName, language);
      return col;
    });
  }

  columnDefss = [
   
    {
      headerName: "Compte banque personnel",
      field: "cpt_banq_pers",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 660,
    },
   
    {
      headerName: "Code banque",
      field: "cod_banq",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 60,
      
     
    },
    

    {
      headerName: "libellé banque",
      field: "lib_banq",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      enableRowGroup: true,
      width: 450,
      

     
    },
    
    
 
   
   

   

    



    {
      headerName: "code agence",
      field: "cod_agc",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 200,
    },


    


    

   
  ];
  
  onSelectionChanged(event:SelectionChangedEvent) {
    var selectedRows = this.gridApi.getSelectedRows();
    var selectedRowsString = "";
    selectedRows.forEach(function(selectedRow, index) {
      if (index !== 0) {
        selectedRowsString += ", ";
      }
      selectedRowsString += selectedRow.cod_typ_bul;

    });

    this.serv.getEnfant(this.tokenService.getUser().cod_soc,this.tokenService.getUser().matpers,selectedRowsString).subscribe(
      (data: any[]) => {
        this.rowData = data;

        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
    document.querySelector("#selectedRows").innerHTML = selectedRowsString;
    this.gridOpen = !this.gridOpen;

  }

  getpers(params){
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.serve.getpersonnel(this.perso11).subscribe(
      data => {
        this.perso11 = data; console.log('exected' + data);
        console.log(this.perso11);

      },
      err => {
        console.log(err);
      }
      );}
  
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

  /**                                <td>{{item.cod_typ_bul}} </td>
                                <td >{{item.lib_bul}}</td>
                                <td *ngIf="item.cod_pay=='V'">Virement</td>
                                <td *ngIf="item.cod_pay=='E'">Especes</td>
                                <td *ngIf="item.cod_pay=='C'">Chéque</td>
              
                                <td>{{item.date_modp}}</td> */
                                


  GetConge() {
    this.serv.getEnfant(this.tokenService.getUser().cod_soc,this.tokenService.getUser().matpers,this.x).subscribe(
      (data: any[]) => {
        this.rowData = data;

        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  GetConge22() {
    this.serv.getall().subscribe(
      (data: any[]) => {
        this.list = data;

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
