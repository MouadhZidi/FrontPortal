import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuardauthService } from 'src/app/guard/guardauth.service';
import { CalendarCongeComponent } from './calendar-conge/calendar-conge.component';




const routes: Routes = [
    {
        path: 'calendar-conge',
        component: CalendarCongeComponent,canActivate:[GuardauthService]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CalendarCongeRoutingModule { }