import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuardauthService } from 'src/app/guard/guardauth.service';
import { EcheanceContratComponent } from './echeance-contrat/echeance-contrat.component';




const routes: Routes = [
    {
        path: 'contrat',
        component: EcheanceContratComponent,canActivate:[GuardauthService]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ContratRoutingModule { }