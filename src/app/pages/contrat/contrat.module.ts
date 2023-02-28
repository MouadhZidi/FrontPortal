import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UIModule } from '../../shared/ui/ui.module';

import { NgApexchartsModule } from 'ng-apexcharts';
import { NgbDropdownModule, NgbNavModule, NgbModalModule, NgbPaginationModule, NgbTypeaheadModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

import { ArchwizardModule } from 'angular-archwizard';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { SimplebarAngularModule } from 'simplebar-angular';



import { AgGridModule } from '@ag-grid-community/angular';
import { EcheanceContratComponent } from './echeance-contrat/echeance-contrat.component';
import { ContratRoutingModule } from './contrat-routing.module';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction'; // a plugin
import bootstrapPlugin from "@fullcalendar/bootstrap";
import { FullCalendarModule } from '@fullcalendar/angular';
import { TranslateModule } from '@ngx-translate/core';
FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
  bootstrapPlugin
]);

@NgModule({
  declarations: [
    EcheanceContratComponent
  ],
  imports: [
    CommonModule,
    UIModule,
    NgbDropdownModule,
    NgApexchartsModule,
    
    ContratRoutingModule,
    FormsModule,
    FullCalendarModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    NgbNavModule,
    NgbModalModule,
    NgbDatepickerModule,
    ArchwizardModule,
    DropzoneModule,
    SimplebarAngularModule,
    AgGridModule,
    TranslateModule



    
  ],
  
  providers: [
    DatePipe
  ]
})
export class ContratModule { }
