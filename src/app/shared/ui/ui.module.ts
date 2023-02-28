import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgbCollapseModule, NgbDatepickerModule, NgbTimepickerModule, NgbDropdownModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

import { PagetitleComponent } from './pagetitle/pagetitle.component';
import { LoaderComponent } from './loader/loader.component';
import { EvenementComponent } from './evenement/evenement/evenement.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { BlogRoutingModule } from 'src/app/pages/blog/blog-routing.module';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  declarations: [PagetitleComponent,  LoaderComponent,EvenementComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgbCollapseModule,
    NgbDatepickerModule,
    NgbTimepickerModule,
    NgbDropdownModule,
    NgbNavModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    BlogRoutingModule,
    TranslateModule
  ],
  exports: [PagetitleComponent, LoaderComponent,EvenementComponent]
})
export class UIModule { }
