import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuardauthService } from 'src/app/guard/guardauth.service';
import { ObjectifComponent } from './objectif/objectif.component';




const routes: Routes = [
    {
        path: 'objectif',
        component: ObjectifComponent,canActivate:[GuardauthService]
    },
 
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ObjectifRoutingModule {}
