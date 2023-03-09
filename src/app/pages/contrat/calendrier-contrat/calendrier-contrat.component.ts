import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CalendarOptions, EventApi, EventClickArg } from "@fullcalendar/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { TranslateService } from "@ngx-translate/core";
import { TokenStorage } from "src/app/core/services/token-storage.service";
import { CalendarCongeService } from "../../calendarConge/calendar-conge.service";
import { EcheanceContratService } from "../echeance-contrat.service";

@Component({
  selector: "app-calendrier-contrat",
  templateUrl: "./calendrier-contrat.component.html",
  styleUrls: ["./calendrier-contrat.component.scss"],
})
export class CalendrierContratComponent implements OnInit {
  buttonText: any;
  // buttonText: { [key: string]: string } = {
  //    today: 'Aujourd\'hui',
  //         month: 'Mois',
  //         week: 'Semaine',
  //         day: 'Jour',
  //         list: 'Liste'
  // };

  breadCrumbItems: Array<{}>;
  @ViewChild("modalShow") modalShow: TemplateRef<any>;

  @ViewChild("editmodalShow") editmodalShow: TemplateRef<any>;

  formEditData: FormGroup;
  submitted = false;
  category: any[];
  newEventDate: any;
  editEvent: any;
  calendarEvents: any[];
  currentLang: any;
  lang: any;
  cng: any;

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
    console.log("cccccccccccccccccccc" + this.translatee.currentLang);
    this.breadCrumbItems = [
      { label: "Espace contrat" },
      { label: "Calendrier des contrats", active: true },
    ];

    this.formData = this.formBuilder.group({
      title: ["", [Validators.required]],
      category: ["", [Validators.required]],
    });

    this.formEditData = this.formBuilder.group({
      mat_pers: "",
      num_contrat: "",
      etat: "",
      dat_contrat: "",
      dat_ech: "",
      nom_pren: "",
      lib_contrat: "",
    });
    this._fetchData();
    this.getListSituation();

    this.servv.language$.subscribe((language) => {
      this.toggleLanguage(language);
    });
    var currentLang = this.translatee.getBrowserLang();
    this.currentLang = currentLang;
    this.translatee.onLangChange.subscribe(() => {
      this.changeLanguage();
      if (this.lang === "fr") {
        this.lang = "en";
        this.calendarOptions.locale = "en";
        console.log("translated to en " + currentLang);
        // this.calendarOptions.locale = currentLang;
      } else if (this.lang === "en") {
        this.lang = "fr";
        console.log("translated to en" + this.lang);
        this.calendarOptions.locale = this.lang;
        this.calendarOptions.locale = this.lang;
      }

      // this.buttonText.week = this.translatee.instant(this.buttonText.week,currentLang)
      //  this.buttonText.month = this.translatee.instant(this.buttonText.month,currentLang)
      //  this.buttonText.day = this.translatee.instant(this.buttonText.day,currentLang)
      // this.calendarOptions.locale == currentLang
      console.log("llllllangage" + currentLang);
      this.toggleLanguage(this.lang);
      console.log(
        "******** ng on init ********",
        this.calendarOptions.buttonText
      );
    });

    // this.translatee.onLangChange.subscribe(() => {
    //   this.columnDefs = this.columnDefs.map((col) => {
    //     col.headerName = this.translatee.instant(col.headerName,currentLang);
    //     return col;
    //   });
    // });

    console.log("*************", this.currentLang);
  }

  handleEventClick(clickInfo: EventClickArg) {
    this.formEditData.reset();

    this.editEvent = clickInfo.event;
    console.log("edit event */*/---", this.editEvent);

    var splittedString = this.editEvent.id.split("+");
    console.log("splitted strignb cod sioc ", splittedString[0]);

    var Idobject: any = {
      cod_soc: splittedString[0],
      mat_pers: splittedString[1],
      num_contrat: splittedString[2],
    };
    console.log("*//*/*/*/* idididid", Idobject);

    this.servv.getContratById(Idobject).subscribe((data) => {
      console.log("***datas***", data);

      this.cng = data;
      console.log("eeeeee", this.cng);
      console.log("att", this.cng[0].mat_pers);

      this.formEditData.patchValue({
        mat_pers: this.cng[0].mat_pers,
        num_contrat: this.cng[0].num_contrat,
        etat: this.cng[0].etat,
        dat_contrat: this.cng[0].dat_contrat,
        dat_ech: this.cng[0].dat_ech,
        nom_pren: this.cng[0].nom_pren,
        lib_contrat: this.cng[0].lib_contrat,
      });
    });

    this.modalService.open(this.editmodalShow);

    this.cng = null;
    //  this.openModelWithData(this.events[this.editEvent])
  }
  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }
  constructor(
    public translatee: TranslateService,
    private servv: EcheanceContratService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private serv: CalendarCongeService,
    private tokenService: TokenStorage
  ) {}

  get form() {
    return this.formData.controls;
  }
  openModal(event?: any) {
    this.newEventDate = event;
    this.modalService.open(this.modalShow);
  }
  openModelWithData(id: any) {
    this.modalService.open(this.editmodalShow);
  }

  /**
   * Delete-confirm
   */
  // confirm() {
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "You won't be able to revert this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#34c38f",
  //     cancelButtonColor: "#f46a6a",
  //     confirmButtonText: "Yes, delete it!",
  //   }).then((result) => {
  //     if (result.value) {
  //       this.deleteEventData();
  //       Swal.fire("Deleted!", "Event has been deleted.", "success");
  //     }
  //   });
  // }

  // position() {
  //   Swal.fire({
  //     position: "center",
  //     icon: "success",
  //     title: "Event has been saved",
  //     showConfirmButton: false,
  //     timer: 1000,
  //   });
  // }

  deleteEventData() {
    this.editEvent.remove();
    this.modalService.dismissAll();
  }

  closeEventModal() {
    this.formData = this.formBuilder.group({
      title: "",
      category: "",
    });

    console.log(this.formEditData.value);
    this.formEditData.reset();
    this.modalService.dismissAll();
  }

  getListSituation() {
    this.servv.getContrat().subscribe((data: any[]) => {
      if (this.translatee.currentLang === "es") {
        this.lang = "fr";
      }
      if (this.translatee.currentLang === "en") {
        this.lang = "en";
      }
      this.rowData = data;

      console.log("eeessss" + this.rowData);
      (this.events = data.map((e: any) => ({
        id: `${e.cod_soc}+${e.mat_pers}+${e.num_contrat}`,
        title: e.nom_pren,
        start: e.dat_ech,

        color: "orange",
      }))),
        (this.calendarOptions = {
          locale: this.lang,

          headerToolbar: {
            left: "dayGridMonth,dayGridWeek,dayGridDay",
            center: "title",
            right: "prevYear,prev,next,nextYear",

            // <==== HERE =====
          },
          buttonText: {
            day: this.translatee.instant("day", this.currentLang),
            month: this.translatee.instant("month", this.currentLang),
            week: this.translatee.instant("week", this.currentLang),
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

          dateClick: this.openModal.bind(this),
          eventClick: this.handleEventClick.bind(this),
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
