import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { UIModule } from '../../shared/ui/ui.module';
import { AgGridModule } from '@ag-grid-community/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompetenceComponent } from './competence/competence.component';
import { CompetenceRoutingModule } from './competence-routing.module';
import { NgbNavModule, NgbDropdownModule, NgbModalModule, NgbTooltipModule , NgbCollapseModule} from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    CompetenceComponent
  ],
  imports: [
    CommonModule,
CompetenceRoutingModule,
    UIModule,
    NgbTooltipModule,
    AgGridModule,
    FormsModule,
    ReactiveFormsModule,
    NgbNavModule,
    NgbDropdownModule, 
    NgbModalModule,
    NgbCollapseModule,
    TranslateModule

  ],

})
export class CompetenceModule { }
