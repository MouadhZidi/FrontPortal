import { Component, OnInit, ViewChild, TemplateRef } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

import {
  CalendarOptions,
  EventClickArg,
  EventApi,
  startOfDay,
} from "@fullcalendar/angular";

import Swal from "sweetalert2";

import { TokenStorage } from "src/app/core/services/token-storage.service";
import { CalendarCongeService } from "../calendar-conge.service";
import { TranslateService } from "@ngx-translate/core";
import { PersonnelService } from "../../Employe/personnel.service";

@Component({
  selector: "app-calendar-conge",
  templateUrl: "./calendar-conge.component.html",
  styleUrls: ["./calendar-conge.component.scss"],
})
export class CalendarCongeComponent implements OnInit {
  buttonText: any;
  // buttonText: { [key: string]: string } = {
  //    today: 'Aujourd\'hui',
  //         month: 'Mois',
  //         week: 'Semaine',
  //         day: 'Jour',
  //         list: 'Liste'
  // };

  breadCrumbItems: Array<{}>;

  @ViewChild("editmodalShow") editmodalShow: TemplateRef<any>;

  formEditData: FormGroup;
  submitted = false;
  category: any[];
  newEventDate: any;
  editEvent: any;
  calendarEvents: any[];
  currentLang: any;
  lang:any

  formData: FormGroup;
  rowData: any[] = [];
  events: any[] = [];
  eventss: any = [
    {
      title: "lunch",
      start: "2022-10-23",
    },
  ];

  calendarOptions: CalendarOptions = {};
  currentEvents: EventApi[] = [];

  ngOnInit(): void {
  
    console.log("cccccccccccccccccccc"+this.translatee.currentLang)
    this.breadCrumbItems = [
      { label: "Portail ArabSoft" },
      { label: "Calendrier", active: true },
    ];

    this.formData = this.formBuilder.group({
      title: ["", [Validators.required]],
      category: ["", [Validators.required]],
    });

    this.formEditData = this.formBuilder.group({
      editTitle: ["", [Validators.required]],
      editCategory: [],
    });
    this._fetchData();
    this.getListSituation();

    this.servv.language$.subscribe((language) => {
      this.toggleLanguage(language);
    });
    var currentLang = this.translatee.getBrowserLang();
    this.currentLang = currentLang;
    this.translatee.onLangChange.subscribe(() => {


      this.changeLanguage()
     if (this.lang === "fr") {
      this.lang = "en";
         this.calendarOptions.locale='en'
         console.log("translated to en " + currentLang);
        // this.calendarOptions.locale = currentLang;
       } else if (this.lang === "en") {
        this.lang = "fr";
      console.log("translated to en" +this.lang);
       this.calendarOptions.locale = this.lang;
         this.calendarOptions.locale=this.lang

       }

      // this.buttonText.week = this.translatee.instant(this.buttonText.week,currentLang)
      //  this.buttonText.month = this.translatee.instant(this.buttonText.month,currentLang)
      //  this.buttonText.day = this.translatee.instant(this.buttonText.day,currentLang)
      // this.calendarOptions.locale == currentLang
      console.log("llllllangage" + currentLang);
      this.toggleLanguage(this.lang);
      console.log("******** ng on init ********",this.calendarOptions.buttonText);

    });

    // this.translatee.onLangChange.subscribe(() => {
    //   this.columnDefs = this.columnDefs.map((col) => {
    //     col.headerName = this.translatee.instant(col.headerName,currentLang);
    //     return col;
    //   });
    // });


console.log("*************",this.currentLang);


  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }

  constructor(
    public translatee: TranslateService,
    private servv: PersonnelService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private serv: CalendarCongeService,
    private tokenService: TokenStorage  ) {}

  get form() {
    return this.formData.controls;
  }

