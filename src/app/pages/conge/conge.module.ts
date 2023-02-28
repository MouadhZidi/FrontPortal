import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
 import { UIModule } from '../../shared/ui/ui.module';
import { CongeRoutingModule } from './conge-routing.module';
import { ListCongeComponent } from './list-conge/list-conge.component';
import { SoldeCongeComponent } from './solde-conge/solde-conge.component';
import { AgGridModule } from '@ag-grid-community/angular';
import { CongeRhComponent } from './conge-rh/conge-rh.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [ListCongeComponent,SoldeCongeComponent, CongeRhComponent],
  imports: [
    CommonModule,
    CongeRoutingModule,
      UIModule,
      NgbTooltipModule,
      AgGridModule,
      ReactiveFormsModule,
      FormsModule,
      AgGridModule,TranslateModule
  ]
})
export class CongeModule { }
