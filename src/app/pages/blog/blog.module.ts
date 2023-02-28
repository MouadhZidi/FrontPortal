import { NgModule ,NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbDatepickerModule, NgbDropdownModule, NgbModalModule, NgbNavModule, NgbPaginationModule, NgbTooltipModule, NgbTypeaheadModule } from "@ng-bootstrap/ng-bootstrap";
import { UIModule } from '../../shared/ui/ui.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { BlogRoutingModule } from './blog-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BloglistComponent } from '../blog/bloglist/bloglist.component';
import { BloggridComponent } from '../blog/bloggrid/bloggrid.component';
import { DetailComponent } from '../blog/detail/detail.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AddEventComponent } from './add-event/add-event.component';
import { EventUpdateComponent } from './evenet-update/event-update/event-update.component';
import { CalendarComponent } from './calendar/calendar.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CalendarCongeRoutingModule } from '../calendarConge/calendar-conge-routing.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ArchwizardModule } from 'angular-archwizard';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { SimplebarAngularModule } from 'simplebar-angular';
import { AgGridModule } from '@ag-grid-community/angular';
import { TranslateModule } from '@ngx-translate/core';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
    declarations: [BloglistComponent, BloggridComponent, DetailComponent, AddEventComponent, EventUpdateComponent, CalendarComponent],
    imports: [
        CommonModule,
        UIModule,
        BlogRoutingModule,
        NgbDropdownModule,
        NgApexchartsModule,
        Ng2SearchPipeModule,
        NgxPaginationModule,
    CalendarCongeRoutingModule,
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
        TranslateModule,
        NgxMaskModule.forRoot(),
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]
})

export class BlogModule { }
