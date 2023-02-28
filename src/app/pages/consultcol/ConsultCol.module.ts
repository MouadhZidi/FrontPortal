import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UIModule } from '../../shared/ui/ui.module';
import { WidgetModule } from '../../shared/widget/widget.module';

import { Ng5SliderModule } from 'ng5-slider';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgbNavModule, NgbDropdownModule, NgbPaginationModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { NgSelectModule } from '@ng-select/ng-select';

import { AgGridModule } from '@ag-grid-community/angular';
import { ConsultColRoutingModule } from './ConsultCol-routing.module';
import { InfopersComponent } from './infopers/infopers.component';
import { LooComponent } from './loo/loo.component';
import { AdrpersgridComponent } from './adrpersgrid/adrpersgrid.component';
import { AggrididentiteComponent } from './aggrididentite/aggrididentite.component';
import { InfoprofComponent } from './infoprof/infoprof.component';
import { InfosocComponent } from './infosoc/infosoc.component';
import { TranslateModule } from '@ngx-translate/core';



const config: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  url: 'https://httpbin.org/post',
  maxFilesize: 100,
};

@NgModule({
  // tslint:disable-next-line: max-line-length
  declarations: [
    
    
  
    InfopersComponent,
                    LooComponent,
                    AdrpersgridComponent,
                    AggrididentiteComponent,
                    InfoprofComponent,
                    InfosocComponent
  ],
  imports: [
    AgGridModule,
    CommonModule,
    ConsultColRoutingModule,
    NgbNavModule,
    NgbModalModule,
    FormsModule,
    Ng2SearchPipeModule,
    NgbDropdownModule,
    DropzoneModule,
    ReactiveFormsModule,
    UIModule,
    WidgetModule,
    Ng5SliderModule,
    NgSelectModule,
    NgbPaginationModule,
    TranslateModule
    

  ],
  providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: config
    }
  ]
})
export class ConsultColModule { }
