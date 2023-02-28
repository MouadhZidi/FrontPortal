import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgApexchartsModule } from 'ng-apexcharts';
import { NgbDropdownModule, NgbModalModule, NgbNavModule, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { WidgetModule } from '../../shared/widget/widget.module';
import { UIModule } from '../../shared/ui/ui.module';
import { NgxPaginationModule } from 'ngx-pagination';


import { EspaceChefComponent } from './espace-chef/espace-chef.component';
import { ChefRoutingModule } from './chef-routing.module';
import { HistoriqueChefComponent } from './historique-chef/historique-chef.component';
import { EvaluationObjectifChefComponent } from './evaluation-objectif-chef/evaluation-objectif-chef.component';
import { AgGridModule } from '@ag-grid-community/angular';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [ EspaceChefComponent, HistoriqueChefComponent, EvaluationObjectifChefComponent],
  imports: [
    CommonModule,
    ChefRoutingModule,
    WidgetModule,
    UIModule,
    NgSelectModule,
    NgApexchartsModule,
    FormsModule, ReactiveFormsModule ,
    NgbTooltipModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    NgbNavModule,
    NgbDropdownModule,
    NgbPaginationModule,
    NgbModalModule,
    AgGridModule,
    TranslateModule
  ]
})
export class ChefModule { }
