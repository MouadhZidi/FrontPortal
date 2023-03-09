import { Component, OnInit } from '@angular/core';
import { DemandeService } from '../demande.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenStorage } from 'src/app/core/services/token-storage.service';
import { saveAs } from 'file-saver';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { Module } from '@ag-grid-community/core';
import Swal from 'sweetalert2';
import { Email } from '../elail.model';
import { WebsocketService } from 'src/app/layouts/topbar/shared/services/websocket.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonnelService } from '../../Employe/personnel.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-demande-situation',
  templateUrl: './demande-situation.component.html',
  styleUrls: ['./demande-situation.component.scss']
})
export class DemandeSituationComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  matRh:any
  dataForm:FormGroup
  rowData:any[]=[]
  file!:File
  emailBody: Email = {
    from: "",
    to: "",
    to_cc: "",
    to_bcc: "",
    subject: "",
    message: "",
    path_report: ""
  };
  
  Notification: any = {
    date_notif: "",
    libelle_notif: "",
    nom: "",
    type_notif: "",
    cod_soc:"",
	 mat_pers:"",
id_sender:"",
id_reciver:"",
etat_notif:""
  };
  dataa:any
  matChef:any
  email:any
  constructor(
    private serv:PersonnelService,private translatee:TranslateService,private demandeService:DemandeService,private formBuilder : FormBuilder
    ,private tokenService:TokenStorage,
    private modalService: NgbModal,
    private websocketService: WebsocketService) { }

  ngOnInit(): void {

    this.breadCrumbItems = [{ label: 'Espace demande' }, { label: 'Demande situation', active: true }];

    this.dataForm = this.formBuilder.group({
      id_libre_demande : [''],
      

      dateDemande : [(new Date()).toLocaleDateString().substring(0,10),Validators.required],
      txtDem: ['', Validators.required],
      reponse:[''],
      typDemande:['S'],
      matPers:[this.tokenService.getUser().matpers],
      codSoc:[this.tokenService.getUser().cod_soc]
    });
    this.getListSituation()
    this.getEmailChef()

    console.log('lang curren ',this.translatee.currentLang)
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
  getEmailChef(){
    this.demandeService.GetAdrChef("10321").subscribe(
      (data:any) =>{
        this.email=data

      }
    )
   }
  columnDefs = [
    {
      headerName:"Date demande",
      field: "dateDemande",
      filter: "agDateColumnFilter",
      sortable:true,
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
    { headerName: "Objet", 
    field: "txtDem", 
    editable: true,
    floatingFilter: true,   
       filter:true,
       width:400,

  },
    { headerName: "Observation Rh", 
    field: "txtReponse", 
    editable: true,
    width:400,
    floatingFilter: true,   
       filter:true,

  },


    {
      headerName: "Réponse RH",
      field: "reponse",
      editable: true,
      filter:true,
      floatingFilter: true,

    },
    
    {
      headerName: "Fichier",
      field: "fileName",
      cellRenderer: this.createHyperLink.bind(this),
width:400,
      editable: true,
      floatingFilter: true,

      
    },
   

  ];
  defaultColDef = {
    sortable: true,
    filter: true,
  };
  createHyperLink(params:any): any {
    console.log(params.data.id_libre_demande)
  
  
  
    if (!params.data) { return; }
    const spanElement = document.createElement('span');
    if(params.value!=null){
      spanElement.innerHTML = `<a href="${this.homeUrl}" > ${params.value} </a> `;
      spanElement.addEventListener("click", ($event) => {
        $event.preventDefault();
        // The below code is used to navigate from one page to another page in angular. you can change it          // according to your requirement.
        this.demandeService
          .download(params.data.id_libre_demande)
          .subscribe((blob) => saveAs(blob, params.value));
      });
    }else{
      spanElement.innerHTML = `<h6>fichier inexistant</h6> `;

    }

    return spanElement;
  }
  get homeUrl(): string {
    return 'home';
  }
  onUpload() {
    this.demandeService.GetMatRH().subscribe(
      (data: any[]) => {
        this.dataa = data;
        this.matRh=this.dataa.matpers
        this.Notification.id_reciver=this.matRh

        console.log(this.matRh);
      },
      (error) => {
        console.log(error);
      }
    );
    const formData = new  FormData();
    const article = this.dataForm.value;
    console.log("elyes : "+this.file)
    formData.append('file',this.file);
    formData.append('demande',JSON.stringify(article));
    this.emailBody.message=this.dataForm.get('txtDem').value 
    this.emailBody.subject="Autorisation"
    this.emailBody.to=this.email.adr_electronique
    this.Notification.date_notif=this.dataForm.get('dateDemande').value 
    this.Notification.libelle_notif="Demande"
    this.Notification.nom=this.dataForm.get('txtDem').value 
    this.Notification.type_notif="Situation"
    this.Notification.mat_pers=this.tokenService.getUser().matpers
    this.Notification.id_sender=this.tokenService.getUser().matpers
    
    this.Notification.etat_notif="N"
   
    this.Notification.cod_soc=this.tokenService.getUser().cod_soc
    
    if(this.file==null)
    {
     this.demandeService.CreateDemWithoutFile(this.dataForm.value).subscribe(
       (event: any) => {
         if (event) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Votre demande à été bien enregistrer',
            showConfirmButton: false,
            timer: 2000
          });
           this.getListSituation()
           this.demandeService.sendMail(this.emailBody).subscribe(
            (event: any) => {
             console.log(event)
            }
        );
        this.websocketService.AjouNotif(this.Notification).subscribe(
          (event: any) => {
          }
      );
         } else {
         //  this.toastr.error('Echec ajout', 'Problème de suppression.');
         }
          
           
       }
   );
    }else{ this.demandeService.upload(formData).subscribe(
        (event: any) => {
          if (event) {
           Swal.fire({
             position: 'top-end',
             icon: 'success',
             title: 'Votre demande à été bien enregistrer',
             showConfirmButton: false,
             timer: 2000
           });
            this.getListSituation()
            this.demandeService.sendMail(this.emailBody).subscribe(
              (event: any) => {
               console.log(event)
              }
          );
          } else {
          //  this.toastr.error('Echec ajout', 'Problème de suppression.');
          }
           
            
        }
    );
   }
  }
  getListSituation() {
    this.demandeService.GetChambreByCode(this.tokenService.getUser().cod_soc,
    this.tokenService.getUser().matpers,"S").subscribe(
      (data: any[]) => {
        this.rowData = data;
  
        
      },
      (error) => {
        console.log(error);
      }
    );
  }
  onChange(event:any) {
    this.file = event.target.files[0];
}


openModal(targetModal) {
  this.modalService.open(targetModal, {
    windowClass: "my-class",
    centered: true,
  });
}


  modules: Module[] = [ClientSideRowModelModule];


}
