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
  selector: 'app-demande-conge',
  templateUrl: './demande-conge.component.html',
  styleUrls: ['./demande-conge.component.scss']
})
export class DemandeCongeComponent implements OnInit {
  email:any
  maskdate: any;
  @ViewChild("myInputDateDebut") myInputElementDebut: ElementRef;
  @ViewChild("myInputDateFin") myInputElementFin: ElementRef;

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
  ListConge:any[]=[]
  file!:File
  formConge:FormGroup
  listMotifCng:any[]=[]
  // breadcrumb items
  breadCrumbItems: Array<{}>;
  constructor(
    private translatee:TranslateService ,private serv: PersonnelService,
    private demandeService:DemandeService,private formBuilder : FormBuilder
    ,private tokenService:TokenStorage,
    private modalService: NgbModal,
    private websocketService: WebsocketService,private persServ: AjoutPersService) { }
  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Espace demande' }, { label: 'Demande congé', active: true }];

    this.formConge = this.formBuilder.group({

      dateDemande : [(new Date()).toLocaleDateString().substring(0,10),Validators.required],
      datDebut:['',Validators.required],
      datFin:['',Validators.required],
      typDemande: ['C'],
      cngTemps:['',Validators.required],
      cngTempsDebut:['',Validators.required],
      cngTempsFin:['',Validators.required],
      codM:['',Validators.required],
      reponseChef:[''],
      txtChef:[''],
      reponse:[''],
      txtDem:[''],

      matPers:[this.tokenService.getUser().matpers],
      codSoc:[this.tokenService.getUser().cod_soc]
    });
    this.getListConge()
    this.getMotifCng()
    this.getEmailChef()
    this.getformatDateDebut()
    this.getformatDateFin()
    console.log('lang curren ',this.translatee.currentLang)
    this.serv.language$.subscribe((language) => {
     this.translateHeaderNames(language);
   });
   const currentLang = this.translatee.getBrowserLang();
   this.translatee.onLangChange.subscribe(() => {
     this.columnConge = this.columnConge.map((col) => {
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
    this.columnConge = this.columnConge.map((col) => {
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
  columnConge= [
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
    { 
      headerName: "Date début",
      field: "datDebut",
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
  { 
    headerName: "Date fin",
    field: "datFin",
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
    {
      headerName: "Motif",
      field: "motif",
      editable: true,
      filter:true,
      floatingFilter: true,

    },

   


    {
      headerName: "Réponse RH",
      field: "reponse",
      editable: true,
      floatingFilter: true,

      
    },
    {
      headerName: "Réponse Chef",
      field: "reponseChef",
      editable: true,
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
  onChange(event:any) {
    this.file = event.target.files[0];
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
openModal(targetModal) {
  this.modalService.open(targetModal, {
    windowClass: "my-class",
    centered: true,
  });
}
DemandeConge() {
  this.demandeService.GetMatchef(this.tokenService.getUser().matpers).subscribe(
    (data: any[]) => {
      this.dataa = data;
      this.matChef=this.dataa.id.mat_pers
      this.Notification.id_reciver=this.matChef
    },
    (error) => {
      console.log(error);
    }
  );
  const formData = new  FormData();
  const article = this.formConge.value;
  console.log("elyes : "+this.file)
  formData.append('file',this.file);
  formData.append('demande',JSON.stringify(article));
  this.emailBody.message=this.formConge.get('txtDem').value 
  this.emailBody.subject="Conge"
  this.emailBody.to=this.email.adr_electronique
  this.Notification.date_notif=new Date().toLocaleDateString().substring(0,10)
  this.Notification.libelle_notif="Demande"
  this.Notification.nom=this.formConge.get('txtDem').value 
  this.Notification.type_notif="Congés"
  this.Notification.mat_pers=this.tokenService.getUser().matpers
  this.Notification.id_sender=this.tokenService.getUser().matpers
  this.Notification.etat_notif="N"
 
  this.Notification.cod_soc=this.tokenService.getUser().cod_soc
  console.log(this.Notification);
  if(this.file==null)
  {
   this.demandeService.CreateDemWithoutFile(this.formConge.value).subscribe(
     (event: any) => {
       if (event) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Votre demande à été bien enregistrer',
          showConfirmButton: false,
          timer: 2000
        });
         this.getListConge()
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
          this.getListConge()
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
 }
}
getListConge() {


  this.demandeService.GetChambreByCode(this.tokenService.getUser().cod_soc,this.tokenService.getUser().matpers,"C").subscribe(
    (data: any[]) => {
      this.ListConge = data;

      console.log(data);
    },
    (error) => {
      console.log(error);
    }
  );
}
getMotifCng() {
  this.demandeService.GetMotifCng().subscribe(
    (data: any[]) => {
      this.listMotifCng = data;

      console.log(data);
    },
    (error) => {
      console.log(error);
    }
  );
}


getformatDateDebut() {
  this.persServ.getMaskDate().subscribe((data) => {
    this.maskdate = data;
    Inputmask("datetime", {
      inputFormat: this.maskdate.val1,
      placeholder: "jj/mm/aaaa",
      alias: "datetime",

      max: "01/01/2030",
      clearMaskOnLostFocus: false,
      isComplete: function (buffer, opts) {
        console.log("Data", buffer, opts);
      },
    }).mask(this.myInputElementDebut.nativeElement);
  });
}

getformatDateFin() {
  this.persServ.getMaskDate().subscribe((data) => {
    this.maskdate = data;
    Inputmask("datetime", {
      inputFormat: this.maskdate.val1,
      placeholder: "jj/mm/aaaa",
      alias: "datetime",

      max: "01/01/2030",
      clearMaskOnLostFocus: false,
      isComplete: function (buffer, opts) {
        console.log("Data", buffer, opts);
      },
    }).mask(this.myInputElementFin.nativeElement);
  });
}
modules: Module[] = [ClientSideRowModelModule];


}
