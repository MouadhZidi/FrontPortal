import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { saveAs } from "file-saver";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { Module } from "@ag-grid-community/core";
import Inputmask from 'inputmask';

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TokenStorage } from "src/app/core/services/token-storage.service";
import { DemandeService } from "../demande.service";
import { DropzoneConfigInterface } from "ngx-dropzone-wrapper";
import Swal from "sweetalert2";
import { Email } from "../elail.model";
import { WebsocketService } from "src/app/layouts/topbar/shared/services/websocket.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { TranslateService } from "@ngx-translate/core";
import { PersonnelService } from "../../Employe/personnel.service";
@Component({
  selector: "app-demande-pret-avance",
  templateUrl: "./demande-pret-avance.component.html",
  styleUrls: ["./demande-pret-avance.component.scss"],
})
export class DemandePretAvanceComponent implements OnInit {
  formPretAvance!: FormGroup;
  Listavance: any[] = [];
  listGroupe: any[] = [];
  listTypePret: any[] = [];
  maskDigit:any
  @ViewChild('myInput') myInputElementRef: ElementRef;

  matRh:any
  // breadcrumb items
  email:any
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
  breadCrumbItems: Array<{}>;

  image = "";
  file!: File;
  config: DropzoneConfigInterface = {
    // Change this to your upload POST address:
    maxFilesize: 50,
    acceptedFiles: "file/*",
    method: "POST",
    uploadMultiple: false,

    accept: (file) => {
      this.onChange(file);
    },
  };
  constructor(
    private translatee:TranslateService ,private serv: PersonnelService,
    public service: DemandeService,
    private formBuilder: FormBuilder,
    private tokenService: TokenStorage,
    private websocketService: WebsocketService,
    private modalService: NgbModal,
    private demandeService: DemandeService
  ) {}

  ngOnInit(): void {
    
    this.formPretAvance = this.formBuilder.group({
      dateDemande: [
        new Date().toLocaleDateString().substring(0, 10),
        Validators.required,
      ],
      codGrpPret: ["", Validators.required],
      typPret: ["", Validators.required],
      mntDem: ["", Validators.required],
      reponse: [""],
      typDemande: ["P"],
      txtDem:[''],

      matPers: [this.tokenService.getUser().matpers],
      codSoc: [this.tokenService.getUser().cod_soc],
    });
    this.getGroupePret();
    this.getListAvance();
    this.getEmailChef()
    console.log('lang curren ',this.translatee.currentLang)
    this.serv.language$.subscribe((language) => {
     this.translateHeaderNames(language);
   });
   const currentLang = this.translatee.getBrowserLang();
   this.translatee.onLangChange.subscribe(() => {
     this.columnAvance = this.columnAvance.map((col) => {
       col.headerName = this.translatee.instant(col.headerName,currentLang);
       return col;
     });
   });


   this.breadCrumbItems = [{ label: 'Espace demande' }, { label: 'Demande prêt et avance', active: true }];




  }

  
  changeLanguage() {
    const currentLanguage = this.serv.languageSubject.value;
    this.serv.setLanguage(currentLanguage === 'en' ? 'fr' : 'en');
  }

  translateHeaderNames(language: string) {
    this.columnAvance = this.columnAvance.map((col) => {
      col.headerName = this.translatee.instant(col.headerName, language);
      return col;
    });
  }
  getEmailChef(){
    this.service.GetAdrChef("10321").subscribe(
      (data:any) =>{
        this.email=data

      }
    )
   }
  onChange(event: any) {
    this.file = event.target.files[0];
  }
  /**
   * Sort table data
   *
   */
  defaultColDef = {
    sortable: true,
    filter: true,
  };
  DemandePretAvance() {
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
    const formData = new FormData();
    const article = this.formPretAvance.value;
    console.log("elyes : " + this.file);
    formData.append("file", this.file);
    formData.append("demande", JSON.stringify(article));
   
    this.emailBody.message=this.formPretAvance.get('txtDem').value 
    this.emailBody.subject="Pret & Avance"
    this.emailBody.to=/*this.email.adr_electronique*/ "mouadhzidi@gmail.com"
    this.Notification.date_notif=this.formPretAvance.get('dateDemande').value 
    this.Notification.libelle_notif="Demande"
    this.Notification.nom=this.formPretAvance.get('txtDem').value 
    this.Notification.type_notif="PretAvance"
    this.Notification.mat_pers=this.tokenService.getUser().matpers
    this.Notification.id_sender=this.tokenService.getUser().matpers
   
    this.Notification.etat_notif="N"
   
    this.Notification.cod_soc=this.tokenService.getUser().cod_soc
if(this.file==null)
    {
     this.service.CreateDemWithoutFile(this.formPretAvance.value).subscribe(
       (event: any) => {
         if (event) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Votre demande à été bien enregistrer',
            showConfirmButton: false,
            timer: 2000
          });
           this.getListAvance()
           this.service.sendMail(this.emailBody).subscribe(
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
    }else{ this.service.upload(formData).subscribe(
        (event: any) => {
          if (event) {
           Swal.fire({
             position: 'top-end',
             icon: 'success',
             title: 'Votre demande à été bien enregistrer',
             showConfirmButton: false,
             timer: 2000
           });
            this.getListAvance()
            this.service.sendMail(this.emailBody).subscribe(
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
  onSelect1(event1: any) {
    this.service.GetTypePret(event1.target.value).subscribe(
      (data: any[]) => {
        this.listTypePret = data;

        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getGroupePret() {
    this.service.GetTitreGroupePret().subscribe(
      (data: any[]) => {
        this.listGroupe = data;

        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getListAvance() {
    this.service
      .GetChambreByCode(
        this.tokenService.getUser().cod_soc,
        this.tokenService.getUser().matpers,
        "P"
      )
      .subscribe(
        (data: any[]) => {
          this.Listavance = data;

        },
        (error) => {
          console.log(error);
        }
      );
  }
  columnAvance = [
    {
      headerName: "Date demande",
      field: "dateDemande",
      filter: "agDateColumnFilter",
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
      headerName: "Code groupe prêt",
      field: "group_pret",
      editable: true,
      floatingFilter: true,
      filter: true,
    },

    {
      headerName: "Type prêt",
      field: "lib_pret",
      editable: true,
      filter: true,
      floatingFilter: true,
    },

    {
      headerName: "Montant demandé",
      field: "mntDem",
      
      editable: true,
     
      type: 'rightAligned',
      floatingFilter: true,
    },

    {
      headerName: "Réponse",
      field: "reponse",
      editable: true,
      floatingFilter: true,
    },
    {
      headerName: "Réponse chef",
      field: "reponse",
      editable: true,
      floatingFilter: true,
    },
    {
      headerName: "Fichier",
      field: "fileName",
      cellRenderer: this.createHyperLink.bind(this),
      width: 400,
      editable: true,
      floatingFilter: true,
    },
  ];
  createHyperLink(params: any): any {
    console.log(params.data.id_libre_demande);

    if (!params.data) {
      return;
    }
    const spanElement = document.createElement("span");
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
    return "home";
  }
  getformatMontant() {
    this.service.getMaskMontant().subscribe((data) => {
      this.maskDigit = data;
      Inputmask('numeric', {
    digits: 2,
    digitsOptional: true,
    alias:'numeric',
    max:9999.99,
        
        isComplete: function(buffer, opts) {
          console.log('Data', buffer, opts);
        }
      }).mask(this.myInputElementRef.nativeElement);
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
