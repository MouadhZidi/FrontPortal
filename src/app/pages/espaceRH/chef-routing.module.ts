import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EspaceRhComponent } from './espace-rh/espace-rh.component';
import { HistoriqueRhComponent } from './historique-rh/historique-rh.component';




const routes: Routes = [
    {
        path: 'Rh',
        component: EspaceRhComponent
    },
    {
        path: 'historique',
        component: HistoriqueRhComponent
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RHRoutingModule { }
