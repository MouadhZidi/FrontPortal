import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuardauthService } from 'src/app/guard/guardauth.service';
import { CalendrierContratComponent } from './calendrier-contrat/calendrier-contrat.component';
import { EcheanceContratComponent } from './echeance-contrat/echeance-contrat.component';




const routes: Routes = [
    {
        path: 'contrat',
        component: EcheanceContratComponent,canActivate:[GuardauthService]
    },
    {
        path: 'calendrier-contrat',
        component: CalendrierContratComponent,canActivate:[GuardauthService]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ContratRoutingModule { }