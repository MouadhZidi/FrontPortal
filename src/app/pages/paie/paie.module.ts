import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
 import { UIModule } from '../../shared/ui/ui.module';

import { AgGridModule } from '@ag-grid-community/angular';
import { PaieRoutingModule } from './paie-routing.module';
import { EtatApresPaieComponent } from './etat-apres-paie/etat-apres-paie.component';
import { DeclarationComponent } from './declaration/declaration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EtatApresPaieRhComponent } from './etat-apres-paie-rh/etat-apres-paie-rh.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
  declarations: [
    EtatApresPaieComponent,
    DeclarationComponent,
    EtatApresPaieRhComponent
  ],
  imports: [
    CommonModule,
PaieRoutingModule,
    UIModule,
    NgbTooltipModule,
    AgGridModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    NgxMaskModule.forRoot(),

  ]
})
export class PaieModule { }
