import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuardauthService } from 'src/app/guard/guardauth.service';
import { DemandeAutorisationComponent } from './demande-autorisation/demande-autorisation.component';
import { DemandeCongeComponent } from './demande-conge/demande-conge.component';
import { DemandeDocumentComponent } from './demande-document/demande-document.component';
import { DemandeFormationComponent } from './demande-formation/demande-formation.component';
import { DemandePretAvanceComponent } from './demande-pret-avance/demande-pret-avance.component';
import { DemandeSituationComponent } from './demande-situation/demande-situation.component';



const routes: Routes = [
    {
        path: 'PretAvance',
        component: DemandePretAvanceComponent,canActivate:[GuardauthService]
    },
    {
        path: 'Autorisation',
        component: DemandeAutorisationComponent,canActivate:[GuardauthService]
    },
    {
        path: 'Situation',
        component: DemandeSituationComponent,canActivate:[GuardauthService]
    },
    {
        path: 'Formation',
        component: DemandeFormationComponent,canActivate:[GuardauthService]
    },
    {
        path: 'Document',
        component: DemandeDocumentComponent,canActivate:[GuardauthService]
    },
    {
        path: 'Conge',
        component: DemandeCongeComponent,canActivate:[GuardauthService]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CryptoRoutingModule { }