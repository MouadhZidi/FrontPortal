
import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { TokenStorage } from "src/app/core/services/token-storage.service";
import { ConsltmanagerService } from "../consltmanager.service";
import { ColumnApi, ExcelStyle, GridApi, GridReadyEvent, Module, SelectionChangedEvent } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { TranslateService } from "@ngx-translate/core";
import { PersonnelService } from "../../Employe/personnel.service";

@Component({
  selector: "app-competence",
  templateUrl: "./competence.component.html",
  styleUrls: ["./competence.component.scss"],
})
export class CompetenceComponent implements OnInit {
  [x: string]: any;
  gridApi: GridApi;
    defaultColDef2;

    codNatCompet:any
    codComp:any
    nivCompet:any
    datValid:any
    lieblle:any
   competence :any 
   competencePers:any
   appreciation:any
   valid:any
   listComptObj :any
   listComptPers:any




   list: any;
   listOptionComp: any;
   listNatComp: any;
   list2: any;
   valFix = 1;
   valFix1 = 0;
 
   listComp: any;
   listReq: any;
   //hiding info box
   visibleDiv: boolean = true;
   invisibleDiv: boolean = false;
 
 
   isCliked:boolean=false
  ngOnInit(): void {
    this.fectchListCompetence();
    this.fectchListPers();
    console.log('lang curren ',this.translatee.currentLang)
    this.serve.language$.subscribe((language) => {
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
    const currentLanguage = this.serve.languageSubject.value;
    this.serve.setLanguage(currentLanguage === 'en' ? 'fr' : 'en');
  }

  translateHeaderNames(language: string) {
    this.columnDefs = this.columnDefs.map((col) => {
      col.headerName = this.translatee.instant(col.headerName, language);
      return col;
    });
  }

  constructor(
    private translatee:TranslateService , 
    private serve: PersonnelService,
    private serv: ConsltmanagerService,
    private token: TokenStorage,private cd: ChangeDetectorRef

  ) {



    
  this.columnDefs = [
    {
      headerName: "Matricule",
      field: "mat_pers",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 150,
    },
    {
      headerName: "Nom & Prénom",
      field: "nom_pren",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 1110,
    }
    // ,
  
    // {
    //   headerName: "Services",
    //   field: "cod_serv",
    //   editable: true,
    //   resizable: true,
    //   sortable: true,
    //   filter: true,
    //   floatingFilter: true,
    //   width: 380,
    // },
  ];

  this.defaultColDef2 = {
    flex: 1,
    minWidth: 100,
  };
  this.rowSelection = 'single';

  }

  public api!: GridApi; 
  public columnApi!: ColumnApi; 

    public onQuickFilterChanged($event: any) {
    this.api.setQuickFilter($event.target.value);
}
onGridReady(params: GridReadyEvent) {
  this.gridApi = params.api;
}
public excelStyles: ExcelStyle[] = [
  {
    id: 'multiline',
    alignment: {
      wrapText: true,
    },
  },
];
//how to convert the data from ag grid to excel

onExport() {


 console.log(this.columnDefs)
}
listcol:any
exportAsXLSX():void {

  const data = [];
  this.gridApi.forEachNode(function(node) {
    data.push({Matricule: node.data.mat_pers, Nom : node.data.nom_pren, Services: node.data.cod_serv});
  });
  console.log(data);
  // insert data into a list
  this.listcol = data;


  this.excelService.exportAsExcelFile(this.listcol, 'export-to-excel');
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
      width: 150,
    },
    {
      headerName: "Nom & Prénom",
      field: "nom_pren",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 480,
    },
  
    // {
    //   headerName: "Services",
    //   field: "cod_serv",
    //   editable: true,
    //   resizable: true,
    //   sortable: true,
    //   filter: true,
    //   floatingFilter: true,
    //   width: 380,
    // },
  ];

  listObject: any;
  modules: Module[] = [ClientSideRowModelModule];
  fectchListCompetence() {
    this.serv
      .getListCompetenceReq(this.token.getUser().matpers)
      .subscribe((data: any) => {
        //this.listObject=data
        //console.log("competence"+this.listObject)
      });
  }

  fectchListPers() {
    this.serv
      .getListPers(this.token.getUser().cod_soc, this.token.getUser().matpers)
      .subscribe((data: any) => {
        this.listObject = data;
        console.log("competence" + this.listObject[0].mat_pers);
        this.list = data;
        if(!this.isCliked){


          this.serv
          .getListCompetenceReqPers(this.token.getUser().matpers, this.listObject[1].mat_pers)
          .subscribe((data1: any) => {
            this.conCandidat=this.listObject[1].mat_pers
            this.listComp=data1.find(x=>x!==undefined)
            this.list=data1.find(x=>x!==undefined)
            this.listOptionComp=data1.find(x=>x!==undefined)
            this.serv.getListNatCompetence().subscribe((data2: any) => {
              if (data2 != null) {
                this.listNatComp = data2;
              }
            });
       
              console.log("competenceoppppppppppppppppppppp" +data1.find(x=>x!==undefined));});
          }else{

            this.isCliked=true
            this.listComp=null
            this.list=null
            this.listOptionComp=null
          }
                   });
  }

  listCompReq:any;
  onCellClicked(event:SelectionChangedEvent) {

    this.isCliked=true
    var selectedRows = event.api.getSelectedRows();
    var selectedRowsString = "";
    selectedRows.forEach(function(selectedRow, index) {
      if (index !== 0) {
        selectedRowsString += ", ";
      }
      selectedRowsString += selectedRow.mat_pers;

    });

    this.conCandidat=selectedRowsString
  this.matPers=selectedRowsString
    this.serv
      .getListCompetenceReqPers(this.token.getUser().matpers, selectedRowsString)
      .subscribe((data1: any) => {
        console.log(
          "teeeeeeeeeeeest f :" + selectedRowsString
        );

    


          this.list = data1[0];
          this.list2 = data1;
          this.listOptionComp = data1[0];
          this.listComp = data1[0];
          this.listReq = data1[0];
         
       
      });
    this.serv.getCompReq(selectedRowsString).subscribe((datareq: any) => {
      console.log("comp req : f :" + datareq);

      this.listCompReq=datareq;
    
    
    });  

    this.serv.getListNatCompetence().subscribe((data2: any) => {
      if (data2 != null) {
        this.listNatComp = data2;
      }
    });

    document.querySelector("#selectedRows").innerHTML = selectedRowsString;
      this.gridOpen = !this.gridOpen;
  }

  tmpo;
  count = 0;
  arrayOfObj = [];
  onAddRow() {
    //this.listObject=null
    this.tmpo = 1;
    this.count++;

    if (this.count == 1) {
      this.arrayOfObj.push(this.count);
    }
    if (this.count >= 2) {
      this.objectif = "";
      this.libele = "";
    }
  }

  trackByIdx(index: number, obj: any): any {
    return index;
  }

  valNatComp: any;

  choseNatComp() {
    console.log("init" + this.valNatComp);
  }


  optionAppreciationVal(){
    console.log("appreciation"+this.valid)
    
     if(this.valid=="Annulé"){
    this.appreciation='A'
    console.log("appreciation"+this.appreciation)
    
     }
     else
     if(this.valid=="validé"){
      this.appreciation='V'
    console.log("appreciation"+this.appreciation)
    
       }
       else
       if(this.valid=="En instance"){
        this.appreciation='I'
    console.log("appreciation"+this.appreciation)
    
         }
       
    }
    convertObject(competencePersAdd: any) {
      const newObject = {
        competence: {
          cod_nat_comp: competencePersAdd.codNatComp,
          cod_comp: competencePersAdd.codComp,
          lib_comp: competencePersAdd.libComp
        },
        competencePers: {
          cod_soc: competencePersAdd.codSoc,
          cod_candidat: competencePersAdd.codCandidat,
          cod_nat_comp: competencePersAdd.codNatComp,
          cod_comp: competencePersAdd.codComp,
          dat_valid: competencePersAdd.datValid,
          appreciation: competencePersAdd.appreciation,
          cod_niv_comp: competencePersAdd.codNivComp
        }
      };
      return newObject;
    }
  

    competenceAndPersObject:any
    submit() { 

     // cod_comp
      this.cod=(Math.floor(100000 + Math.random() * 900000))

     // /covert data to format yy/MM/yyyy
      let date = new Date(this.datValid);
      let day = ("0" + date.getDate()).slice(-2);
      let month = ("0" + (date.getMonth() + 1)).slice(-2);
      let year = date.getFullYear();
      let formattedDate = `${day}/${month}/${year}`;
      

      this.competence = { 
        cod_nat_comp:this.valNatComp,
        cod_comp:this.cod,
        lib_comp:this.lieblle,
      }
      this.competencePers = { 
        cod_soc: this.token.getUser().cod_soc,
        cod_candidat:this.conCandidat,
        cod_nat_comp:this.valNatComp,
        cod_comp:this.cod,
        dat_valid:formattedDate,
        appreciation:this.appreciation,
        cod_niv_comp:this.nivCompet
      }
    

    this.competenceAndPersObject = {
        competence: this.competence,
        competencePers: this.competencePers
    };
    
    /*   this.serv.addCompetence(this.competenceAndPersObject.competence)
      .subscribe(
        (dataCompt :any) =>
        {
    
          this.listComptObj=dataCompt
    
    
        
    
            this.serv.addCompetencePers(this.competenceAndPersObject.competencePers)
            .subscribe(
              (dataComptPers :any) =>
              {
               this.listComptPers= dataComptPers
          console.log("listComptPers"+dataComptPers);
    
          this.fetchCompetenceList(this.matPers)
          this.codNatCompet=null
          this.nivCompet=null
          this.lieblle=null
         this.datValid=null
          this.appreciation=null
          this.valid=null
          this.valNatComp=null
    
              });
          
    
    
    
        }); */
    this.serv.saveCompetencePers(this.competenceAndPersObject).subscribe(   (data :any) =>
    {
     
        console.log("data", data);
        this.fetchCompetenceList(this.matPers);
        this.codNatCompet = null;
        this.nivCompet = null;
        this.lieblle = null;
        this.datValid = null;
        this.appreciation = null;
        this.valid = null;
        this.valNatComp = null;
    },
    (error: any) => {
        console.log("error", error);
    }

    );
    
      
      }


      


conCandidat:any
matPers:any
fetchCompetenceList(matPers :any){

  this.serv.getListCompetenceReqPers(this.token.getUser().matpers,matPers)
  .subscribe(
    (data1 :any) =>
    {


     
  
        this.valFix--

       
        
        this.list=data1[0]
        this.list2=data1
        this.listOptionComp=data1[0]
        this.listComp=data1[0]
        this.listReq=data1[0]
        this.valFix++



    
    }
  )

}

//delete row 

onDeletteRow(item){

  console.log(item.cod_soc,item.cod_candidat,item.cod_nat_comp,item.cod_comp)
  

  this.serv.deleteCompetencePers(item.cod_soc,item.cod_candidat,item.cod_nat_comp,item.cod_comp).subscribe(
    (data1 :any) => {
      console.log("eeeee"+data1);
      if (data1==null) {
        // refresh the list of data displayed on the screen
     
        this.list2.splice(this.list2.indexOf(item), 1);
      console.log("Competence is deleted");

      }
    },
    error => {
      console.log(error);
    }
  );
}
formFilled:boolean
checkForm(){

if (this.valNatComp && this.lieblle && this.datValid && this.nivCompet) {
  this.formFilled = true;
} else {
  this.formFilled = false;
}
}



formValid: boolean = false;
checkForm2() {
  let inputs = document.getElementsByTagName("input");
  let formValid = true;
  for (let i = 0; i < inputs.length; i++) {
    if (!inputs[i].value) {
      formValid = false;
      break;
    }
  }
  this.formValid = formValid;
}



 checkForm1() {

  
let inputCounter = 0;
let inputTotal = 0;
const inputs = Array.from(document.querySelectorAll('input'));
  for (let input of inputs) {
    if (!input.disabled) {
      inputTotal++;
      if (input.value) {
        inputCounter++;
      }
    }
  }

  if (inputCounter === inputTotal) {
    this.formValid  = false;
    
  } else {
    this.formValid = true;
  }
}



}
