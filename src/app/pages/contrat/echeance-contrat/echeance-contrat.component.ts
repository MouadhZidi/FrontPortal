import { DatePipe, formatDate } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CalendarOptions, EventApi, EventClickArg } from '@fullcalendar/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { TokenStorage } from 'src/app/core/services/token-storage.service';
import Swal from 'sweetalert2';
import { EcheanceContratService } from '../echeance-contrat.service';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { Module } from '@ag-grid-community/core';
import * as jspdf from "jspdf";
import "jspdf-autotable";
import { PersonnelService } from '../../Employe/personnel.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-echeance-contrat',
  templateUrl: './echeance-contrat.component.html',
  styleUrls: ['./echeance-contrat.component.scss']
})
export class EcheanceContratComponent implements OnInit {


 


  date1:any;
  date2:any;


  onGetValue() {
  
 
    this.serv.getListContrat(this.date1,this.date2).subscribe(
      data => {
        this.list=data

  
  
      })
  
  
  }
  // bread crumb items
  breadCrumbItems: Array<{}>;

  @ViewChild('modalShow') modalShow: TemplateRef<any>;
  @ViewChild('editmodalShow') editmodalShow: TemplateRef<any>;
  row: any = [];

  public columns = ["Prenom", "Matricule", "Date contrat", "Date fin contrat","Num contrat","Type contrat"];

  formEditData: FormGroup;
  submitted = false;
  category: any[];
  newEventDate: any;
  editEvent: any;
  calendarEvents: any[];
  // event form
  formData: FormGroup;
  rowData:any[]=[]
  events:any[]=[]
  eventss:any=[{
    title:"lunch",start:"2022-10-22"
  }]
  list:any;

  calendarOptions: CalendarOptions = {
   
  };
  currentEvents: EventApi[] = [];

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Portail ArabSoft' }, { label: 'Calendar', active: true }];

    this.formData = this.formBuilder.group({
      title: ['', [Validators.required]],
      category: ['', [Validators.required]],
    });

    this.formEditData = this.formBuilder.group({
      editTitle: ['', [Validators.required]],
      editCategory: [],
    });
    this._fetchData();
    this.getListSituation()
    const currentLang = this.translatee.getBrowserLang();
    this.translatee.onLangChange.subscribe(() => {
      this.columnContrat = this.columnContrat.map((col) => {
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
    this.columnContrat = this.columnContrat.map((col) => {
      col.headerName = this.translatee.instant(col.headerName, language);
      return col;
    });
  }

  /**
   * Event click modal show
   */
  handleEventClick(clickInfo: EventClickArg) {
    this.editEvent = clickInfo.event;
    this.formEditData = this.formBuilder.group({
      editTitle: clickInfo.event.title,
      editCategory: clickInfo.event.classNames[0],
    });
    this.modalService.open(this.editmodalShow);
  }

  /**
   * Events bind in calander
   * @param events events
   */
  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private serv :EcheanceContratService,
    private tokenService:TokenStorage,
    private datePipe: DatePipe,
    private ser: PersonnelService,
    public translatee: TranslateService,

    @Inject(LOCALE_ID) private locale: string
  ) {

  }
  yourForm: any = {
    date: this.datePipe.transform(new Date(), "dd/MM/yyyy")
  }

  
  get form() {
    return this.formData.controls;
  }

  /**
   * Delete-confirm
   */
  confirm() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.value) {
        this.deleteEventData();
        Swal.fire('Deleted!', 'Event has been deleted.', 'success');
      }
    });
  }

  position() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Event has been saved',
      showConfirmButton: false,
      timer: 1000,
    });
  }

  /**
   * Event add modal
   */
  openModal(event?: any) {
    this.newEventDate = event;
    this.modalService.open(this.modalShow);
  }

  /**
   * save edit event data
   */
  editEventSave() {
    const editTitle = this.formEditData.get('editTitle').value;
    const editCategory = this.formEditData.get('editCategory').value;
    
    const editId = this.calendarEvents.findIndex(
      (x) => x.id + '' === this.editEvent.id + ''
    );

    this.editEvent.setProp('title', editTitle);
    this.editEvent.setProp('classNames', editCategory);

    this.calendarEvents[editId] = {
      ...this.editEvent,
      title: editTitle,
      id: this.editEvent.id,
      classNames: editCategory + ' ' + 'text-white',
    };

    this.position();
    this.formEditData = this.formBuilder.group({
      editTitle: '',
      editCategory: '',
    });
    this.modalService.dismissAll();
  }

  /**
   * Delete event
   */
  deleteEventData() {
    this.editEvent.remove();
    this.modalService.dismissAll();
  }

  /**
   * Close event modal
   */
  closeEventModal() {
    this.formData = this.formBuilder.group({
      title: '',
      category: '',
    });
    this.modalService.dismissAll();
  }

  getListSituation() {
    this.serv.getContrat().subscribe(
      (data: any[]) => {
        this.rowData = data;

        for (var k = 0; k < this.rowData.length; k++) {
          this.row.push([
            this.rowData[k].nom_pren,
            this.rowData[k].mat_pers,
            this.rowData[k].dat_contrat,
            this.rowData[k].dat_ech,
            this.rowData[k].num_contrat,
            this.rowData[k].cod_typ,
            
          ]);
        }
        this.events=data.map((e:any)=>({title:e.nom_pren,start:e.dat_ech,color:"orange"}))


        this.calendarOptions = {
          headerToolbar: {
            left: 'dayGridMonth,dayGridWeek,dayGridDay',
            center: 'title',
            right: 'prevYear,prev,next,nextYear'
          },
          initialView: "dayGridMonth",
          themeSystem: "bootstrap",
          eventSources: this.events,
          events: this.events,
          weekends: true,
          editable: true,
          selectable: true,
          selectMirror: true,
          dayMaxEvents: true,
      
          eventClick: this.handleEventClick.bind(this),
          eventsSet: this.handleEvents.bind(this),
          eventTimeFormat: { // like '14:30:00'
            hour: '2-digit',
            minute: '2-digit',
            meridiem: false,
            hour12: true
          }
      
        };


        
      },
      (error) => {
        console.log(error);
      }
    );
  }

