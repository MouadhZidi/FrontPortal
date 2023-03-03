import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenStorage } from 'src/app/core/services/token-storage.service';
import { DemandeService } from '../demande.service';
import { saveAs } from 'file-saver';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { Module } from '@ag-grid-community/core';
import Swal from 'sweetalert2';
import { Email } from '../elail.model';
import { WebsocketService } from 'src/app/layouts/topbar/shared/services/websocket.service';
import { AjoutPersService } from '../../FicheSignalitique/ajout-pers.service';
import Inputmask from "inputmask";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonnelService } from '../../Employe/personnel.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-demande-autorisation',
  templateUrl: './demande-autorisation.component.html',
  styleUrls: ['./demande-autorisation.component.scss']
})
export class DemandeAutorisationComponent implements OnInit {
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
 r = 60;


 @ViewChild("myInputDateEmbauche") myInputElementRefEmbauche: ElementRef;
 
 maskdate: any;


   // breadcrumb items
   formAutorisation!:FormGroup
   ListAutorisation: any[] = [];
   file!: File ; // Variable to store file
   listTypeAutorisation: any[] = [];
 
   constructor(private demandeService:DemandeService,private formBuilder : FormBuilder
     ,private tokenService:TokenStorage,private websocketService: WebsocketService,private persServ: AjoutPersService, private modalService: NgbModal,
     private translatee:TranslateService ,private serv: PersonnelService) { }
   ngOnInit(): void {
     this.formAutorisation = this.formBuilder.group({
       
       
 
       dateDemande : [(new Date()).toLocaleDateString().substring(0,10),Validators.required],
       heurS : ['',Validators.required],
       heurR:['',Validators.required],
       typDemande: ['A'],
       minR:['',Validators.required],
       minS:['',Validators.required],
       txtDem:[''],
       codAut:['',Validators.required],
       datDebut:['',Validators.required],
       reponseChef:[''],
       txtChef:[''],
       reponse:[''],
       
 
       matPers:[this.tokenService.getUser().matpers],
       codSoc:[this.tokenService.getUser().cod_soc]
     });
     this.getListAutorisation()
     this.getTypeAutorisation()
     this.getformatDateEmbauche()

     console.log('lang curren ',this.translatee.currentLang)
     this.serv.language$.subscribe((language) => {
      this.translateHeaderNames(language);
    });
    const currentLang = this.translatee.getBrowserLang();
    this.translatee.onLangChange.subscribe(() => {
      this.columnAutorisation = this.columnAutorisation.map((col) => {
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
     this.columnAutorisation = this.columnAutorisation.map((col) => {
       col.headerName = this.translatee.instant(col.headerName, language);
       return col;
     });
   
   }
   columnAutorisation = [
     
     
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
     
     { headerName: "Heure sortie", 
     field: "heurS", 
     editable: true,
     floatingFilter: true,   
        filter:true,
 
   },
   {
     headerName: "Minute sortie",
     field: "minS",
     editable: true,
     floatingFilter: true,
 
     
   },
 
     {
       headerName: "Heure retour",
       field: "heurR",
       editable: true,
       filter:true,
       floatingFilter: true,
 
     },
 
     {
       headerName: "Minute retour",
       field: "minR",
       editable: true,
       floatingFilter: true,
 
       
     },
 
 
     {
       headerName: "Réponse RH",
       field: "reponse",
       editable: true,
       floatingFilter: true,
 
       
     },
     {
       headerName: "Réponse chef",
       field: "reponseChef",
       editable: true,
       floatingFilter: true,
 
       
     },
     {
       headerName: "Fichier",
       field: "fileName",
       cellRenderer: this.createHyperLink.bind(this),
 
       editable: true,
       floatingFilter: true,
 
       
     },
 
   ];
   onChange(event:any) {
     this.file = event.target.files[0];
 }
 
 getEmailChef(){
  this.demandeService.GetAdrChef("10321").subscribe(
    (data:any) =>{
      this.email=data
      
      console.log(this.email.adr_electronique)



    }
  )
 }
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
 getTypeAutorisation() {
   this.demandeService.GetTypeAutorisation().subscribe(
     (data: any[]) => {
       this.listTypeAutorisation = data;
 
       console.log(data);
     },
     (error) => {
       console.log(error);
     }
   );
 }
 DemandeAutorisation() {

  this.demandeService.GetMatchef(this.tokenService.getUser().matpers).subscribe(
    (data: any[]) => {
      this.dataa = data;
      this.matChef=this.dataa.id.mat_pers
      console.log(this.matChef);
      this.Notification.id_reciver=this.matChef

    },
    (error) => {
      console.log(error);
    }
  );
   const formData = new  FormData();
   const article = this.formAutorisation.value;
   formData.append('file',this.file);
   formData.append('demande',JSON.stringify(article));
   this.emailBody.message=this.formAutorisation.get('txtDem').value 
   this.emailBody.subject="Autorisation"
   this.emailBody.to=" mouadhzidi@gmail.com"
 this.Notification.date_notif=new Date().toLocaleDateString().substring(0,10)
 this.Notification.libelle_notif="Demande"
 this.Notification.nom=this.formAutorisation.get('txtDem').value 
 this.Notification.type_notif="Autorisation"
 this.Notification.mat_pers=this.tokenService.getUser().matpers
 this.Notification.id_sender=this.tokenService.getUser().matpers
 this.Notification.etat_notif="N"
 this.Notification.cod_soc=this.tokenService.getUser().cod_soc

   console.log(this.formAutorisation.value)

   if(this.file==null)
   {
    this.demandeService.CreateDemWithoutFile(this.formAutorisation.value).subscribe(
      (event: any) => {
        if (event) {
         Swal.fire({
           position: 'top-end',
           icon: 'success',
           title: 'Votre demande à été bien enregistrer',
           showConfirmButton: false,
           timer: 2000
         });
          this.getListAutorisation()
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
           this.getListAutorisation()
           this.demandeService.sendMail(this.emailBody).subscribe(
            (event: any) => {
             console.log(event)
            }
        );

        this.websocketService.AjouNotif(this.Notification).subscribe(
          (event: any) => {
          }
      );
           
          }}
   );
  }

 }
 getListAutorisation() {
 
 
   this.demandeService.GetChambreByCode(this.tokenService.getUser().cod_soc,this.tokenService.getUser().matpers,"A").subscribe(
     (data: any[]) => {
       this.ListAutorisation = data;
 
       console.log(data);
     },
     (error) => {
       console.log(error);
     }
   );
 }
 getformatDateEmbauche() {
  this.persServ.getMaskDate().subscribe((data) => {
    this.maskdate = data;
    Inputmask("datetime", {
      inputFormat: this.maskdate.val1,
      placeholder: "jj/mm/aaaa",
      alias: "datetime",

      max: "01/01/200",
      clearMaskOnLostFocus: false,
      isComplete: function (buffer, opts) {
        console.log("Data", buffer, opts);
      },
    }).mask(this.myInputElementRefEmbauche.nativeElement);
  });
}


openModal(targetModal) {
  this.modalService.open(targetModal, {
    windowClass: "my-class",
    centered: true,
  });
}
 
 modules: Module[] = [ClientSideRowModelModule];

}
