import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuardauthService } from 'src/app/guard/guardauth.service';
import { ListNotificationsComponent } from './list-notifications/list-notifications.component';



const routes: Routes = [
    {
        path: 'list-notifications',
        component: ListNotificationsComponent,canActivate:[GuardauthService]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ListNotificationRoutingModule {}
