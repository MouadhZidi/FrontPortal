import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { saveAs } from "file-saver";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { Module } from "@ag-grid-community/core";

import { DemandeService } from "../demande.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TokenStorage } from "src/app/core/services/token-storage.service";
import Swal from "sweetalert2";
import { Email } from "../elail.model";
import { WebsocketService } from "src/app/layouts/topbar/shared/services/websocket.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Width } from "ngx-owl-carousel-o/lib/services/carousel.service";
import { AjoutPersService } from "../../FicheSignalitique/ajout-pers.service";
import Inputmask from "inputmask";
import { TranslateService } from "@ngx-translate/core";
import { PersonnelService } from "../../Employe/personnel.service";
@Component({
  selector: "app-demande-formation",
  templateUrl: "./demande-formation.component.html",
  styleUrls: ["./demande-formation.component.scss"],
})
export class DemandeFormationComponent implements OnInit {
  // breadcrumb items

  maskdate: any;
  @ViewChild("myInputDateDebut") myInputElementDebut: ElementRef;
  @ViewChild("myInputDateFin") myInputElementFin: ElementRef;

  formFormation!: FormGroup;
  file!: File;
  listFormation: any[] = [];
  titreFormation: any[] = [];
  typeFormation: any[] = [];
  themeFormations: any[] = [];
  email: any;
  value: any;
  emailBody: Email = {
    from: "",
    to: "",
    to_cc: "",
    to_bcc: "",
    subject: "",
    message: "",
    path_report: "",
  };

  Notification: any = {
    date_notif: "",
    libelle_notif: "",
    nom: "",
    type_notif: "",
    cod_soc: "",
    mat_pers: "",
    id_sender: "",
    id_reciver: "",
    etat_notif: "",
  };
  dataa: any;
  matChef: any;
  constructor(
    private translatee:TranslateService ,private serv: PersonnelService,
    private demandeService: DemandeService,
    private formBuilder: FormBuilder,
    private tokenService: TokenStorage,
    private websocketService: WebsocketService,
    private modalService: NgbModal,
    private persServ: AjoutPersService
  ) {}
  ngOnInit(): void {
    this.formFormation = this.formBuilder.group({
      dateDemande: [
        new Date().toLocaleDateString().substring(0, 10),
        Validators.required,
      ],
      annee: ["", Validators.required],
      codTheme: ["", Validators.required],
      typDemande: ["F"],
      codTit: ["", Validators.required],

      codTyp: ["", Validators.required],
      datDebut: ["", Validators.required],
      datFin: ["", Validators.required],
      reponseChef: [""],
      txtDem: [""],

      txtChef: [""],
      reponse: [""],

      matPers: [this.tokenService.getUser().matpers],
      codSoc: [this.tokenService.getUser().cod_soc],
    });
    this.getTitreFormation();
    this.getListFormation();
    this.getEmailChef();
    this.getformatDateDebut();
    this.getformatDateFin();
  
    console.log('lang curren ',this.translatee.currentLang)
    this.serv.language$.subscribe((language) => {
     this.translateHeaderNames(language);
   });
   const currentLang = this.translatee.getBrowserLang();
   this.translatee.onLangChange.subscribe(() => {
     this.columnFormaton = this.columnFormaton.map((col) => {
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
    this.columnFormaton = this.columnFormaton.map((col) => {
      col.headerName = this.translatee.instant(col.headerName, language);
      return col;
    });
  }
  getEmailChef() {
    this.demandeService.GetAdrChef("10321").subscribe((data: any) => {
      this.email = data;
    });
  }
  columnFormaton = [
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
      headerName: "Code titre",
      field: "titre",
      editable: true,
      width: 250,
      floatingFilter: true,
      filter: true,
    },

    {
      headerName: "Type formation",
      field: "type_formation",
      editable: true,
      filter: true,
      width: 250,
      floatingFilter: true,
    },
    {
      headerName: "Code théme",
      field: "theme",
      editable: true,
      filter: true,
      width: 320,
      floatingFilter: true,
    },
    {
      headerName: "Date début",
      field: "datDebut",
      editable: true,
      filter: true,
      floatingFilter: true,
    },
    {
      headerName: "Date fin",
      field: "datFin",
      editable: true,
      filter: true,
      floatingFilter: true,
    },
    {
      headerName: "Reponse chef",
      field: "reponseChef",
      editable: true,
      filter: true,
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

  openModal(targetModal) {
    this.modalService.open(targetModal, {
      windowClass: "my-class",
      centered: true,
    });
  }
  onSelect(event: any) {
    this.value = event.target.value;
    this.demandeService.GetTypeFormation(event.target.value).subscribe(
      (data: any[]) => {
        this.typeFormation = data;

        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  onSelect2(event: any) {
    this.demandeService
      .GetThemeFormation(this.value, event.target.value)
      .subscribe(
        (data: any[]) => {
          console.log(event.target.value);

          this.themeFormations = data;

          console.log(data);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  defaultColDef = {
    sortable: true,
    filter: true,
  };
  onChange(event: any) {
    this.file = event.target.files[0];
  }
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
  DemandeFormation() {
    this.demandeService.GetMatchef(this.tokenService.getUser().matpers).subscribe(
      (data: any[]) => {
        this.dataa = data;
        this.matChef=this.dataa.id.mat_pers
        console.log(this.matChef);
      },
      (error) => {
        console.log(error);
      }
    );
     const formData = new  FormData();
     const article = this.formFormation.value;
     console.log("elyes : "+this.file)
     formData.append('file',this.file);
     formData.append('demande',JSON.stringify(article));
      
     this.emailBody.message=this.formFormation.get('txtDem').value 
     this.emailBody.subject="Autorisation"
     this.emailBody.to=this.email.adr_electronique
     this.Notification.date_notif=this.formFormation.get('dateDemande').value 
     this.Notification.libelle_notif="Demande"
     this.Notification.nom=this.formFormation.get('txtDem').value 
     this.Notification.type_notif="Formation"
     this.Notification.mat_pers=this.tokenService.getUser().matpers
     this.Notification.id_sender=this.tokenService.getUser().matpers
     this.Notification.id_reciver=this.matChef
     this.Notification.etat_notif="N"
    
     this.Notification.cod_soc=this.tokenService.getUser().cod_soc
   
     console.log(this.file);
     if(this.file==null)
     {
      this.demandeService.CreateDemWithoutFile(this.formFormation.value).subscribe(
        (event: any) => {
          if (event) {
           Swal.fire({
             position: 'top-end',
             icon: 'success',
             title: 'Votre demande à été bien enregistrer',
             showConfirmButton: false,
             timer: 2000
           });
            this.getListFormation()
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
             this.getListFormation()
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
  getTitreFormation() {
    this.demandeService.GetTitreFormation().subscribe(
      (data: any[]) => {
        this.titreFormation = data;

        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getListFormation() {
    this.demandeService
      .GetChambreByCode(
        this.tokenService.getUser().cod_soc,
        this.tokenService.getUser().matpers,
        "F"
      )
      .subscribe(
        (data: any[]) => {
          this.listFormation = data;

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
