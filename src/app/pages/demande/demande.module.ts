import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UIModule } from '../../shared/ui/ui.module';

import { NgApexchartsModule } from 'ng-apexcharts';
import { NgbDropdownModule, NgbNavModule, NgbModalModule, NgbPaginationModule, NgbTypeaheadModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

import { ArchwizardModule } from 'angular-archwizard';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { SimplebarAngularModule } from 'simplebar-angular';
import { NgxMaskModule } from 'ngx-mask';
import { CryptoRoutingModule } from './demande-routing.module';
import { AgGridModule } from '@ag-grid-community/angular';
import { DemandePretAvanceComponent } from './demande-pret-avance/demande-pret-avance.component';
import { DemandeFormationComponent } from './demande-formation/demande-formation.component';
import { DemandeAutorisationComponent } from './demande-autorisation/demande-autorisation.component';
import { DemandeCongeComponent } from './demande-conge/demande-conge.component';
import { DemandeSituationComponent } from './demande-situation/demande-situation.component';
import { DemandeDocumentComponent } from './demande-document/demande-document.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    DemandePretAvanceComponent,
    DemandeFormationComponent,
    DemandeAutorisationComponent,
    DemandeCongeComponent,
    DemandeSituationComponent,
    DemandeDocumentComponent
  ],
  imports: [
    CommonModule,
    UIModule,
    CryptoRoutingModule,
    NgbDropdownModule,
    NgApexchartsModule,
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    NgbNavModule,
    NgbModalModule,
    NgxMaskModule.forRoot(),
    NgbDatepickerModule,
    ArchwizardModule,
    DropzoneModule,
    SimplebarAngularModule,
    AgGridModule,
    TranslateModule
   
  ]
})
export class DemandeModule { }