  /**
   * Delete-confirm
   */
  confirm() {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#34c38f",
      cancelButtonColor: "#f46a6a",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        this.deleteEventData();
        Swal.fire("Deleted!", "Event has been deleted.", "success");
      }
    });
  }

  position() {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Event has been saved",
      showConfirmButton: false,
      timer: 1000,
    });
  }

  editEventSave() {
    const editTitle = this.formEditData.get("editTitle").value;
    const editCategory = this.formEditData.get("editCategory").value;

    const editId = this.calendarEvents.findIndex(
      (x) => x.id + "" === this.editEvent.id + ""
    );

    this.editEvent.setProp("title", editTitle);
    this.editEvent.setProp("classNames", editCategory);

    this.calendarEvents[editId] = {
      ...this.editEvent,
      title: editTitle,
      id: this.editEvent.id,
      classNames: editCategory + " " + "text-white",
    };

    this.position();
    this.formEditData = this.formBuilder.group({
      editTitle: "",
      editCategory: "",
    });
    this.modalService.dismissAll();
  }

  deleteEventData() {
    this.editEvent.remove();
    this.modalService.dismissAll();
  }

  closeEventModal() {
    this.formData = this.formBuilder.group({
      title: "",
      category: "",
    });
    this.modalService.dismissAll();
  }

  getListSituation() {
    this.serv
      .GetChambreByCode(
        this.tokenService.getUser().cod_soc,
        this.tokenService.getUser().matpers
      )
      .subscribe((data: any[]) => {
        if(this.translatee.currentLang==='es'){
          this.lang='fr'
        }
        if(this.translatee.currentLang==='en'){
          this.lang='en'
        }
        this.rowData = data;

        console.log("eee" + this.rowData);
        (this.events = data.map((e: any) => ({
          start: e.dateC,
          color:
            e.lib_mot === "REPOS HEBDOMADAIRE"
              ? "#556ee6"
              : e.lib_mot === "JOUR CHOME PAYE"
              ? "#34c38f"
              : e.lib_mot == "Congé annuel"
              ? "#50a5f1"
              : e.lib_mot === "Congé de maladie ordinaire"
              ? "#f1b44c"
              : e.lib_mot === "Décès d'ascendants et collatéraux direct"
              ? "#f46a6a"
              : "#343a40",
        }))),
          (this.calendarOptions = {
            locale:this.lang,

            headerToolbar: {
              left: "dayGridMonth,dayGridWeek,dayGridDay",
              center: "title",
              right: "prevYear,prev,next,nextYear",

              // <==== HERE =====
            },
            buttonText: {
              day: this.translatee.instant(
                "day",
                this.currentLang
              ),
              month: this.translatee.instant(
                "month",
                this.currentLang
              ),
              week: this.translatee.instant(
                "week",
                this.currentLang
              ),
            },
            initialView: "dayGridMonth",
            themeSystem: "bootstrap",
            eventSources: this.events,
            events: this.events,
            weekends: true,
            editable: true,
            selectable: true,
            selectMirror: true,
            firstDay: 1,
            dayMaxEvents: true,

            //   eventClick: this.handleEventClick.bind(this),
            eventsSet: this.handleEvents.bind(this),
            eventTimeFormat: {
              // like '14:30:00'
              hour: "2-digit",
              minute: "2-digit",
              meridiem: false,
              hour12: true,
            },
          });
      });
  }

  //  this.toggleLanguage()

  private _fetchData() {
    this.submitted = false;
  }
  toggleLanguage(lan?: string) {
    if (this.calendarOptions.locale === "en") {
      this.calendarOptions.locale = "en";
      this.buttonText = {
       
        month: "month",
        week: "week",
        day: "day",
       
      };
    } else {
      this.calendarOptions.locale = "fr";
      this.buttonText = {
        month: "mois",
        week: "semaine",
        day: "jour",
      };
    }
    this.calendarOptions.buttonText = this.buttonText;
  }

  changeLanguage() {
    const currentLanguage = this.servv.languageSubject.value;
    this.servv.setLanguage(currentLanguage === "en" ? "fr" : "en");
  }
}
