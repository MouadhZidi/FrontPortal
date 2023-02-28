import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { UIModule } from '../../shared/ui/ui.module';
import { AgGridModule } from '@ag-grid-community/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ObjectifComponent } from './objectif/objectif.component';
import { ObjectifRoutingModule } from './objectif-routing.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ObjectifComponent
  ],
  imports: [
    CommonModule,
ObjectifRoutingModule,
    UIModule,
    NgbTooltipModule,
    AgGridModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule
  ]
})
export class ObjectifModule { }
