import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbAccordionModule, NgbAlertModule, NgbCarouselModule, NgbCollapseModule, NgbDatepickerModule, NgbDropdownModule, NgbModalModule, NgbNavModule, NgbPaginationModule, NgbPopoverModule, NgbProgressbarModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ArchwizardModule, WizardComponent } from 'angular-archwizard';
import { NgxMaskModule } from 'ngx-mask';
import { NgSelectModule } from '@ng-select/ng-select';
import { UiSwitchModule } from 'ngx-ui-switch';
import { ColorPickerModule } from 'ngx-color-picker';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { UIModule } from '../../shared/ui/ui.module';
import { FicheSignalitiqueRoutingModule } from './FicheSignalitique-routing.module';
import { AjoutAgentComponent } from './ajout-agent/ajout-agent.component';
import { UpdateFSComponent } from './update-fs/update-fs.component';
import { Ng5SliderModule } from 'ng5-slider';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NgxYoutubePlayerModule } from 'ngx-youtube-player';
import { AgmCoreModule } from '@agm/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  // tslint:disable-next-line: max-line-length
  declarations: [
    AjoutAgentComponent,
    UpdateFSComponent
  ],
  imports: [
  
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    FicheSignalitiqueRoutingModule,
    UIModule,
    Ng2SmartTableModule,
    CKEditorModule,
    ArchwizardModule,
    NgxMaskModule.forRoot(),
    NgSelectModule,
    UiSwitchModule,
    ColorPickerModule,
    NgbDatepickerModule,
    DropzoneModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModalModule,
    Ng5SliderModule,
    NgbAlertModule,
    NgbCarouselModule,
    NgbDropdownModule,
    NgbProgressbarModule,
    NgbTooltipModule,
    NgbPopoverModule,
    NgbPaginationModule,
    NgbNavModule,
    NgbAccordionModule,
    NgbCollapseModule,
    ImageCropperModule,
    NgxYoutubePlayerModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAbvyBxmMbFhrzP9Z8moyYr6dCr-pzjhBE'
    }),
  ],
  providers: [
    WizardComponent 
  ],
})
export class FicheSignalitiqueModule { }
