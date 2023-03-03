import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
 import { UIModule } from '../../shared/ui/ui.module';

import { AgGridModule } from '@ag-grid-community/angular';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';
import { NgxMaskModule } from 'ngx-mask';
import { ListNotificationRoutingModule } from './list-notifications-routing.module';
import { ListNotificationsComponent } from './list-notifications/list-notifications.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    ListNotificationsComponent,
   
  ],
  imports: [
    CommonModule,
ListNotificationRoutingModule,
    UIModule,
    NgbTooltipModule,
    AgGridModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    NgxMaskModule.forRoot(),
    Ng2SearchPipeModule,
    NgxPaginationModule,


  ]
})
export class ListNotificationsModule { }