fetchListContrat(){

}
   
  private _fetchData() {
    // Event category
    //this.category = category;
    // Calender Event Data
   // this.calendarEvents = calendarEvents;
    // form submit
    this.submitted = false;
  }

  columnContrat = [
    { headerName: "Nom & Prenom", 
    field: "nom_pren", 
    editable: true,
    floatingFilter: true,   
       filter:true,

  },
  { headerName: "Matricule", 
    field: "mat_pers", 
    editable: true,
    floatingFilter: true,   
       filter:true,

  },

    {
     headerName:"Date contrat",
      field: "dat_contrat",
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
          var dateParts = dateAsString.split("-");
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
      headerName:"Date fin contrat",
       field: "dat_ech",
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
           var dateParts = dateAsString.split("-");
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
    headerName: "Num contrat",
    field: "num_contrat",
    editable: true,
    floatingFilter: true,

    
  },
  {
    headerName: "Type contrat",
    field: "cod_typ",
    editable: true,
    floatingFilter: true,

    
  },
    
  ];



  exportAsXLSX() {
    this.ser.exportAsExcelFile(this.rowData, "Liste des contrats");
  }

  public openPDF(): void {
    const doc = new jspdf("portrait", "px", "a4");
    doc.text(170, 15, "Liste des contrats:");
    doc.autoTable(this.columns, this.row);
    let now=new Date()
    var today = now.getDate()+"/"+(now.getMonth()+1)+"/"+now.getFullYear();
    doc.setFont("serif");
    doc.setFontSize(10);
    var newdat = "Date: "+ today;
    doc.text(350,15,newdat);
    var pageCount = doc.internal.getNumberOfPages(); //Total Page Number
for(let i = 0; i < pageCount; i++) { 
  doc.setPage(i); 
  let pageCurrent = doc.internal.getCurrentPageInfo().pageNumber; //Current Page
  doc.setFontSize(12);
  doc.text('page: ' + pageCurrent + '/' + pageCount, 10, 10);
}
    doc.save("Liste des contrats.pdf");
  }

  modules: Module[] = [ClientSideRowModelModule];
  defaultColDef = {
    sortable: true,
    filter: true,
  };

}