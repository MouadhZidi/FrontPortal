import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgApexchartsModule } from 'ng-apexcharts';
import { NgSelectModule } from '@ng-select/ng-select';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { WidgetModule } from '../../shared/widget/widget.module';
import { UIModule } from '../../shared/ui/ui.module';
import { NgxPaginationModule } from 'ngx-pagination';

import { NgbDropdownModule, NgbModalModule, NgbNavModule, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import {  RHRoutingModule } from './chef-routing.module';
import { EspaceRhComponent } from './espace-rh/espace-rh.component';
import { HistoriqueRhComponent } from './historique-rh/historique-rh.component';

@NgModule({
  declarations: [ 
    EspaceRhComponent, HistoriqueRhComponent
  ],
  imports: [
    CommonModule,
    RHRoutingModule,
    WidgetModule,
    UIModule,
    NgSelectModule,
    NgApexchartsModule,
    FormsModule, ReactiveFormsModule ,
    NgbTooltipModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    NgbDropdownModule, NgbModalModule, NgbNavModule, NgbPaginationModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class RhModule { }
