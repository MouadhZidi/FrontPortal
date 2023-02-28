import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { TokenStorage } from "src/app/core/services/token-storage.service";
import { DemandeService } from "../demande.service";
import { saveAs } from "file-saver";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { Module } from "@ag-grid-community/core";
import Swal from "sweetalert2";
import { Email } from "../elail.model";
import { WebsocketService } from "src/app/layouts/topbar/shared/services/websocket.service";
import { TranslateService } from "@ngx-translate/core";
import { PersonnelService } from "../../Employe/personnel.service";
@Component({
  selector: "app-demande-document",
  templateUrl: "./demande-document.component.html",
  styleUrls: ["./demande-document.component.scss"],
})
export class DemandeDocumentComponent implements OnInit {
  formDocument: FormGroup;
  file!: File;
  email:any
  matRh:any
  ListDocument: any[] = [];
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
  dec:any[]
  dataa:any
  matChef:any
  constructor(
    private translatee:TranslateService ,private serv: PersonnelService,
    private demandeService: DemandeService,
    private formBuilder: FormBuilder,
    private tokenService: TokenStorage,private websocketService: WebsocketService
  ) {}
  ngOnInit(): void {
    this.formDocument = this.formBuilder.group({
      dateDemande: [
        new Date().toLocaleDateString().substring(0, 10),
        Validators.required,
      ],
      typDemande: ["D"],
      numAttest: ["", Validators.required],
      txtChef: [""],
      reponse: [""],
      txtDem:[''],

      matPers: [this.tokenService.getUser().matpers],
      codSoc: [this.tokenService.getUser().cod_soc],
    });
    this.getListDocument();
    this.getDecision()
    this.getEmailChef()
    
 
    console.log('lang curren ',this.translatee.currentLang)
    this.serv.language$.subscribe((language) => {
     this.translateHeaderNames(language);
   });
   const currentLang = this.translatee.getBrowserLang();
   this.translatee.onLangChange.subscribe(() => {
     this.columnDocument = this.columnDocument.map((col) => {
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
    this.columnDocument = this.columnDocument.map((col) => {
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

   DemandeDocument() {
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
    const article = this.formDocument.value;
    console.log("elyes : " + this.file);
    formData.append("file", this.file);
    formData.append("demande", JSON.stringify(article));
    this.emailBody.message=this.formDocument.get('txtDem').value 
    this.emailBody.subject="Document"
    this.emailBody.to=this.email.adr_electronique

    this.Notification.date_notif=new Date().toLocaleDateString().substring(0,10)
    this.Notification.libelle_notif="Demande"
    this.Notification.nom=this.formDocument.get('txtDem').value 
    this.Notification.type_notif="Document"
    this.Notification.mat_pers=this.tokenService.getUser().matpers
    this.Notification.id_sender=this.tokenService.getUser().matpers
    this.Notification.etat_notif="N"
   
    this.Notification.cod_soc=this.tokenService.getUser().cod_soc

    console.log(this.Notification)

    if(this.file==null)
    {
     this.demandeService.CreateDemWithoutFile(this.formDocument.value).subscribe(
       (event: any) => {
         if (event) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Votre demande à été bien enregistrer',
            showConfirmButton: false,
            timer: 2000
          });
           this.getListDocument()
           this.demandeService.sendMail(this.emailBody).subscribe(
            (event: any) => {
             console.log(event)
            }
        );
        this.websocketService.AjouNotif(this.Notification).subscribe(
          (event: any) => {
            console.log(this.Notification)
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
            this.getListDocument()
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
  getListDocument() {
    console.log();
    this.demandeService
      .GetChambreByCode(
        this.tokenService.getUser().cod_soc,
        this.tokenService.getUser().matpers,
        "D"
      )
      .subscribe(
        (data: any[]) => {
          this.ListDocument = data;

          console.log(data);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  getDecision() {
    this.demandeService
      .GetDecision()
      .subscribe(
        (data: any[]) => {
          this.dec = data;

        },
        (error) => {
          console.log(error);
        }
      );
  }
  onChange(event: any) {
    this.file = event.target.files[0];
  }
  defaultColDef = {
    sortable: true,
    filter: true,
  };
  createHyperLink(params: any): any {
 

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
  columnDocument = [
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
      headerName: "Numéro attestation",
      field: "numAttest",
      editable: true,
      oatingFilter: true,
      filter: true,
    },

    {
      headerName: "Réponse RH",
      field: "reponse",
      editable: true,
      filter: true,
      floatingFilter: true,
    },

    {
      headerName: "Fichier",
      field: "fileName",
      cellRenderer: this.createHyperLink.bind(this),
width:1000,
      editable: true,
      floatingFilter: true,
    },
  ];

  modules: Module[] = [ClientSideRowModelModule];
}
