import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuardauthService } from 'src/app/guard/guardauth.service';
import { AutorisationComponent } from './autorisation/autorisation/autorisation.component';
import { CongeComponent } from './conge/conge.component';
import { PointageComponent } from './pointage/pointage.component';
import { RetardComponent } from './retard/retard/retard.component';




const routes: Routes = [
    {
        path: 'pointage',
        component: PointageComponent,canActivate:[GuardauthService]
    },
    {
        path: 'retard',
        component: RetardComponent,canActivate:[GuardauthService]
    },
    {
        path: 'autorisation',
        component: AutorisationComponent,canActivate:[GuardauthService]
    },
    {
        path: 'conge',
        component: CongeComponent,canActivate:[GuardauthService]
    }
  
  
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PointageRoutingModule {}
