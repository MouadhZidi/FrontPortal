import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { NgbAlertModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { UIModule } from '../../shared/ui/ui.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';


import { AuthRoutingModule } from './auth-routing';
import { LanguageComponent } from './language/language.component';
import { LayoutsModule } from "../../layouts/layouts.module";
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { ClickOutsideModule } from 'ng-click-outside';
import { SimplebarAngularModule } from 'simplebar-angular';


@NgModule({
    declarations: [LoginComponent, SignupComponent, LanguageComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        NgbAlertModule,
        UIModule,
        AuthRoutingModule,
        CarouselModule,
        LayoutsModule,
        TranslateModule,
        RouterModule,
        NgbDropdownModule,
        ClickOutsideModule,
        UIModule,
        SimplebarAngularModule,
        FormsModule, ReactiveFormsModule
    ]
})
export class AuthModule { }
